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
        geo: { exists: false },
      };
    });
    return results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 * Instagramの人気ハッシュタグから関連する画像を取得
 * @param {string} tagNames 検索するタグ名（複数の場合は半角スペースで区切る 指定無しなら "#旅行"）
 * @param {string} sort ソート順（昇順 : asc | 降順 : desc）
 * @param {number} count 取得件数
 * @returns
 */
export async function getPictures(tagNames, sort, count) {
  let pictures = [];

  // ハッシュタグ取得
  if (hashtags.length === 0) {
    hashtags = await getHashtag(tagNames || "#旅行");
  }

  for (const tag of hashtags) {
    // 配列の要素がcount以上ならbreak
    if (pictures.length > count) {
      pictures = pictures.slice(0, count);
      break;
    }

    // find47で検索
    const find47Results = await getFind47Images(tag);
    if (find47Results.length > 0) {
      pictures = pictures.concat(find47Results);
      continue;
    }

    // pixabayで検索
    const picabayResults = await getPictureJson(tag);
    pictures = pictures.concat(picabayResults);
  }

  // 並び替え
  pictures.sort((a, b) =>
    sort === "desc" ? b.view - a.view : a.view - b.view
  );

  return pictures;
}
