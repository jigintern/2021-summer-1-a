/**
 * キーワードから画像を検索
 *
 * @param {string} keyword キーワード
 * @returns 画像のURLとタグのJSON
 */
export async function getPictureJson(keyword){
    const url_base = "https://pixabay.com/api/?key=22956788-6ebc95deedc7bafbd28d08e23&q=";
    keyword = encodeURIComponent(keyword);
    const url = url_base+keyword;
    const res = await fetch(url);
    const json = await res.json();
    try{
        const picurl = await json["hits"][0]["largeImageURL"];
        const pictags = await json["hits"][0]["tags"];
        return {tags:pictags,place:picurl};
    }catch(err){
        return {tags:"",place:""};
    }
}