import { Server } from "https://js.sabae.cc/Server.js";
import { SearchHotels } from "./searchHotels.js";
import { getPictureJson, getHashtag } from "./getPictureHashtag.js";

export class MyServer extends Server {
  api(path, req) {
    const to = path.replace(/\/api\//, "");

    switch (to) {
      case "getPicture": {
        const key = Deno.env.get("PIXABAY_KEY");
        const url = `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(
          req["key"]
        )}`;
        return getPictureJson(url);
      }
      case "getHashtag": {
        const url = `https://instagram.userlocal.jp/hashtags/search?hashtags=${encodeURIComponent(
          req["key"]
        )}`;
        return getHashtag(url);
      }
      case "searchHotels": {
        const results = SearchHotels(req.keyword, req.count);
        return results;
      }
    }
  }
}
