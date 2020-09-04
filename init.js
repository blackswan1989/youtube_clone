//TODO app.js에서 import한 application이 있다. appliecation에 관련된 코드들은 app.js파일에 담겨있다.

import app from "./app";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
