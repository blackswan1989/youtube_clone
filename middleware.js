//app.js의 미들웨어 중 app.use(localsMiddleware);의 별도 파일로 변수 선언.
//참조 | http://expressjs.com/en/5x/api.html#res.locals
import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "YourTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");

//"uploadVideo.single("");"에서 single은 오직 하나의 파일만 upload할 수 있다는 것을 의미한다. ("")는 이곳에 들어올 파일의 Name이다. (upload.pug의 input->file의 name설정)
