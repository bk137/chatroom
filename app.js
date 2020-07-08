var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//所有用户数组
const users = [];

app.use(require('express').static('static'))

app.get('/', (req, res) => {
  res.redirect("./index.html");
});

io.on('connection', (socket) => {
  //用户登录
  socket.on('login', data => {
    console.log(data)
    //判断输入的用户是否存在
    let user = users.find(item => data.nickname === item.nickname);
    if (user) {
      //已存在，返回失败
      socket.emit("error-login", { "msg": "登陆失败" })

    } else {
      //不存在，登录成功
      socket.emit("success-login", data)
      //放进数组
      users.push(data);
      //广播消息,添加一个用户
      io.emit("addUser", data)
      //广播消息，用户列表
      io.emit('userList', users)
      socket.nickname = data.nickname
      socket.avatar = data.avatar
      socket.sex = data.sex
    }
  })
  //用户断开连接的功能
  socket.on("disconnect", () => {
    // 把当前用户的信息从users里面删除
    let idx = users.findIndex(item => item.nickname === socket.nickname)
    if(!idx){
      reutrn;
    }
    users.splice(idx, 1)
    //1.广播所有人 有人离开了
    io.emit("delUser", {
      nickname: socket.nickname,
    })
    //2.广播所有人，用户列表发生变化
    io.emit("userList", users);
  })



  //监听聊天内容
  socket.on("sendMessage", data => {
    console.log(data)
    //广播给所有用户
    io.emit("content",data)
    
  })

});

http.listen(3000, () => {
  console.log('用户已连接');
});

