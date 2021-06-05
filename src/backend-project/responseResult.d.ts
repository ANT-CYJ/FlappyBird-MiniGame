/*
 * @Author: Carlos
 * @Date: 2021-03-22 19:37:54
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:51:28
 * @Description: file content
 */

declare namespace responseResult {
  interface CourseItem {
    title: string;
    count: number;
  }
  interface DataStructure {
    [key: string]: CourseItem[];
  }

  type isLogin = boolean;
  type login = boolean;
  type logout = boolean;
  type getData = boolean;
  type showData = DataStructure | boolean;
}
