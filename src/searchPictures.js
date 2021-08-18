import { searchHashtag } from "./searchHashtag.js";
import { getPicturesFromFind47 } from "./getPicturesFromFind47.js";
import { getPicturesFromPixabay } from "./getPicturesFromPixabay.js";

// 1つ前に検索したハッシュタグ名
let prevTagNames = "";

// ハッシュタグの検索結果
let hashtags = [];

/**
 * キーワードから関連する画像を取得
 *
 * @param {string} keyword キーワード
 * @param {string} orderBy ソート順（昇順 : asc | 降順 : desc | 無し: none）
 * @param {number} count 取得件数
 * @returns
 */
export async function searchPicsFromKeyword(keyword, orderBy, count) {
  if (keyword === "" || count <= 0) return [];

  let pictures = [];

  // find47で検索
  pictures = await getPicturesFromFind47(keyword);

  // pixabayで検索
  if (pictures.length <= 0) {
    pictures = await getPicturesFromPixabay(keyword);
  }

  // 配列の要素がcount以上なら切り取る
  if (pictures.length > count) {
    pictures = pictures.slice(0, count);
  }

  // ソートしない
  if (orderBy === "none") return pictures;

  pictures.sort((a, b) =>
    orderBy === "desc" ? b.view - a.view : a.view - b.view
  );

  return pictures;
}

/**
 *  ハッシュタグから画像を検索
 *
 * @param {string} tagNames ハッシュタグ（複数ある場合は半角スペース区切り）
 * @param {string} orderBy ソート順（昇順 : asc | 降順 : desc）
 * @param {number} count 取得件数
 */
export async function searchPicsFromHashtag(tagNames, orderBy, count) {
  // 関連するハッシュタグを検索
  if (prevTagNames !== tagNames) {
    hashtags = await searchHashtag(tagNames || "#旅行");
  }

  prevTagNames = tagNames;

  let pictures = [];

  for (const tag of hashtags) {
    pictures = pictures.concat(await searchPicsFromKeyword(tag, "none", count));

    // 配列の要素がcount以上ならbreak
    if (pictures.length >= count) break;
  }

  // ソート
  pictures.sort((a, b) =>
    orderBy === "desc" ? b.view - a.view : a.view - b.view
  );

  return pictures;
}
