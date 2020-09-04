//TODO 이 router안에는 /user/주소들이 있다.

import express from "express";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.users, (req, res) => res.send("Users"));
userRouter.get(routes.userDetail, (req, res) => res.send("User Detail"));
userRouter.get(routes.editProfile, (req, res) => res.send("Edit Profile"));
userRouter.get(routes.changePassword, (req, res) =>
  res.send("Change Password")
);

export default userRouter;

// Router |  http://localhost:4000/user
// Router |  http://localhost:4000/user/edit
// Router |  http://localhost:4000/user/password

/*
? MVC | Model, View, Control -> 일종의 구조, 패턴
Model : data 
View : how does the data look 데이터가 어떻게 보이는지
Control : function that looks for the data 데이터를 찾는 함수
*/
