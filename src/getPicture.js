import { getHashtag } from "./getHashtag.js";
import { getFind47Images } from "./getFind47Images.js";

let hashtags = [];

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
