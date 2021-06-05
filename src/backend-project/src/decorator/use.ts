import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';
//使用装饰器存储中间件内容
export function use(middleware: RequestHandler) {
  //增进此处对target类型的理解
  return function (target: CrowllerController | LoginController, key: string) {
    const originMiddlewares =
      Reflect.getMetadata('middlewares', target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
  };
}
