import cheerio from 'cheerio';
import fs from 'fs';
import { Analyzer } from './crowller';
//定义课程数据类型
interface Course {
  title: string;
  count: number;
}
//定义解析出的JSON数据类型
interface CourseResult {
  time: number;
  data: Course[];
}
//定义存储数据类型
interface Content {
  [propName: number]: Course[];
}
export default class DellAnalyzer implements Analyzer {
  //使用单例模式
  private static instance: Analyzer; //定义为static静态变量才可以被类直接调用，否则必须实例化后才能调用
  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }
  //获取爬取的信息
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfo: Course[] = [];
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      courseInfo.push({
        title,
        count,
      });
    });

    return {
      time: new Date().getTime(),
      data: courseInfo,
    };
  }

  //获取JSON数据
  private generateJsonContent(CourseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};

    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[CourseInfo.time] = CourseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const CourseInfo = this.getCourseInfo(html);
    console.log('爬取数据结果', CourseInfo);
    const fileContent = this.generateJsonContent(CourseInfo, filePath);
    return JSON.stringify(fileContent);
  }
  private constructor() {}
}
