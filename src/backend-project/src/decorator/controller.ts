import router from '../router';
import { RequestHandler } from 'express';
import { Methods } from './request';

//创建类的装饰器
export function controller(root: string) {
  return function controller(target: new (...arg: any[]) => any) {
    for (const key in target.prototype) {
      //获取路径信息
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      );
      //获取路径对应的处理方法,比如home对应的方法
      const handler = target.prototype[key];
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        'middlewares',
        target.prototype,
        key
      );
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
