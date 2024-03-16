import "dotenv/config"; //가장 먼저 불러와야함&env파일에 숨겨둔 key들을 불러올 수 있음.
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT=4000;

const handleListening=()=>console.log("✅Server listening on port 4000🚀");

app.listen(PORT,handleListening);