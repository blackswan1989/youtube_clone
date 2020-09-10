//app.js의 미들웨어 중 app.use(localsMiddleware);의 별도 파일로 변수 선언.
//참조 | http://expressjs.com/en/5x/api.html#res.locals

import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "YouTube Clone";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};
