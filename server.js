import{ Server } from "https://js.sabae.cc/Server.js";
const list = [];
class MyServer extends Server {
    api(path,req){
        console.log(req);
        list.push(req);
        return list;
    }
}
new MyServer(8001);