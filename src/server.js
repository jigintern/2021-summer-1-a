import { Server } from "https://js.sabae.cc/Server.js";
import { getPictures } from "./getPicture.js";
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
        const results = req?.keyword
          ? searchHotelsFromKeyword(req.keyword, req.count)
          : searchHotelsFromGeo(req.lat, req.lng, req.count);
        return results;
      }
      // 人気の観光地の画像を取得
      case "getPictures": {
        const results = getPictures(req?.tags, req?.orderBy, req.count);
        return results;
      }
    }
  }
}
