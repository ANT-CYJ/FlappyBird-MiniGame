import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { Land } from "./js/runtime/Land.js";
import { Score } from "./js/player/Score.js";
import { Birds } from "./js/player/Birds.js";
import { DataStore } from "./js/base/DataStore.js";
import { StartButton } from "./js/player/StartButton.js";

//初始化呢整个游戏的场景，作为精灵开始的入口
export class Main {
  constructor() {
    this.canvas = document.getElementById("game_canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    //静态方法使用工厂模式获取loader的实例
    const loader = ResourceLoader.create();
    loader.onLoaded((map) => this.onResourceFirstLoaded(map));
  }
  //资源全部完成加载时的回调
  onResourceFirstLoaded(map) {
    console.log("资源加载完成:", map);
    //原型链数据初始化-需要长期保存的数据
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    //资源数据初始化
    this.init();
  }

  init() {
    //首先重置游戏是没有结束的
    this.director.isGameOver = false;
    this.dataStore
      .put("pencils", [])
      .put("background", BackGround)
      .put("land", Land)
      .put("birds", Birds)
      .put("score", Score)
      .put("startButton", StartButton);

    //注册触摸事件
    this.registerEvent();
    //创建铅笔要在逻辑运行之前
    this.director.createPencil();
    this.director.run();
  }

  registerEvent() {
    this.canvas.addEventListener("touchstart", (e) => {
      //屏蔽掉JS的冒泡事件
      e.preventDefault();
      // console.log("触摸了");
      // console.log(this);
      if (this.director.isGameOver) {
        console.log("游戏开始");
        this.init();
      } else {
        this.director.birdsEvent();
      }
    });
  }
}
