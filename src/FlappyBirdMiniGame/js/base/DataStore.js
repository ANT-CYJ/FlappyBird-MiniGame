//变量缓存器，方便我们在不同的类中访问和修改变量
export class DataStore {
  constructor() {
    console.log("DataStore类构造器初始化");
    this.map = new Map();
  }

  //单例模式获取DataStore的对象
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  //设置map值
  put(key, value) {
    if (typeof value === "function") {
      value = new value(); //传入类时不需要使用 new ClassName()，只需要传入ClassName
    }

    this.map.set(key, value);
    return this; //方便链式操作;
  }

  //根据key获取map值
  get(key) {
    return this.map.get(key);
  }

  //销毁map
  destroy() {
    for (let value of this.map.values()) {
      value = null;
    }
  }
}
