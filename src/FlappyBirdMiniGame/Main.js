import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { Director } from "./js/Director.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { Land } from "./js/runtime/Land.js";
import { Score } from "./js/player/Score.js";
import { Birds } from "./js/player/Birds.js";
import { DataStore } from "./js/base/DataStore.js";
import { StartButton } from "./js/player/StartButton.js";
import { ApiExamples } from "./js/apiExamples.js";

//初始化呢整个游戏的场景，作为精灵开始的入口
export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.bgm = wx.createInnerAudioContext();
    this.ctx = this.canvas.getContext("2d");
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    //静态方法使用工厂模式获取loader的实例
    const loader = ResourceLoader.create();
    loader.onLoaded((map) => this.onResourceFirstLoaded(map));
  }
  //创建背景音乐
  createBackgroundMusic() {
    this.bgm.autoplay = false;
    this.bgm.loop = true;
    this.bgm.volume = 0.5;
    this.bgm.src = "audios/bgm.mp3";
  }

  //资源全部完成加载时的回调
  onResourceFirstLoaded(map) {
    console.log("资源加载完成:", map);
    this.dataStore.canvas = this.canvas;
    //原型链数据初始化-需要长期保存的数据
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    //背景音乐初始化
    this.createBackgroundMusic();
    //小程序接口测试
    const examples = new ApiExamples();
    examples.getUserInfo_permissionCheck();
    // examples.login();
    // examples.getSetting();
    // examples.httpExample();
    // examples.socketExample();
    // examples.download();

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
      .put("startButton", StartButton)
      .put("bgm", this.bgm);

    //注册触摸事件
    this.registerEvent();
    //创建铅笔要在逻辑运行之前
    this.director.createPencil();
    this.director.run();
  }

  registerEvent() {
    wx.onTouchStart(() => {
      if (this.director.isGameOver) {
        console.log("游戏开始");
        this.init();
      } else {
        this.director.birdsEvent();
      }
    });
  }
}
