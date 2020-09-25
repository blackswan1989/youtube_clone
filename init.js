// NOTE app.js에서 import한 application이 있다.
// NOTE appliecation에 관련된 코드들은 app.js파일에 담겨있다.

import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();
import "./models/Video";
import "./models/User";
import "./models/Comment"; //#6.1 4:20 빠져있음

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
