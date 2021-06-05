/*
 * @Author: Carlos
 * @Date: 2021-03-19 18:39:55
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 19:47:41
 * @Description: file content
 */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, message } from "antd";
import moment from "moment";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

import request from "../../request";
import "./style.css";

interface State {
  loaded: boolean;
  isLogin: boolean;
  data: responseResult.DataStructure;
}

interface LineData {
  name: string;
  type: string;
  data: number[];
}

class Home extends Component {
  state: State = {
    loaded: true,
    isLogin: true,
    data: {},
  };
  componentDidMount() {
    request.get("/api/islogin").then((res) => {
      // console.log(res);
      const data: responseResult.isLogin = res.data;
      if (!data) {
        this.setState({
          isLogin: false,
          loaded: true,
        });
      } else {
        console.log("已登录");
        this.setState({
          loaded: true,
        });
      }
    });
    request.get("/api/showData").then((res) => {
      const data: responseResult.DataStructure = res.data;
      if (data) {
        this.setState({
          data: data,
        });
      } else {
        message.error("展示失败");
      }
    });
  }
  handlelogoutClick = (e: React.MouseEvent) => {
    request.get("/api/logout").then((res) => {
      const data: responseResult.DataStructure = res.data;
      if (data) {
        this.setState({
          isLogin: false,
        });
      } else {
        message.error("退出失败");
      }
    });
  };
  handleCrowllerClick = () => {
    request.get("/api/getData").then((res) => {
      const data: responseResult.getData = res.data;
      if (data) {
        message.success("爬取成功");
      } else {
        message.error("爬取失败");
      }
    });
  };
  getOption: () => echarts.EChartsOption = () => {
    const { data } = this.state;
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (const i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format("MM-DD HH:mm"));
      item.forEach((innerItem) => {
        const { title, count } = innerItem;
        if (courseNames.indexOf(title) === -1) {
          courseNames.push(title);
        }
        tempData[title]
          ? tempData[title].push(count)
          : (tempData[title] = [count]);
      });
    }

    // const result: echarts.EChartsOption.Series[] = [];
    const result: any[] = [];
    for (const i in tempData) {
      result.push({
        name: i,
        type: "line",
        data: tempData[i],
      });
    }
    // console.log(tempData);

    return {
      title: {
        text: "课程在线学习人数",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: courseNames,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: times,
      },
      yAxis: {
        type: "value",
      },
      series: result,
    };
  };

  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className='home-page'>
            <div className='buttons'>
              <Button
                type='primary'
                style={{ marginRight: "25px" }}
                onClick={this.handleCrowllerClick}>
                爬取
              </Button>

              <Button type='primary' onClick={this.handlelogoutClick}>
                退出
              </Button>
            </div>
            <ReactECharts option={this.getOption()} />
          </div>
        );
      }
      return null;
    }
    return <Redirect to='/login'></Redirect>;
  }
}

export default Home;
