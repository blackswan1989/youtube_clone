import express from "express";

const userRouter = express.Router();

export default userRouter;

/* 
? Router setting example
userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));
* Router |  http://localhost:4000/user
* Router |  http://localhost:4000/user/edit
* Router |  http://localhost:4000/user/password


? MVC | Model, View, Control -> 일종의 구조, 패턴
Model : data 
View : how does the data look 데이터가 어떻게 보이는지
Control : function that looks for the data 데이터를 찾는 함수
*/
