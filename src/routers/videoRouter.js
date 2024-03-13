import express from "express";
//controller
import { watch,getEdit,postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

//videoRouter생성
const videoRouter=express.Router();

//:id(\\d+)=>정규식:숫자만!
//:id([0-9a-f]{24})=>정규식:몽구스 아이디
videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo)
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"),postUpload);



export default videoRouter;