import passport, { Strategy } from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//strategy 로그인 하는 방식 -> facebook, github, username&password 등
//지금 이 경우에는, passport-local-mongoose가 제공하는 strategy를 사용하는것.

//serialize, serialization : '어떤 정보를 쿠키에게 주는지'를 의미. 즉 웹브라우저(클라이언트)에 있는 사용자에 대해서 어떤 정보를 가질 수 있는지, 어떤 field가 쿠키에 포함 될 것인지 알려주는 역할.
//app.js의 session->passport->deserializeUser 함수가 실행된다.
//deserialize로 사용자를 식별하게 되면 passport는 찾은 그 사용자를 middleware나 routes의 request object에 할당하게 된다. 그래서 어느 route에서든 로그인한 사용자가 누구인지 알 수 있게 된다.
