import { DOMParser, HTMLDocument } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
/**
 * 周辺の観光地を検索
 * @param {JSON} req {categori:"",lat:"",lon:""}lat->緯度
 * @param {int} step 取得する記事の数
 * @returns {Array} 取得したURLの配列
 */
export async function getNearlyLocaiton(req,step){

    const url = `https://travel.navitime.com/ja/area/jp/interest/${req.categori}/?lat=${req.lat}&lon=${req.lon}`;

    const res = await fetch(url);
    const text = await res.text();
    
    const p = new DOMParser();
    const doc = p.parseFromString(text,"text/html");
    const urls = doc.querySelectorAll(".c-article-card>a");
    const arr = [];
    for(let i = 0;i<step;i++){
        arr.push(urls[i].getAttribute('href'));
    }
    return arr;
}
/*
const lat = "43.059856";
const lon = "141.343081";
const categori = "all";
*/
