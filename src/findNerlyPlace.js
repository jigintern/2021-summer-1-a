import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
/**
 * 周辺の観光地を検索
 * @param {JSON} req {categori:"",lat:"",lon:""}lat->緯度
 * @param {int} step 取得する記事の数(max:16)
 * @returns {Array} 取得したURLの配列
 */
export async function findNerlyPlace(req, step) {
    // const req = {
    //     categori: 'all',
    //     lat: 34.11994655760192,
    //     lon: 133.03345334944325
    // };
    const url = `https://travel.navitime.com/ja/area/jp/interest/${req.categori}/?lat=${req.lat}&lon=${req.lon}`;
    //https://travel.navitime.com/ja/area/jp/interest/all/?lat=34.11994655760192&lon=133.03345334944325
    const res = await fetch(url);
    const text = await res.text();

    const p = new DOMParser();
    const doc = p.parseFromString(text, 'text/html');
    const urls = doc.querySelectorAll('.c-article-card>a');

    const arr = [];
    for (let i = 0; i < step; i++) {
        try {
            arr.push({
                url: urls[i].attributes['href'],
                img: urls[i].querySelector('.c-article-card__image>img')
                    .attributes['src'],
                label: urls[i]
                    .querySelector('.c-article-card__image>p')
                    .textContent.split('|')[1]
                    .trim(),
                title: urls[i].querySelector(".c-article-card__name").textContent.trim()
            });
        } catch {}
    }
    return arr;
}
/*
const lat = "43.059856";
const lon = "141.343081";
const categori = "all";
*/
