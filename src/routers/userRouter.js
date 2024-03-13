import express from "express";
//controller
import { getEdit,postEdit,logout,see,startGithubLogin,finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

//유저 라우터 생성
const userRouter=express.Router();

//route
userRouter.get("/logout",protectorMiddleware,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single("avatar"),postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware,finishGithubLogin);
userRouter.get("/:id",see);



export default userRouter;