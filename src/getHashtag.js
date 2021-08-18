import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export async function getHashtag(keyword) {
  const url = `https://instagram.userlocal.jp/hashtags/search?hashtags=${encodeURIComponent(
    keyword
  )}`;
  const res = await fetch(url);
  const html = await res.text();
  //console.log(html);
  const par = new DOMParser();
  const doc = par.parseFromString(html, "text/html");
  const arr = [];
  const queryhash = doc.querySelectorAll("span");

  for (const hash of queryhash) {
    if (!hash?.innerHTML) continue;
    if (hash.innerHTML[0] === "#") {
      arr.push(hash.innerHTML.replace(/#/, ""));
    }
  }

  return arr;
}