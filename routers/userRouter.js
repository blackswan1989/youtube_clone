//TODO 이 router안에는 /user/주소들이 있다.

import express from "express";
import routes from "../routes";
import {
  users,
  editProfile,
  userDetail,
  changePassword,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;

// Router |  http://localhost:4000/user/1
// Router |  http://localhost:4000/user/edit-profile
// Router |  http://localhost:4000/user/password

/*
? MVC | Model, View, Control -> 일종의 구조, 패턴
Model : data 
View : how does the data look 데이터가 어떻게 보이는지
Control : function that looks for the data 데이터를 찾는 함수
*/
