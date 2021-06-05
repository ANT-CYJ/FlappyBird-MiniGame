//ts ——> .d.ts 翻译文件 ——> js
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

//定义Analyzer的类型，不能使用any
export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

//定义爬虫类
class Crowller {
  private filePath = path.resolve(__dirname, '../../data/course.json');

  //获取HTML数据
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  //文件写入的具体过程
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  //初始化爬取过程
  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  //构造函数
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

export default Crowller;
