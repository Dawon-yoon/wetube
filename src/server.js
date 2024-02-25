
import express from "express";
import morgan from "morgan";

//Routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";



//app 설정
const app=express(); //항상 해야하는 설정
const logger=morgan("dev");
app.use(logger);

//application here↓
app.set("view engine","pug"); //pug사용가능!
app.set("views",process.cwd()+"/src/views"); //views경로 설정
app.use(logger);
app.use(express.urlencoded({extends:true}))
//익스프레스 어플리케이션이 form valuefmf 이해하고 사용할 수 있게 함
app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);

export default app;
