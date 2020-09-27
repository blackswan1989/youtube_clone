//TODO 이 router안에는 /home, /search, /join, /login, /logout URL들이 담겨 있다.

import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  githubLogin,
  logout,
  postGithubLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
//onlyPublic 로그인이 된 상태인지 아닌지 체크해주는 middleware

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

//user가 github으로 갈 때 처리해주는 router -> routes.gitHub
//그 다음 userController의 githubLogin을 실행시킨다.
//그리고 passport의 strategy를 이용하게 된다.`
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  // user가 callbackURL로 접근했다면 아래 passport.authenticate()를 사용한다.
  // 그리고 passport.js의 githubLoginCallback함수를 실행하게 된다.
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

export default globalRouter;
