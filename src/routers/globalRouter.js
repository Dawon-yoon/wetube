import express from "express";
//controller
import { join,login } from "../controllers/userController";
import {home}  from "../controllers/videoController";

//글로벌 라우터 생성
const globalRouter=express.Router();


//route
globalRouter.get("/",home);
globalRouter.get("/join",join);
globalRouter.get("/login",login);


//export
export default globalRouter;
