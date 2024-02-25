import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db=mongoose.connection;

//db 커넥팅 체크
const handleOpen=()=>console.log("✅Connected to DB");
const handleError=(error)=>console.log("DB Error",error);


db.on("error",handleError); //on은 에러가 있을떄마다 
db.once("open",handleOpen); //once는 연결할 때 한번만 뜨도록,