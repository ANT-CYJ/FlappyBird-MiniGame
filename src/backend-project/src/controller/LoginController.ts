/*
 * @Author: Carlos
 * @Date: 2021-03-19 18:37:22
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:41:33
 * @Description: file content
 */
import { Request, Response } from "express";
import "reflect-metadata";
import { controller, get, post } from "../decorator";
import { getResponseData } from "../utils/util";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller("/api")
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get("/islogin")
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    const result = getResponseData<responseResult.isLogin>(isLogin);
    res.json(result);
  }

  //登出路径
  @post("/login")
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body;
    const isLogin = LoginController.isLogin(req);
    console.log(req.body);

    if (isLogin) {
      res.json(getResponseData<responseResult.login>(true, "已经登陆过"));
    } else {
      if (password === "123" && req.session) {
        req.session.login = true;
        // res.send('登陆成功!');
        res.json(getResponseData<responseResult.login>(true));
      } else {
        res.json(getResponseData<responseResult.login>(false, "登陆失败!"));
        // res.send('登陆失败!');
      }
    }
  }

  //登出路径
  @get("/logout")
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<responseResult.logout>(true));
  }
}
