/**
 * キーワードから関連ハッシュタグを検索
 *
 * @param {string} keyword キーワード
 * @param {number} count 取得件数
 * @returns ハッシュタグの配列
 */
export async function getHashtag(keyword,step){
    const url_base = "https://instagram.userlocal.jp/hashtags/search?hashtags=";
    keyword = encodeURIComponent(keyword);
    const url = url_base+keyword;
    const res = await fetch(url);
    const html = await res.text();
    const par = new DOMParser();
    const doc = par.parseFromString(html,"text/html");
    //html化
    const arr = [];
    let i = 0;
    let count = 0;
    const queryhash = doc.querySelectorAll("span")
    while(count < step){
        if(queryhash[i].innerHTML[0] == "#"){
            arr.push(queryhash[i].innerHTML);
            count++;
        }
        i++;
    }
    return arr;
}