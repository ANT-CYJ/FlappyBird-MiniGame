//进行小程序API的测试

export class ApiExamples {
  //获取用户信息权限检查
  getUserInfo_permissionCheck() {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting["scope.userInfo"]) {
          wx.authorize({
            scope: "scope.userInfo",
            success() {
              // 用户已经同意小程序使用wx.getUserInfo功能，后续调用 wx.getUserInfo接口不会弹窗询问
              getUserInfo();
            },
          });
        } else {
          getUserInfo();
        }
      },
    });

    //获取用户信息
    function getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          console.log(res);
        },
      });
    }
  }

  //登录接口
  login() {
    wx.login({
      success: function (res) {
        console.log(res);
      },
    });
  }

  //获取用户设置
  getSetting() {
    wx.getSetting({
      withSubscriptions: true,
      success: function (res) {
        console.log(JSON.stringify(res));
      },
    });
  }

  //HTTP 网络请求的调用
  httpExample() {
    //POST
    wx.request({
      url: "http://127.0.0.1:8181",
      method: "POST",
      data: "MyData",
      success: function (response) {
        console.log(response);
        //这里可以根据服务器的指示来做相应的动作
      },
    });

    //GET
    wx.request({
      url: "http://www.baidu.com",
      method: "GET",
      success: function (response) {
        console.log(response);
        //这里可以根据服务器的指示来做相应的动作
      },
    });
  }

  //socket接口测试
  socketExample() {
    wx.connectSocket({
      url: "ws://127.0.0.1:8282",
      success: function () {
        console.log("服务端web-socket连接成功");
      },
    });

    //注意，我们发送数据必须在wx.onSocketOpen中进行
    wx.onSocketOpen(function () {
      //通过 WebSocket 连接发送数据。需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送
      wx.sendSocketMessage({
        data: "这个是来自客户端的实时消息",
      });
      //监听 WebSocket 接受到服务器的消息事件
      wx.onSocketMessage(function (message) {
        console.log("接收到客户端消息：", message);
      });
    });
  }

  download() {
    wx.downloadFile({
      url: "https://www.baidu.com/img/flexible/logo/pc/result.png",
      success: function (temp) {
        console.log(JSON.stringify(temp));
      },
    });
  }
}
