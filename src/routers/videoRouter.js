import express from "express";
//controller
import { watch,getEdit,postEdit, getUpload, postUpload } from "../controllers/videoController";

//videoRouter생성
const videoRouter=express.Router();

//:id(\\d+)=>정규식:숫자만!
//:id([0-9a-f]{24})=>정규식:몽구스 아이디
videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);



export default videoRouter;