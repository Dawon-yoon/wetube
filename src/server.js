import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

//Routers
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";



//app 설정
const app=express(); //항상 해야하는 설정
const logger=morgan("dev");
app.use(logger);

//application here↓
app.set("view engine","pug"); //pug사용가능!
app.set("views",process.cwd()+"/src/views"); //views경로 설정
app.use(logger);
app.use(express.urlencoded({extends:true}));//익스프레스 어플리케이션이 form value 이해,사용할 수 있게 함
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false, //익명 사용자에게 쿠키 안줘
    saveUninitialized:false, //익명사용자 노쿠키
    store:MongoStore.create({mongoUrl:process.env.DB_URL}),
})
); //session middleware ->세션아이디를 만듦!-> 쿠키에 저장-> 백엔드와 브라우저 소통가능:로그인 정보 기억 등
app.use(localsMiddleware); //세션을 템플릿과 공유하는 미들웨어, 꼭 세션 호출 뒤에 불러야 함! 순서 중요!

//routers
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);

export default app;
