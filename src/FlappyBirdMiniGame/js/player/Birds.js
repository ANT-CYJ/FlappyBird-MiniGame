//小鸟类
//其实是循环渲染三只小鸟
//其实是循环渲染图片的三个部分
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
export class Birds extends Sprite {
  constructor() {
    const image = Sprite.getImage("birds");
    super(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height
    );

    //小鸟的三种状态需要一个数组去存储
    //小鸟的宽是34，小鸟的高是24，上下边距是10，小鸟的左右边距是9

    //小鸟图片裁剪的X坐标
    this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18];
    this.clippingY = [10, 10, 10];
    this.clippingWidth = [34, 34, 34];
    this.clippingHeight = [24, 24, 24];

    //小鸟的起始X坐标
    const birdX = DataStore.getInstance().canvas.width / 4;
    this.birdsX = [birdX, birdX, birdX];
    //小鸟的起始Y坐标
    const birdY = DataStore.getInstance().canvas.height / 2;
    this.birdsY = [birdY, birdY, birdY];

    //小鸟的宽度
    const birdWidth = 34;
    this.birdsWidth = [birdWidth, birdWidth, birdWidth];
    //小鸟的高度
    const birdHeight = 24;
    this.birdsHeight = [birdHeight, birdHeight, birdHeight];

    this.y = [birdY, birdY, birdY];
    //小鸟属于第几只
    this.index = 0;
    this.count = 0;
    //自由落体时间
    this.time = 0;
  }

  draw() {
    //切换三只小鸟的速度
    const speed = 0.2;
    this.count = this.count + speed;
    //0，1，2
    if (this.index >= 2) {
      //当前的小鸟如果下标是2，下次赋值为0
      this.count = 0;
    }
    this.index = Math.floor(this.count);

    //模拟重力加速度下落
    const g = 0.98 / 2.4;
    //向上移动一点偏移量，显得更自然
    const offsetUp = 30;
    //小鸟的位移
    const offsetY = (g * this.time * (this.time - 30)) / 2;
    for (let i = 0; i <= 2; i++) {
      this.birdsY[i] = this.y[i] + offsetY;
    }
    //时间增加
    this.time++;

    super.draw(
      this.img,
      this.clippingX[this.index],
      this.clippingY[this.index],
      this.clippingWidth[this.index],
      this.clippingHeight[this.index],
      this.birdsX[this.index],
      this.birdsY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index]
    );
  }
}
