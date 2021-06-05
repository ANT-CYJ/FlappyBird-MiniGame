"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Carlos
 * @Date: 2021-03-12 18:12:00
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:22:46
 * @Description: file content
 */
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrowllerController");
var router_1 = __importDefault(require("./router"));
var app = express_1.default();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: "session",
    keys: ["teacher neo"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(router_1.default);
app.listen(7005, function () {
    console.log("server is running");
});
