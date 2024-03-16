"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));
var _api = _interopRequireDefault(require("./routers/api.Router"));
var _middlewares = require("./middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//Routers

//app 설정
var app = (0, _express["default"])(); //항상 해야하는 설정
var logger = (0, _morgan["default"])("dev");
app.use(logger);

//application here↓
app.set("view engine", "pug"); //pug사용가능!
app.set("views", process.cwd() + "/src/views"); //views경로 설정
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger);
app.use(_express["default"].urlencoded({
  "extends": true
})); //익스프레스 어플리케이션이 form value 이해,사용할 수 있게 함
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  //익명 사용자에게 쿠키 안줘
  saveUninitialized: false,
  //익명사용자 노쿠키
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
})); //session middleware ->세션아이디를 만듦!-> 쿠키에 저장-> 백엔드와 브라우저 소통가능:로그인 정보 기억 등
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localsMiddleware); //세션을 템플릿과 공유하는 미들웨어, 꼭 세션 호출 뒤에 불러야 함! 순서 중요!

//routers
app.use("/", _rootRouter["default"]);
app.use("/uploads", _express["default"]["static"]("uploads")); //uploads folder files is could see at browser
app.use("/static", _express["default"]["static"]("assets"));
app.use("/videos", _videoRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/api", _api["default"]);
var _default = exports["default"] = app;