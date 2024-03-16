"use strict";

require("dotenv/config");
require("./db");
require("./models/Video");
require("./models/User");
require("./models/Comment");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//가장 먼저 불러와야함&env파일에 숨겨둔 key들을 불러올 수 있음.

var PORT = 4000;
var handleListening = function handleListening() {
  return console.log("✅Server listening on port 4000🚀");
};
_server["default"].listen(PORT, handleListening);