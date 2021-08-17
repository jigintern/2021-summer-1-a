import { CSV } from "https://js.sabae.cc/CSV.js";

let imgList = {};

async function FetchFind47Images(keyword) {
  // 画像リストを読込む
  // if (!imgList) {
  // }

  // TODO: 毎回パースしてるのでどうにかする！
  imgList = await CSV.toJSON(
    await CSV.fetch("https://code4fukui.github.io/find47/find47images.csv")
  );

  // タイトルと県名にキーワードが含まれるものを抽出
  const results = imgList
    .filter((e) => e.title.includes(keyword) || e.pref.includes(keyword))
    .map((img) => {
      return {
        title: img.title,
        pref: img.pref,
        author: img.author,
        place: img.url_image,
        view: img.count_view,
        url: img.url,
        authorurl: img.authorurl,
        // geo: e.Geo3x3,
      };
    });

  return results;
}

console.log(await FetchFind47Images("神戸"));
