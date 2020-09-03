//? npm install express = express 설치
//? npm install = package.json파일만있으면 나머지 모두 재설치 가능.
//? node index.js = 로컬호스트 서버 실행 , control+c 서버종료
//? node start = 로컬호스트 서버 실행 http://localhost:4000/

import express from "express";
//const express = require("express");
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from Home");
//http://localhost:4000 주소에서 해당 메시지가 출력된다.
//앞으로 이곳에 html과 css파일 들을 send하게 될 것이다.

const handleProfile = (req, res) => res.send("You are on my profile");
/* 
구버전 작성법 http://localhost:4000/profile 주소에서 해당 메시지가 출력된다.
function handleProfile(req, res) {
  res.send("You are on my profile");
}
*/

/* 미들웨어 출력 순서 확인
const betweenHome = (req, res, next) => {
  console.log("Between");
  next();
};*/

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev")); //미들웨어 middleware

/*
const middleware = (req, res, next) => {
  res.send("not happening"); 
};
  작성시 middleawere는 Home으로 갈 때 연결을 끊을 수 있다. 이처럼 app.use의 미들웨어들은 위에서 아래로 차례차례 실행되어 route에 도달하게 된다.
  */

app.get("/", handleHome); //기본 route 페이지

app.get("/profile", handleProfile); //route 경로들을 설정(html 페이지처럼)

app.listen(PORT, handleListening);

// route는 데이터 패킷에 대한 네트워크상의 최적의 경로를 설정하는 것.
// 즉 URL request를 받아 함수에 전달하는 것으로 -> "/", function 을 작성하여 해당 주소를 요청하면 함수가 작동되도록 경로 설정

/* 
? Express middleware.
미들웨어 함수는 요청 오브젝트(req), 응답 오브젝트 (res), 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수이다. 그 다음의 미들웨어 함수는 일반적으로 next라는 이름의 변수로 표시된다.

미들웨어란 간단하게 말하면 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에 목적에 맞게 처리를 하는, 말하자면 거쳐가는 함수들이라고 보면 된다.

예를 들어서 요청-응답 도중에 시간을 콘솔 창에 남기고 싶으면 미들웨어 함수를 중간에 넣어서 표시를 한 뒤에 계속해서 다음 미들웨어들을 처리할 수 있도록 하는 것이다.
다음 미들웨어 함수에 대한 엑세스는 next 함수를 이용해서 다음 미들웨어로 현재 요청을 넘길 수 있다.

next라는 말에서 알 수 있듯이 next를 통해 미들웨어는 순차적으로 처리된다. (따라서 순서가 중요하다!)

* https://expressjs.com/ko/guide/using-middleware.html 
* https://psyhm.tistory.com/8
*/
