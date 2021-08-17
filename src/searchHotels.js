/**
 * キーワードからホテル・宿を検索（楽天トラベルキーワード検索API）
 *
 * @param {string} keyword キーワード
 * @param {number} count 取得件数
 * @returns ホテルのリスト
 */
export async function SearchHotels(keyword, count) {
  const appId = Deno.env.get("RAKUTEN_APP_ID");

  // 取得件数
  const hits = count || 10;

  const encodedKeyword = encodeURIComponent(keyword);
  const url = `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&keyword=${encodedKeyword}&hits=${hits}&applicationId=${appId}`;

  const res = await fetch(url);
  const json = await res.json();

  // エラーが返ってきた
  if (!res.ok) {
    console.error(json);
    return [];
  }

  const results = json.hotels.map((e) => {
    const info = e.hotel[0].hotelBasicInfo;

    return {
      name: info.hotelName,
      desc: info.hotelSpecial,
      tel: info.telephoneNo,
      address: `${info.address1}${info.address2}`,
      infoUrl: info.hotelInformationUrl,
      planUrl: info.planListUrl,
      imageUrl: info.hotelImageUrl,
      reviewAvg: info.reviewAverage || 0,
      reviewText: info.userReview || "",
    };
  });

  return results;
}
