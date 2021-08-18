import { Server } from "https://js.sabae.cc/Server.js";
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
          ? searchPicsFromKeyword(req.keyword, req?.orderBy, req.count)
          : searchPicsFromHashtag(req?.tags, req?.orderBy, req.count);
      }
    }
  }
}
