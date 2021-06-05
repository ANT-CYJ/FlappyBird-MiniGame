import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";

//导演类，控制游戏的逻辑
export class Director {
  constructor() {
    console.log("导演类构造器初始化");
    this.dataStore = DataStore.getInstance();
    this.moveSpeed = 2;
  }

  //单例模式获取导演类实例
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }

  createPencil() {
    const minTop = window.innerHeight / 8;
    const maxTop = window.innerHeight / 2;
    const top = minTop + Math.random() * (maxTop - minTop);

    this.dataStore.get("pencils").push(new UpPencil(top));
    this.dataStore.get("pencils").push(new DownPencil(top));
  }

  //小鸟的触摸上升事件
  birdsEvent() {
    for (let i = 0; i <= 2; i++) {
      //birdsY[i]每次触摸都触发向上的一段偏移，不停触摸，不停向上偏移
      this.dataStore.get("birds").y[i] = this.dataStore.get("birds").birdsY[i];
    }
    this.dataStore.get("birds").time = 0;
  }
  //判断小鸟是否和铅笔撞击
  static isStrike(bird, pencil) {
    let s = false;
    //top值得左上角值为0
    //增加上下偏移量，半个小鸟高度17
    //增加左右偏移量，半个小鸟宽度12
    if (
      bird.top > pencil.bottom - 12 ||
      bird.bottom < pencil.top + 12 ||
      bird.right < pencil.left + 17 ||
      bird.left > pencil.right - 17
    ) {
      //安全区域
      s = true;
    }
    return !s;
  }

  //判断小鸟是否撞击地板和铅笔
  check() {
    const birds = this.dataStore.get("birds");
    const land = this.dataStore.get("land");
    const pencils = this.dataStore.get("pencils");
    const score = this.dataStore.get("score");
    //地板撞击判断，取0，1，2都可以
    //birds.birdsY[0] <= 0,天花板撞击判断
    if (
      birds.birdsY[0] + birds.birdsHeight[0] >= land.y ||
      birds.birdsY[0] <= 0
    ) {
      console.log("撞击地板或者天花板啦");
      this.isGameOver = true;
      return;
    }
    //小鸟模型
    const birdsBorder = {
      top: birds.birdsY[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0],
    };

    //铅笔建模
    const length = pencils.length;

    for (let i = 0; i < length; i++) {
      const pencil = pencils[i];
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width,
      };

      //每个铅笔分别和小鸟做碰撞检测
      if (Director.isStrike(birdsBorder, pencilBorder)) {
        console.log("撞到水管啦");
        this.isGameOver = true;
        return;
      }
    }

    //加分逻辑
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
      score.isScore = false;
      score.scoreNumber++;
    }
  }

  //逻辑部分写在导演类中
  run() {
    this.check(); //每帧检查一次
    if (!this.isGameOver) {
      //绘制背景
      this.dataStore.get("background").draw();
      const pencils = this.dataStore.get("pencils");
      //第一组铅笔到边界时销毁第一组
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length == 4) {
        pencils.shift();
        pencils.shift();
        //第一批铅笔回收时再次开启计分器
        this.dataStore.get("score").isScore = true;
      }
      //销毁后,剩下一组过了屏幕中间时再创建一组
      if (
        pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 &&
        pencils.length == 2
      ) {
        this.createPencil();
      }
      //绘制铅笔
      this.dataStore.get("pencils").forEach((value, index, array) => {
        value.draw();
      });

      //绘制移动的陆地
      this.dataStore.get("land").draw();

      //绘制计分器
      this.dataStore.get("score").draw();

      //绘制小鸟
      this.dataStore.get("birds").draw();

      //移动
      let timer = requestAnimationFrame(() => this.run());
      this.dataStore.put("timer", timer);
    } else {
      console.log("游戏结束");
      this.dataStore.get("startButton").draw();
      cancelAnimationFrame(this.dataStore.get("timer"));
      this.dataStore.destroy();
    }
  }
}
