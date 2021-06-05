/*
 * @Author: Carlos
 * @Date: 2021-03-12 18:12:00
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:22:46
 * @Description: file content
 */
import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controller/LoginController";
import "./controller/CrowllerController";
import router from "./router";

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["teacher neo"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(router);

app.listen(7005, () => {
  console.log("server is running");
});
