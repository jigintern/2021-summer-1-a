import{ Server } from "https://js.sabae.cc/Server.js";
import { DOMParser, HTMLDocument } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

async function getPictureJson(url){
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

async function getHashtag(url){
    const res = await fetch(url);
    const html = await res.text();
    //console.log(html);
    const par = new DOMParser();
    const doc = par.parseFromString(html,"text/html");
    const step = 2;
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



class MyServer extends Server {
    api(path,req){
        const cmd = path.split("/");
        if(cmd[2] == "getPicture"){
            console.log(req);
            const url_base = "https://pixabay.com/api/?key=22956788-6ebc95deedc7bafbd28d08e23&q=";
            const url = url_base+req["key"];
            return getPictureJson(url);
        }else if(cmd[2] == "getHashtag"){
            console.log(req);
            const url_base = "https://instagram.userlocal.jp/hashtags/search?hashtags=";
            const url = url_base+req["key"];
            return getHashtag(url);
        }
    }
}

getHashtag("https://instagram.userlocal.jp/hashtags/search?hashtags=%23旅行");

new MyServer(8881);
