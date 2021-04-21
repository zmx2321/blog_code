"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default(); // 实例化
// 监听路由
// 根路径
app.get("/", function (req, res, next) {
    res.send('node ts api is working...');
});
// 打包上线时可以识别端口号
// 启动一个端口
app.listen(process.env.PORT || 8091, function () {
    console.log('Server started...');
});
