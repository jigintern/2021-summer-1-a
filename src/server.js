import { Server } from "https://js.sabae.cc/Server.js";
import { findNerlyPlace } from "./findNerlyPlace.js";
import {
  searchPicsFromKeyword,
  searchPicsFromHashtag,
} from "./searchPictures.js";
import {
  searchHotelsFromKeyword,
  searchHotelsFromGeo,
} from "./searchHotels.js";

export class MyServer extends Server {
  api(path, req) {
    const to = path.replace(/\/api\//, "");

    switch (to) {
      // キーワードから施設を検索
      case "searchHotels": {
        return req?.keyword
          ? searchHotelsFromKeyword(req.keyword, req.count)
          : searchHotelsFromGeo(req.lat, req.lng, req.count);
      }
      // 人気の観光地の画像を取得
      case "getPictures": {
        return req?.keyword
          ? searchPicsFromKeyword(
              req.keyword,
              req?.orderBy,
              req.count,
              req?.usePixabay
            )
          : searchPicsFromHashtag(req?.tags, req?.orderBy, req.count);
      }
      // 付近の観光地のurlを取得
      case "findNerlyPlace": {
        const request = { categori: "all", lat: req.lat, lon: req.lon };
        const results = findNerlyPlace(request, req.count);
        return results;
      }
    }
  }
}
