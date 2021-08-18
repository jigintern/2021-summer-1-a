import { Server } from "https://js.sabae.cc/Server.js";
import { SearchHotels } from "./searchHotels.js";
import { getPictures } from "./getPicture.js";

export class MyServer extends Server {
  api(path, req) {
    const to = path.replace(/\/api\//, "");

    switch (to) {
      // キーワードから施設を検索
      case "searchHotels": {
        const results = SearchHotels(req.keyword, req.count);
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
