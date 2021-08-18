import { Server } from "https://js.sabae.cc/Server.js";
import { SearchHotels } from "./searchHotels.js";
import { SearchTag } from "./searchHashtag.js";
import { getPictureJson } from "./searchPictureFromPixabay.js";

export class MyServer extends Server {
  api(path, req) {
    const to = path.replace(/\/api\//, "");

    switch (to) {
      // キーワードから施設を検索
      case "searchHotels": {
        const results = SearchHotels(req.keyword, req.count);
        return results;
      }
      case "searchHashTag":{
        const results = SearchTag(req.keyword,req.count);
        return results;
      }
      case "searchPictureFromPixabay":{
        const result = getPictureJson(req.keyword);
        return result;
      }
    }
  }
}
