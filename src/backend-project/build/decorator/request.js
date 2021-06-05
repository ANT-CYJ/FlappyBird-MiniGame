"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.Methods = void 0;
//使用枚举类型定义数据范围
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods = exports.Methods || (exports.Methods = {}));
//使用工厂模式生成装饰器代码
function getRequestDecorator(type) {
    return function (path) {
        return function (target, //增进此处对target类型的理解
        key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
//通过工厂模式获取路由装饰器;
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);
