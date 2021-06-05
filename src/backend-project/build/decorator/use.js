"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
//使用装饰器存储中间件内容
function use(middleware) {
    //增进此处对target类型的理解
    return function (target, key) {
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
exports.use = use;
