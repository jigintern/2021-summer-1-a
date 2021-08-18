import dotenv from "https://taisukef.github.io/denolib/dotenv.js";
import { MyServer } from "./src/server.js";
// import { Login } from "";

// .envから環境変数を読込む
dotenv.config();

// サーバーを起動
new MyServer(8881);
