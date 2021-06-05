(function () {
  "use strict";
  const WebSocketServer = require("ws").Server;

  const ws = new WebSocketServer({
    port: 8282,
  });

  ws.on("connection", function (ws) {
    console.log("客户端已经连接啦");
    //接收到小游戏发送的数据所调用的方法
    ws.on("message", function (message) {
      console.log("接收到客户端消息：", message);
      ws.send("这是来自服务端的实时消息");
    });
  });
})();
