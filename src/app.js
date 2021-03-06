//TODO appliecation에 관련된 코드들이 담겨있다.
//express를 import했고, express를 실행한 결과를 app상수로 만들어주었다. 그리고 middleware들을 추가해주었다.
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport"; // passport middleware
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash"
import MongoStore from "connect-mongo";
import {
  localsMiddleware
} from "./middleware";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express(); //app 상수

const CookieStore = MongoStore(session);

//middlewares
app.use(helmet({
  contentSecurityPolicy: false
}));
app.set("view engine", "pug"); //express view engine으로 pug사용 (express는 views폴더를 기본 디렉토리로 찾는다.)
app.set("views", path.join(__dirname, "views"));
// app.use("/uploads", express.static("uploads")); //static: 주어진 directory에서 file을 전달하는 새로운 middleware function | s3설치 후 주석처리
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    //https://randomkeygen.com/ 사이트에서 랜덤텍스트 가져옴.
    //console.log(process.env.COOKIE_SECRET);로 확인해보기.
    //COOKIE_SECRET는 .env에 넣어 보안을 위해 숨김.
    //session은 이를 해독하고 passort로 넘어간다.
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }),
    //CookieStore와 mongo를 연결시켜주어야한다.
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
//passport를 통해 session이 가진 쿠키를 이용한다.
//그리고 그 passport로 passport.js의 deserialize를 진행한다.

app.use(localsMiddleware); //local변수를 global변수로 사용하도록 만들어주는 middleware.

//router를 3개 사용.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app; //누군가가 내 파일을 import로 불러올때 app object를 주겠다는 의미.

//cookieParser는 cookie를 전달받아 사용할수있도록 해준다.(사용자 인증 같은 곳에서 쿠키를 검사할때 사용됨.)
//bodyParser는 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어로 requesest정보에서 form이나 json형태로 된 body를 검사해준다. 아바타의 사진이나 비디오를 업로드 할 때, 제목이나 댓글 같은 정보를 전달할 때 form에 담아서 업로드 해야되기 때문이다.
//helmet 미들웨어는 application이 더 안전하도록 만들어준다.
//morgan 미들웨어의 역할은 application에서 발생하는 모든 일들을 logging하는 것이다.
//app(get request) -> router -> controller(response)