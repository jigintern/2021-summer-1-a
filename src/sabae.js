import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.js";

// 出ないので...
export function sabae() {
  return [
    {
      title: "鯖江！",
      pref: "鯖江市",
      author: "",
      place:
        "https://upload.wikimedia.org/wikipedia/ja/d/d3/%E5%9F%BA%E7%A4%8E%E8%87%AA%E6%B2%BB%E4%BD%93%E4%BD%8D%E7%BD%AE%E5%9B%B3_18207.svg",
      view: 1000000,
      from: "",
      url: "https://www.city.sabae.fukui.jp/index.html",
      authorurl: "",
      geo: {
        ...Geo3x3.decode("E9138732"),
        exists: true,
      },
    },
  ];
}
