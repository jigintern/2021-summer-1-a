import { getHashtag } from "./searchHashtag.js";
import { getFind47Images } from "./getFind47Images.js";

let hashtags = [];

/**
 * キーワードから画像を検索
 *
 * @param {string} keyword キーワード
 * @returns 画像のURLとタグのJSON
 */
async function getPictureJson(keyword) {
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
        // geo: e.Geo3x3,
      };
    });
    return results;
  } catch (err) {
    cosole.error(err);
    return [];
  }
}

/**
 * Instagramの人気ハッシュタグから関連する画像を取得
 * @param {number} count 取得件数
 * @returns
 */
export async function getPictures(count) {
  let results = [];

  // ハッシュタグ取得
  if (hashtags.length === 0) {
    hashtags = await getHashtag("#旅行");
  }

  for (const tag of hashtags) {
    // 配列の要素がcount以上ならbreak
    if (results.length > count) {
      results = results.slice(0, count);
      break;
    }

    // find47で検索
    const find47Results = await getFind47Images(tag);
    if (find47Results.length > 0) {
      results = results.concat(find47Results);
      continue;
    }

    // pixabayで検索
    const picabayResults = await getPictureJson(tag);
    results = results.concat(picabayResults);
  }

  return results;
}
