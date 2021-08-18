import { getAdressFromGeo } from "./getAdress.js";

/**
 * キーワードからホテル・宿を検索（楽天トラベルキーワード検索API）
 *
 * @param {string} keyword キーワード
 * @param {number} count 取得件数
 * @returns ホテルのリスト
 */
export async function searchHotelsFromKeyword(keyword, count) {
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
      desc: info.hotelSpecial || "",
      tel: info.telephoneNo,
      address: `${info.address1}${info.address2}`,
      infoUrl: info.hotelInformationUrl || "",
      planUrl: info.planListUrl || "",
      imageUrl: info.hotelImageUrl,
      reviewAvg: info.reviewAverage || 0,
      reviewText: info.userReview || "",
    };
  });

  return results;
}

/**
 * 位置情報からホテル・宿を検索
 *
 * @param {number} lat 緯度
 * @param {number} lng 経度
 * @param {number} count 取得件数
 */
export async function searchHotelsFromGeo(lat, lng, count) {
  const address = await getAdressFromGeo(lat, lng);

  // エラー！
  if (address === "") return [];

  return searchHotelsFromKeyword(address, count);
}
