## package.json | express middleware

## 비디오 샘플 다운로드 | https://file-examples.com/index.php/sample-video-files/sample-mp4-files/

# nodemon

https://www.npmjs.com/package/nodemon
npm install nodemon -D -> "nodemon --exec" script에 추가

"scripts": {
"start": "nodemon --exec babel-node index.js"
},

"devDependencies": {
"nodemon": "^2.0.4"
}

nodemon = 프로젝트가 아닌 개발자에게 유용한 것 -> 라이브 서버 확장프로그램 처럼 저장할때마다 서버 새로고침 시켜준다.

# npm install morgan

import morgan from "morgan";

https://www.npmjs.com/package/morgan

index.js -> app.use(morgan("dev"))

# npm install helmet 보안을 위한 express

https://www.npmjs.com/package/helmet

First, run npm install helmet --save for your app. Then, in an Express app:
const express = require("express");
const helmet = require("helmet"); | import helmet from "helmet";

const app = express();

app.use(helmet());

# npm install cookie-parser

seccsion을 다루기 위해 cookie에 유저 정보를 저장해준다.

import cookieParser from "cookie-parser";

app.use(cookieParser())

# npm install body-parser

body로 부터 정보를 얻을 수 있게 해준다.

import bodyParser from "body-parser"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

# pug

var express = require("express");
var app = express()

// app.set(name, value)
app.set("title", "My site");
app.get("title"); //"My Site"

view engine 설정을 바꿀 예정.
view engine 설정의 기본값은 undefined이다.

# 3.0 mongodb (database)

1. mongodb
   설치방법 & 실행/종료 방법
   https://zellwk.com/blog/install-mongodb/

   > mongodb 실행필요 : brew services run mongodb-community
   > mongodb가 실행중인지 확인 : brew services list

   > vscode terminal : mongo 입력으로 실행중인것 확인 가능
   > vscode terminal : mongod 입력시 "port":27017 확인 가능

2. mongoose
   npn install mongoose

3. dotenv
   npm install dotenv
   파일명 : .env (작성시 띄어쓰기 주의!)

# multer (for video upload "URL") - middleware

https://github.com/expressjs/multer/blob/master/doc/README-ko.md

1. npm install multer
2. 추가입력 upload.pug -> form -> enctype="multipart/form-data
3. middleware.js -> Multer만들기

4. mongo 터미널 입력후(실행중일때) 업로드한 동영상 지우기
   > use yourtube
   > output: switched to db yourtube
   > show collections
   > output: videos
   > db.videos.remove({})
   > output: WriteResult({ "nRemoved" : 1 })
   > exit
   > output: bye
