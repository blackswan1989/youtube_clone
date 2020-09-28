import e from "express";
//app.js의 미들웨어 중 app.use(localsMiddleware);의 별도 파일로 변수 선언.
//참조 | http://expressjs.com/en/5x/api.html#res.locals
import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "YourTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //loggedUser -> header.pug
  //req.user를 사용하는 이유는 passport가 로그인 시킬때 쿠키나 serialize, deserialize등의 기능을 모두 지원해주고, user가 담긴 object를 요청(request)에도 올려주기 때문이다.
  //console.log(req.user); id등 정상출력 확인
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

//업로드 연결
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

//"uploadVideo.single("");"에서 single은 오직 하나의 파일만 upload할 수 있다는 것을 의미한다. ("")는 이곳에 들어올 파일의 Name이다. (upload.pug의 input->file의 name설정)
