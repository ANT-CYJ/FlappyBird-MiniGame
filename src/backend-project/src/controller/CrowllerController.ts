/*
 * @Author: Carlos
 * @Date: 2021-03-19 18:40:46
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:42:29
 * @Description: file content
 */
import fs from "fs";
import path from "path";
import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { controller, use, get } from "../decorator";
import { getResponseData } from "../utils/util";
import Crowller from "../utils/crowller";
import Analyzer from "../utils/Analyzer"; //爬取网页课程信息

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

//定义登录校验中间件
const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  console.log("checkLogin middleware");

  const isLogin = CrowllerController.isLogin(req);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"));
  }
};

//支持设置中间路径
@controller("/api")
export class CrowllerController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false);
  }

  //获取爬虫数据
  @get("/getData")
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance(); //声明为static的属性和变量可以直接被类调用
    // 实例化爬虫类
    new Crowller(url, analyzer);
    res.json(getResponseData<responseResult.getData>(true));
  }

  // 展示爬虫数据;
  @get("/showData")
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf-8");
      res.json(getResponseData<responseResult.showData>(JSON.parse(result)));
    } catch (error) {
      res.json(getResponseData<responseResult.showData>(false, "数据不存在"));
    }
  }
}
