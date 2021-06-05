/*
 * @Author: Carlos
 * @Date: 2021-03-08 19:56:53
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:12:42
 * @Description: file content
 */
interface Result<T> {
  success: boolean;
  errMsg?: string;
  data: T;
}

export const getResponseData = <T>(data: any, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
    };
  }
  return {
    success: true,
    data,
  };
};
