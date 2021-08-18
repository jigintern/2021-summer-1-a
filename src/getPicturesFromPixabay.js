// searchPictureFromPixabay.js
// https://github.com/jigintern/2021-summer-1-a/commit/90fc7e3da00aa3a7b6c6848938f6a04ad94d7f30

/**
 * キーワードから画像を検索
 *
 * @param {string} keyword キーワード
 * @returns 画像のURLとタグのJSON
 */
export async function getPicturesFromPixabay(keyword) {
  const key = Deno.env.get("PIXABAY_KEY");
  const url = `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(
    keyword
  )}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    const results = json["hits"].map((pic) => {
      return {
        title: keyword,
        pref: "",
        author: pic.user,
        place: pic.largeImageURL,
        view: pic.views,
        url: pic.pageURL,
        authorurl: "",
        geo: { exists: false },
      };
    });
    return results;
  } catch (err) {
    console.error(err);
    return [];
  }
}
