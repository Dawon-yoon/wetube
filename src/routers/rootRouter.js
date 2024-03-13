import express from "express";
//controller
import { getJoin,postJoin,getLogin,postLogin } from "../controllers/userController";
import {home,search}  from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

//글로벌 라우터 생성
const rootRouter=express.Router();


//route
rootRouter.get("/",home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search",search);

//export
export default rootRouter;
