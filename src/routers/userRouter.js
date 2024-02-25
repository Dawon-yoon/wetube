import express from "express";
//controller
import { editUser,remove,logout,see } from "../controllers/userController";

//유저 라우터 생성
const userRouter=express.Router();

//route
userRouter.get("/logout",logout);
userRouter.get("/edit",editUser);
userRouter.get("/remove",remove);
userRouter.get(":id",see);



export default userRouter;