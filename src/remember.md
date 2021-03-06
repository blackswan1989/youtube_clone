## package.json | express middleware

## 비디오 샘플 다운로드 | https://file-examples.com/index.php/sample-video-files/sample-mp4-files/

## nodemon

https://www.npmjs.com/package/nodemon
npm install nodemon -D -> "nodemon --exec" script에 추가

"scripts": {
"start": "nodemon --exec babel-node index.js"
},

"devDependencies": {
"nodemon": "^2.0.4"
}

nodemon = 프로젝트가 아닌 개발자에게 유용한 것 -> 라이브 서버 확장프로그램 처럼 저장할때마다 서버 새로고침 시켜준다.

## npm install morgan

import morgan from "morgan";

https://www.npmjs.com/package/morgan

index.js -> app.use(morgan("dev"))

## npm install helmet 보안을 위한 express

https://www.npmjs.com/package/helmet

First, run npm install helmet --save for your app. Then, in an Express app:
const express = require("express");
const helmet = require("helmet"); | import helmet from "helmet";

const app = express();

app.use(helmet());

## npm install cookie-parser

seccsion을 다루기 위해 cookie에 유저 정보를 저장해준다.

import cookieParser from "cookie-parser";

app.use(cookieParser())

## npm install body-parser

body로 부터 정보를 얻을 수 있게 해준다.

import bodyParser from "body-parser"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

## pug

var express = require("express");
var app = express()

// app.set(name, value)
app.set("title", "My site");
app.get("title"); //"My Site"

view engine 설정을 바꿀 예정.
view engine 설정의 기본값은 undefined이다.

## 3.0 mongodb (database)

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

## multer (for video upload "URL") - middleware

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

# #3.11 Installing ESLint

1.  npm install eslint -D
2.  npm install prettier -D
3.  npm install eslint-plugin-prettier -D
4.  npm install eslint-config-prettier -D
5.  npx eslint --init로 .eslintrc.js 생성
6.  .eslintrc.js 설정해주기(OneNote참조)

# #3.12 Searching Videos

1. https://regex101.com/
2. https://regex101.com/library
3. https://regexr.com/

## #4.0 webpack

1.https://webpack.js.org/

- npm install webpack webpack-cli

- webpack.config.js 파일 생성
  (안의 내용은 server코드와는 연관시키지않고, client code 100% 여야 한다.)

- package.json -> script를 "start"에서 "dev:server"로 수정.

- "dev:assets": "WEBPACK_ENV=development webpack -w" 추가
  (dev:assets는 webpack.config.js파일을 찾아 실행된다.)

- "build:assets": "WEBPACK_ENV=production webpack"추가시켜준다.
  ("build:assets"은 내 코드를 server에 올려준다.)

- npm start로 시작하는 것이 아닌 각각 다른 콘솔에서
  npm run dev:server 그리고 npm run dev:assets로 실행시켜준다.\*\*\*

- npm install extract-text-webpack-plugin@next (@next를 붙이면 최신베타버전 설치가능)
  (https://github.com/webpack-contrib/extract-text-webpack-plugin)

- css-loader에러 발생시 : npm install css-loader postcss-loader sass-loader

-2.Autoprefixer (https://github.com/postcss/autoprefixer)

- webpack의 postcss-loader를 위함.
- npm install autoprefixer (설치 후 webpack.confing.js에 코드 작성)
- https://webpack.js.org/loaders/postcss-loader/#autoprefixer 참조하여 설치
- #4.2 extract-text-webpack-plugin 에러시 설치 방법
  > npm install sass-loader@7.1
  > npm install css-loader@1.0.1
  > npm install webpack@4.36
  > 위 사이트 참조하여 `options > postcssOptions > plugins 순서로 코드 수정
  > npm run dev:assets로 실행 \* (정상적으로 구동되면 static파일이 생성 될 것이다.)

## PASSPORT

공식사이트 참조 http://www.passportjs.org/docs/downloads/html/
npm install passport-local-mongoose 설치 (패스워드 설정, 확인 등 자동으로 해준다.)
npm i passport passport-local 설치
npm install express-session 설치

## connect-mongo

npm i connect-mongo

## #6.6 github login

공식사이트 http://www.passportjs.org/packages/passport-github/
npm install passport-github
깃헙에서 application 추가 필요
https://github.com/settings/applications/1383396
.env에서 GH_ID, GH_SECRET 각각 입력해주기 (위 사이트에서 정보 확인 가능)

## 6.10 2:28 ~ #6.12 FACEBOOK 인증 기능 PASS

## 10.1 API Register a View

npm install axios
fetch("URL")

## 11.0 ~ 11.1 AWS S3

- https://console.aws.amazon.com/s3/buckets/yourtube-clone/?region=ap-northeast-2&tab=permissions
- AWS 가입 & S3 Public Bucket 생성
- AWS IAM서비스 -> USER 만들기 -> 프로그래밍 방식 액세스 -> 기존 정책 직접 연결 -> S3검색 -> AmazonS3FullAccess
- 생성시 KEY .env에 바로 저장해주기(해당 화면 닫기 이후 다시 볼 수 없음)
- 설치 : npm i aws-skd multer-s3
- 추가 코드 작성

## 11.2 Blob Duration Bug

- 직접 recording한 동영상의 전체 길이를 불러오지 못하는 에러 해결 위함.
- 공식문서 : https://www.npmjs.com/package/get-blob-duration
- 설치 : npm install get-blob-duration
- videoPlayer.js -> setTotalTime 코드 추가

## 11.4 MongoLab & MongoDB

https://cloud.mongodb.com/v2/5f8d11ce813279179e468b43#clusters

> Connect to Cluster0 User Name : yourtubeadmin
> Connect to Cluster0 User PW : yourtube2020
> db.js와 .env수정
> mongodb+srv://yourtubeadmin:<password>@cluster0.bdhuo.mongodb.net/<dbname>?retryWrites=true&w=majority

## 11.5 Building for Production

- @babel -cli 설치 후 진행
- babel과 관련된 에러날 경우 babel/core, babel/node 둘다 재설치해보기.

## 11.6 Heroku deploying Part ONE

https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
참조 블로그 | https://viewingsunset.tistory.com/7

- Set up -> 설치 | brew install heroku/brew/heroku
- 앱생성: heroku create(heroku 로그인하라는 메세지뜨면 로그인 후 다시 진행)
- git remote -v 로 정상 확인
- 새 Heroku URL 설정
  > heroku git:remote -a ############
  > git remote -v 로 변경주소 확인.
- git push heroku master 입력하여 heruku git에 push 해준다.
  > 푸쉬하기전에 커밋을 필수로 해주어야 한다. (git add . -> git commit -m "내용" -> git push heroku master 순으로 진행)
- 위 진행하면 나오는 https://quiet-waters-83386.herokuapp.com/ 주소접속
- heroku logs --tail 에러확인 -> Build Error -> Define a Procfile 참조
- 수정시 git commit이후 -> vscode 터미널에 git push heroku master 입력해주기

NOTE 생성된 주소 : https://quiet-waters-83386.herokuapp.com

## 11.7 Heroku deploying Part TWO

http://github.com/xavdid/heroku-config

> 설치 : heroku plugins:install heroku-config

- heroku config:push 하면 local 파일을 heroku config로 push해주는 기능이다.
- heroku config를 입력하면 .env 변수들을 확인 할 수 있다.
  > heroku config:push 입력 -> heroku config 입력

# 11.8 Flash Messages

https://www.npmjs.com/package/express-flash

> 설치 : npm i express-flash
