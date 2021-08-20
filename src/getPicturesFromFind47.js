import { Geo3x3 } from 'https://taisukef.github.io/Geo3x3/Geo3x3.js';
import { CSV } from 'https://js.sabae.cc/CSV.js';

let imgList = {};

/**
 * FIND47で画像を検索
 *
 * @param {string} keyword 検索キーワード
 * @returns 画像情報の配列
 */
export async function getPicturesFromFind47(keyword) {
    // 画像リストを読込む
    if (Object.keys(imgList).length === 0) {
        imgList = CSV.toJSON(
            await CSV.fetch(
                'https://code4fukui.github.io/find47/find47images.csv'
            )
        );
    }

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
                from: 'FIND47',
                url: img.url,
                authorurl: img.authorurl,
                geo: {
                    ...Geo3x3.decode(img.Geo3x3),
                    exists: true
                }
            };
        });

    return results;
}
