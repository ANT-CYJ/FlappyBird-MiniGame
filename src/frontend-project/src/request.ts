/*
 * @Author: Carlos
 * @Date: 2021-03-22 18:59:06
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:01:27
 * @Description: file content
 */

import axios from "axios";

const instance = axios.create({
  baseURL: "/",
});

//加了一层封装，直接导出response.data
instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
