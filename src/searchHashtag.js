import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

/**
 * キーワードから関連ハッシュタグを検索
 *
 * @param {string} keyword キーワード
 * @returns ハッシュタグの配列
 */
export async function searchHashtag(keyword) {
    const url = `https://instagram.userlocal.jp/hashtags/search?hashtags=${encodeURIComponent(
        keyword
    )}`;
    const res = await fetch(url);
    const html = await res.text();

    const par = new DOMParser();
    const doc = par.parseFromString(html, 'text/html');
    const arr = [];
    const queryhash = doc.querySelectorAll('span');

    for (const hash of queryhash) {
        if (!hash?.innerHTML) continue;
        if (hash.innerHTML[0] === '#') {
            arr.push(hash.innerHTML.replace(/#/, ''));
        }
    }

    // 空ならこれを返す（本番環境でアクセスできなかったので...）
    if (res.status != 200 || arr.length <= 0) {
        console.error(res.status, res.statusText);

        return [
            '沖縄',
            '旅',
            '海',
            '温泉',
            '京都',
            '韓国',
            '大阪',
            '北海道',
            '東京',
            '箱根',
            '熱海',
            '金沢',
            '伊豆',
            '福岡',
            '広島',
            '名古屋',
            '沖縄旅行',
            '夏',
            '家族',
            '静岡',
            '石垣島',
            '横浜',
            '軽井沢',
            '宮古島'
        ];
    }

    return arr;
}
