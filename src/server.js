import { Server } from "https://js.sabae.cc/Server.js";
import { SearchHotels } from "./searchHotels.js";
import { getPictures } from "./getPicture.js";

export class MyServer extends Server {
  api(path, req) {
    const to = path.replace(/\/api\//, "");

    switch (to) {
      case "getPictures": {
        const results = getPictures(req.count);
        return results;
      }
      case "searchHotels": {
        const results = SearchHotels(req.keyword, req.count);
        return results;
      }
    }
  }
}
