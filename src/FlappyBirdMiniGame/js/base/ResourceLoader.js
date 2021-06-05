import { Resources } from "./Resources.js";

//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
export class ResourceLoader {
  // map = null;
  constructor() {
    //作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
    this.map = new Map(Resources);
    // console.log(this.map);
    for (let [key, value] of this.map) {
      // console.log(key);
      // console.log(value);
      const image = wx.createImage();
      image.src = value;
      this.map.set(key, image);
    }
  }

  //监听全部加载完成
  onLoaded(callback) {
    let loadedCount = 0;
    for (let value of this.map.values()) {
      value.onload = () => {
        loadedCount++;
        if (loadedCount >= this.map.size) {
          //image全部加载完成时执行回调函数
          callback(this.map);
        }
      };
    }
  }

  //工厂模式返回资源加载器
  static create() {
    return new ResourceLoader();
  }
}
