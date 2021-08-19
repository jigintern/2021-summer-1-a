import { searchHashtag } from "./searchHashtag.js";
import { getPicturesFromFind47 } from "./getPicturesFromFind47.js";
import { getPicturesFromPixabay } from "./getPicturesFromPixabay.js";

let prevTagNames = "";
let hashtags = [];

/**
 * 画像を条件でソート
 *
 * @param {Array} array 画像データの配列
 * @param {string} orderBy ソート条件（asc | desc | rand）
 * @returns ソートされた配列
 */
function sortPictures(array, orderBy) {
  // 昇順・降順でソート
  if (orderBy !== "rand") {
    array.sort((a, b) =>
      orderBy === "desc" ? b.view - a.view : a.view - b.view
    );
    return array;
  }

  // シャッフルする（Fisher-Yates）
  for (let i = array.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }

  return array;
}

/**
 * キーワードから関連する画像を取得
 *
 * @param {string} keyword キーワード
 * @param {string} orderBy ソート順（昇順 : asc | 降順 : desc | 無し: none）
 * @param {number} count 取得件数
 * @param {boolean} usePixabay pixabayの画像を含めるか
 * @returns
 */
export async function searchPicsFromKeyword(
  keyword,
  orderBy,
  count,
  usePixabay
) {
  if (keyword === "" || count <= 0) return [];

  let pictures = [];

  // find47で検索
  pictures = await getPicturesFromFind47(keyword);

  // 画像数が取得件数に満たない場合、pixabayで検索
  if (usePixabay && pictures.length < count) {
    pictures = pictures.concat(await getPicturesFromPixabay(keyword));
  
  }

  // 配列の要素がcount以上なら切り取る
  if (pictures.length > count) {
    pictures = pictures.slice(0, count);
  }

  // ソートしない
  if (orderBy === "none") return pictures;

  return sortPictures(pictures, orderBy);
}

/**
 *  ハッシュタグから画像を検索
 *
 * @param {string} tagNames ハッシュタグ（複数ある場合は半角スペース区切り）
 * @param {string} orderBy ソート順（昇順 : asc | 降順 : desc | 無し: none）
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
    pictures = pictures.concat(
      await searchPicsFromKeyword(tag, "none", count, false)
    );

    // 配列の要素がcount以上ならbreak
    if (pictures.length >= count) {
      pictures = pictures.slice(0, count);
      break;
    }
  }

  // ソートしない
  if (orderBy === "none") return pictures;

  return sortPictures(pictures, orderBy);
}
