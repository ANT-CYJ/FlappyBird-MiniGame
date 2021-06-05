import { CrowllerController, LoginController } from '../controller';

//使用枚举类型定义数据范围
export enum Methods {
  get = 'get',
  post = 'post',
}

//使用工厂模式生成装饰器代码
function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (
      target: CrowllerController | LoginController, //增进此处对target类型的理解
      key: string
    ) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}
//通过工厂模式获取路由装饰器;
export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
