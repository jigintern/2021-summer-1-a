import {
  DOMParser,
  HTMLDocument,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export async function getPictureJson(url) {
  const res = await fetch(url);
  const json = await res.json();
  try {
    const picurl = await json["hits"][0]["largeImageURL"];
    const pictags = await json["hits"][0]["tags"];
    return { tags: pictags, place: picurl };
  } catch (err) {
    return { tags: "", place: "" };
  }
}

export async function getHashtag(url) {
  const res = await fetch(url);
  const html = await res.text();
  //console.log(html);
  const par = new DOMParser();
  const doc = par.parseFromString(html, "text/html");
  const step = 2;
  const arr = [];
  let i = 0;
  let count = 0;
  const queryhash = doc.querySelectorAll("span");
  while (count < step) {
    if (queryhash[i].innerHTML[0] == "#") {
      arr.push(queryhash[i].innerHTML);
      count++;
    }
    i++;
  }
  return arr;
}
