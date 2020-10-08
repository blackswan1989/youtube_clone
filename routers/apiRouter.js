//TODO 이 router안에는 /user/주소들이 있다.

import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postRegisterView,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment)

export default apiRouter;

// Router |  http://localhost:4000/user/1
// Router |  http://localhost:4000/user/edit-profile
// Router |  http://localhost:4000/user/password