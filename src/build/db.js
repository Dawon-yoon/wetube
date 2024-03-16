"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect(process.env.DB_URL);
var db = _mongoose["default"].connection;

//db 커넥팅 체크
var handleOpen = function handleOpen() {
  return console.log("✅Connected to DB");
};
var handleError = function handleError(error) {
  return console.log("DB Error", error);
};
db.on("error", handleError); //on은 에러가 있을떄마다 
db.once("open", handleOpen); //once는 연결할 때 한번만 뜨도록,