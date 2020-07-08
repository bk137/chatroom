

// var Ajax = {
//     get: function (url, fn) {
//         // XMLHttpRequest对象用于在后台与服务器交换数据
//         var xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = function () {
//             // readyState == 4说明请求已完成
//             if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
//                 // 从服务器获得数据
//                 fn.call(this, xhr.responseText);
//             }
//         };
//         xhr.send();
//     },
//     post: function (url, data, fn,formData) {
//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", url, true);
//         // 添加http头，发送信息至服务器时内容编码类型
//         if (!formData)
//         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
//                 fn.call(this, xhr.responseText);
//             }
//         };
//         xhr.send(data);
//     }
// }



// function registerFn() {
//     var nickname = document.getElementById("nickname").value;
//     var username = document.getElementById("registerUsername").value;
//     var password = document.getElementById("registerPassword").value;
//     if (!/^.{1,6}$/.test(nickname)) {
//         return alert("昵称长度在1-6位之间")
//     }
//     if (!/^[a-zA-Z0-9_-]{4,16}$/.test(username)) {
//         return alert("用户名4到16位（字母，数字，下划线，减号)")
//     }
//     if (!/^[a-zA-Z0-9]{4,16}$/.test(password)) {
//         return alert("密码4到16位（字母，数字)")
//     }
//     registerData.nickname = nickname;
//     registerData.username = username;
//     registerData.password = password;
//     Ajax.post(activePath.requestAddress + "/chatRoom/register", JSON.stringify(registerData), function (e) {
//         // console.log(e)
//         switch (~~e) {
//             case 1: //成功
//                 alert("注册成功")
//                 switchLoginView(0)
//                 break
//             case 2://昵称重复
//                 alert("昵称重复")
//                 break
//             case 3: //账号重复
//                 alert("账号重复")
//                 break
//         }
//     })
// }

// function loginIn() {
//     // var username = document.getElementById("loginUsername").value;
//     // var password = document.getElementById("loginPassword").value;
//     // if (!/^[a-zA-Z0-9_-]{4,16}$/.test(username)) {
//     //     return alert("账号4到16位（字母，数字，下划线，减号")
//     // }
//     // if (!/^[a-zA-Z0-9]{4,16}$/.test(password)) {
//     //     return alert("密码4到16位（字母，数字")
//     // }
//     // var loginData = {
//     //     username: username,
//     //     password: password
//     // }
//     Ajax.post(activePath.requestAddress + "/chatRoom/login", JSON.stringify(loginData), function (e) {
//         if (!e) {
//             alert("用户名或密码错误")
//         } else {
//             userData = JSON.parse(e);
//             document.getElementsByClassName("login-box")[0].style.display = "none"
//             document.getElementById("windowBox").style.display = "flex"
//             document.getElementsByClassName("user-list-header-avatar-img")[0].src = userData.avatar
//             document.getElementsByClassName("user-list-header-avatar-sex")[0].src = userData.sex === 0 ? "https://yuan-1252477692.cos.ap-guangzhou.myqcloud.com/blog/src/chatroom/icon/sex0.png": "https://yuan-1252477692.cos.ap-guangzhou.myqcloud.com/blog/src/chatroom/icon/sex1.png"
//             document.getElementsByClassName("user-list-header-nickname")[0].innerText = userData.nickname
//             document.getElementsByClassName("user-list-header-username")[0].innerText = userData.username
//             chatRoomControl()
//             initEnjoy()
//             loadMessage(document.getElementsByClassName("load-message")[0],true)
//         }
//     })
// }

// function switchLoginView(n) {
//     var loginBox = document.getElementsByClassName("login-box")[0];
//     var resisterBox = document.getElementsByClassName("register-box")[0];
//     if (n === 0) {
//         loginBox.style.display = "block"
//         resisterBox.style.display = "none"
//     } else if (n === 1) {
//         loginBox.style.display = "none"
//         resisterBox.style.display = "block"
//     }
// }

// function initEnjoy() {
//     var enjoy = ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","☺","😇","😐","😑","😶","😏","😣","😥","😮","😯","😪","😫","😴","😌","😛","😜","😝","😒","😓","😔","😕","😲","😷","😖","😞","😟","😤","😢","😭","😦","😧","😨","😬","😰","😱","😳","😵","😡","😠","😈","👿","👹","👺","💀","👻","👽","👦","👧","👨","👩","👴","👵","👶","👱","👮","👲","👳","👷","👸","💂","🎅","👰","👼","💆","💇","🙍","🙎","🙅","🙆","💁","🙋","🙇","🙌","🙏","👤","👥","🚶","🏃","👯","💃","👫","👬","👭","💏","💑","👪","💪","👈","👉","☝","👆","👇","✌","✋","👌","👍","👎","✊","👊","👋","👏","👐","✍","👣","👀","👂","👃","👅","👄","💋","👓","👔","👕","👖","👗","👘","👙","👚","👛","👜","👝","🎒","💼","👞","👟","👠","👡","👢","👑","👒","🎩","🎓","💄","💅","💍","🌂","🌹","🍀","🍎","💰","📱","🌙","🍁","🍂","🍃","🌷","💎","🔪","🔫","🏀","⚽","⚡","👄","👍","🔥"]
//     var enjoyDom = document.createDocumentFragment()
//     var tr = document.createElement("tr");
//     for (var i = 1; i <= enjoy.length; i++) {
//         (function (i) {
//             var td = document.createElement("td");
//             td.onmousedown=function () {
//                 var messageBoxSystemMessageC = document.getElementsByClassName("message-box-system-message-c")[0]
//                 var cursorPositionIndex = getPursorPositionIndex()
//                 var selectionText = getSelectionText()
//                 var oldValue = messageBoxSystemMessageC.value
//                 if (messageBoxSystemMessageC === document.activeElement) {
//                     //选中有内容 内容替换表情
//                     if (selectionText){
//                         //截取光标后的内容
//                         messageBoxSystemMessageC.value = oldValue.substring(0,cursorPositionIndex) + oldValue.substring(cursorPositionIndex,oldValue.length).replace(selectionText,enjoy[i-1])
//                     }
//                     else if (cursorPositionIndex!==undefined){//没选内容 插入表情
//                         messageBoxSystemMessageC.value = oldValue.substring(0,cursorPositionIndex) + enjoy[i-1] + oldValue.substring(cursorPositionIndex,oldValue.length)
//                     }
//                 }else {
//                     messageBoxSystemMessageC.value = oldValue + enjoy[i-1]
//                 }
//                 document.getElementsByClassName("enjoy-view")[0].style.display = "none"
//             }
//             td.innerText = enjoy[i-1]
//             tr.appendChild(td)
//             if (i%12===0) {
//                 enjoyDom.appendChild(tr)
//                 tr = document.createElement("tr");
//             }
//         })(i)
//     }
//     enjoyDom.appendChild(tr)
//     document.getElementById("enjoyViewTable").appendChild(enjoyDom)
// }

//获取光标位置
function getPursorPositionIndex(){
    var oTxt1 = document.getElementsByClassName("message-box-system-message-c")[0];
    try {
        var cursurPosition=-1;
        if(oTxt1.selectionStart){//非IE浏览器e799bee5baa6e997aee7ad94e59b9ee7ad9431333330333630
            cursurPosition= oTxt1.selectionStart;
        }else{//IE
            var range = document.selection.createRange();
            range.moveStart("character",-oTxt1.value.length);
            cursurPosition=range.text.length;
        }
    }catch (e) {

    }
    return cursurPosition;
}
//获取光标选中的内容
function getSelectionText() {
    if(window.getSelection) {
        return window.getSelection().toString();
    } else if(document.selection && document.selection.createRange) {
        return document.selection.createRange().text;
    }
    return '';
}


var wsControllerM = null
function chatRoomControl() {
    // initChatRoomOne()
    wsControllerM = new initChatRoomMore()
}
// // 群聊通道
// function initChatRoomMore() {
//     this.ws = new WebSocket(activePath.wsAddress+"/chat/room/group/" + userData.id);

//     this.ws.onopen = function(evt) {  //绑定连接事件
//         console.log("群聊通道已接入");
//     };

//     this.ws.onmessage = function(evt) {//绑定收到消息事件
//         var data = JSON.parse(evt.data)
//         handelMessage(data)
//     };

//     this.ws.onclose = function(evt) { //绑定关闭或断开连接事件
//         alert("当前聊天通道已断开！");
//         location.reload()
//     };
//     this.ws.onerror = function (ev) {
//         alert("聊天室异常！！！");
//         location.reload()
//     }
// }


// var handelMessageFn = new HandelMessageFn()
// function handelMessage(message) {
//     var fn = {
//         s0: handelMessageFn.s0,
//         s1: handelMessageFn.s1,
//         s2: handelMessageFn.s2,
//         s3: handelMessageFn.s3,
//         s4: handelMessageFn.s4,
//         s5: handelMessageFn.s5
//     }["s" + message.type]

//     if (message.type === 1||message.type===2||message.type===5){//在线用户列表,所有用户,强制下线
//         fn(message)
//     }else if (message.receiveId === "0" && roomUser===null){//群聊消息
//         fn(message)
//     } else {
//         // 1、判断当前active窗口为消息窗口 发送人==房间人 在当前私聊窗口
//         if (roomUser!==null&&~~message.launchId===~~roomUser.id) {
//             fn(message)
//         }else if (~~message.launchId !== 0){//不是系统发送
//             // console.log("不在当前窗口")
//             //发送信息给我的人不在最近用户列表里面，加载最近用户
//             var isIn = false
//             for (let i = 0; i < relevantUserList.length; i++) {
//                 if(relevantUserList[i].id === ~~message.launchId){
//                     isIn = true
//                 }
//             }
//             if (!isIn) loadRelevantUser(false)
//         }

//     }
// }

// var messageBoxContent = document.getElementsByClassName("message-box-content")[0]
// function HandelMessageFn() {
//     // this.inLineUserObj = {}
//     // var that = this
//     this.s0=function (message) {
//         if (~~message.launchId === ~~userData.id){
//             Ajax.post(activePath.requestAddress + "/chatRoom/user/info",userData.id, function (e) {
//                 if(e==='') return alert("异常用户")
//                 userData = JSON.parse(e)
//                 initSuccess = true
//             })

//         }

//         var timeDom = document.createElement("p")
//         timeDom.className = "message-system"
//         timeDom.innerText = timeChange(message.createTime)
//         messageBoxContent.appendChild(timeDom)
//         var messageSystem = document.createElement("div")
//         messageSystem.className = "message-system"
//         messageSystem.innerText = message.content
//         messageBoxContent.appendChild(messageSystem)
//         messageBoxContent.scrollTop = messageBoxContent.scrollHeight
//     }
//     this.s1=function (message) {
//         // var userListTab = document.getElementsByClassName("user-list-tab")[0].getElementsByTagName("div")
//         // if (userListTab[0].classList.contains("user-list-tab-on")){
//         //
//         // } else if (userListTab[1].classList.contains("user-list-tab-on")){
//         // }
//         loadRelevantUser(true)
//         inLineUserList = JSON.parse(message.content)
//         loadSocketUser(1,false)

//     }
//     this.s2 = function (message) {
//         // 获取所有用户
//         socketUserList = JSON.parse(message.content)
//         // console.log(socketUserList)
//         document.getElementById("user-list-title-count-g").innerText = socketUserList.length
//     }
//     this.s3 = function (message) {
//         var cDom = document.createElement("span")
//         cDom.innerText = message.content
//         //创建时间
//         createTimeDom(message)
//         preTime = message.createTime
//         messageBoxContent.appendChild(createMessageDom(message,cDom))
//         messageBoxContent.scrollTop = messageBoxContent.scrollHeight
//     }
//     this.s4 = function (message) {
//         var messageImg = document.createElement("img")
//         messageImg.className = "message-img"
//         messageImg.src = message.content
//         messageImg.onload = function(){
//             messageBoxContent.scrollTop = messageBoxContent.scrollHeight
//         }
//         createTimeDom(message)
//         messageBoxContent.appendChild(createMessageDom(message,messageImg))

//     }
//     this.s5 = function (message) {
//         wsControllerM.ws.close()
//         alert("您被强制下线")
//     }
// }

/**
 * 处理用户列表、
 * n=0最近列表,n=1全部用户列表
 */
// function loadSocketUser(n,b) {
//     var inlineNum = 0
//     var userListDom = document.createDocumentFragment()
//     var spareInlineUser = {}
//     for (var i in inLineUserList) {
//         inlineNum += 1
//         inLineUserList[i].inline = true
//         spareInlineUser['s'+inLineUserList[i].id] = inLineUserList[i]
//     }
//     //在线提前
//     var socketUserListSpare = JSON.parse(JSON.stringify(n===0?relevantUserList : socketUserList))
//     var inlineArr = []
//     var offlineArr = []
//     for (var i = 0; i < socketUserListSpare.length; i++) {
//         if (spareInlineUser['s'+socketUserListSpare[i].id]){
//             inlineArr.push(spareInlineUser['s'+socketUserListSpare[i].id])
//         }else {
//             offlineArr.push(socketUserListSpare[i])
//         }
//     }
//     socketUserListSpare = inlineArr.concat(offlineArr)

//     var bb =false
//     for (var i = 0;i< socketUserListSpare.length;i++){
//         (function (i){
//             var item = document.createElement("div")
//             item.className = "user-list-header user-list-item"
//             item.onclick = switchChatRoom
//             item.setAttribute("uData",JSON.stringify(socketUserListSpare[i]))
//             var avatar = document.createElement("div")
//             avatar.className = "user-list-header-avatar user-list-item-header-avatar"
//             var img = document.createElement("img")
//             img.src = socketUserListSpare[i].avatar
//             avatar.appendChild(img)
//             var text = document.createElement("div")
//             text.className = "user-list-header-txt"
//             var nickname = document.createElement("p")
//             nickname.className = "user-list-header-nickname user-list-item-header-nickname"
//             nickname.innerText = socketUserListSpare[i].nickname
//             text.appendChild(nickname)
//             item.appendChild(avatar)
//             item.appendChild(text)

//             var statusTag = document.createElement("span")

//             if (socketUserListSpare[i].inline){//添加在线标签
//                 statusTag.className = "status-tag inline-tag"
//                 statusTag.innerText = "在线"
//             } else {
//                 statusTag.className = "status-tag"
//                 statusTag.innerText = "离线"
//             }
//             item.appendChild(statusTag)
//             // 聊天选中
//             if (roomUser!==null && ~~socketUserListSpare[i].id === ~~roomUser.id && !bb) {
//                 document.getElementsByClassName("active-u-l")[0].classList.remove("active-u-l")
//                 item.classList.add("active-u-l")
//                 // document.getElementsByClassName("message-box-title")[0].innerText = roomUser.nickname
//                 if (!b) setInitRoom()
//                 bb=true
//                 roomUser = socketUserListSpare[i]
//             }
//             userListDom.appendChild(item)
//         })(i)
//     }

//     if (n===0){
//         document.getElementsByClassName("user-list-items-relevant")[0].innerHTML = ""
//         document.getElementsByClassName("user-list-items-relevant")[0].appendChild(userListDom)
//     }else{
//         document.getElementsByClassName("user-list-items-all")[0].innerHTML = ""
//         document.getElementsByClassName("user-list-items-all")[0].appendChild(userListDom)
//         document.getElementById("user-list-title-inline-g").innerText = inlineNum
//         document.getElementById("inline-user-u").innerText = inlineNum
//     }

//     if (roomUser===null)
//         document.getElementsByClassName("message-box-title")[0].innerText = "群聊（"+inlineNum+")"
// }

// // 处理相关用户列表
// function loadRelevantUser(b){
//     Ajax.get(activePath.requestAddress + "/chatRoom/users/relevant/"+userData.id, function (e) {
//         relevantUserList=JSON.parse(e)
//         if (relevantUserList.length>0){
//             loadSocketUser(0,b)
//         }else {
//             //无最近联系人
//             document.getElementsByClassName("user-list-items-relevant")[0].innerHTML = "<p class='data-empty'>无最近联系人</p>"
//         }
//     })
// }
// //点击发送信息
// function sendMessage() {
//     if (!initSuccess)return;
//     var contentDom = document.getElementsByClassName("message-box-system-message-c")[0]
//     var val = contentDom.value
//     if (val.trim() === "")return
//     var message = {
//         launchId: userData.socketId,
//         receiveId: roomUser ? roomUser.socketId : -1,//客户端提交socketId，服务端返回userId
//         content: val,
//         type: 3
//     }
//     //私聊
//     if (roomUser!==null){
//         message.static = true
//         message.createTime = new Date().getTime()
//         handelMessageFn.s3(message)
//         if (!roomUser.inline){
//             message.type = 30
//             // 不在线 提交用户id
//             message.receiveId = roomUser.id
//         }
//         wsControllerM.ws.send(JSON.stringify(message))
//     }else {
//         //群聊
//         wsControllerM.ws.send(JSON.stringify(message))
//     }
//     contentDom.value = ""

// }



// /**
//  * 判断最后一个消息距离接收以及发送的消息事件判断是否显示发送时间
//  */
// function createTimeDom(message) {
//     var messageItems = document.getElementsByClassName("message-item")
//     if (messageItems.length === 0 || message.createTime - preTime > 300000 || cTime()){
//         var timeDom = document.createElement("p")
//         timeDom.className = "message-system"
//         timeDom.innerText = timeChange(message.createTime)
//         messageBoxContent.appendChild(timeDom)
//     }

//     function cTime() {
//         var t = 0
//         if (messageItems.length > 0){
//             t = messageItems[messageItems.length-1].getAttribute("t")
//             return message.createTime - t > 300000
//         }
//         return false
//     }

// }
/**
    加载历史消息
    对方roomUser，自己roomUser
 */
// function loadMessage(that,isScroll) {
//     var loadNode = that
//     // that.style.display = "none"
//     that.parentNode.removeChild(that)
//     var params = {
//         date: new Date(loadTime)
//     }
//     if (roomUser!==null){
//         params.launchId = userData.id
//         params.receiveId = roomUser.id
//     }
//     Ajax.post(activePath.requestAddress+ "/chatRoom/group/message", JSON.stringify(params), function (e) {
//         if (e){
//             var messigeList = JSON.parse(e)
//             if (messigeList.length>0){
//                 var domBox = document.createDocumentFragment()
//                 domBox.appendChild(loadNode)
//                 for (var i = messigeList.length-1; i >= 0; i--) {
//                     // 时间
//                     if ((i>0 && messigeList[i-1].createTime - messigeList[i].createTime > 300000)||i===messigeList.length-1){
//                         var timeDom = document.createElement("p")
//                         timeDom.className = "message-system"
//                         timeDom.innerText = timeChange(messigeList[i].createTime)
//                         domBox.appendChild(timeDom)
//                     }
//                     if (messigeList[i].type === 0){
//                         var messageSystem = document.createElement("div")
//                         messageSystem.className = "message-system"
//                         messageSystem.innerText = messigeList[i].content
//                         domBox.appendChild(messageSystem)
//                     }else {
//                         var cDom
//                         if (messigeList[i].type === 3){
//                             cDom = document.createElement("span")
//                             cDom.innerText = messigeList[i].content
//                         } else if (messigeList[i].type === 4){
//                             cDom = document.createElement("img")
//                             cDom.className = "message-img"
//                             cDom.src = messigeList[i].content
//                             cDom.onload=function () {
//                                 if (isScroll)
//                                 messageBoxContent.scrollTop = messageBoxContent.scrollHeight
//                             }
//                         }
//                         domBox.appendChild(createMessageDom(messigeList[i],cDom))
//                     }
//                 }
//                 var messageBoxContentH = messageBoxContent.scrollHeight
//                 messageBoxContent.insertBefore(domBox,messageBoxContent.childNodes[0])
//                 messageBoxContent.scrollTop = messageBoxContent.scrollHeight - messageBoxContentH


//                 that.style.display = "block"
//                 loadTime = messigeList[messigeList.length-1].createTime
//             }
//         }
//     })
// }

// 创建聊天信息dom
// function createMessageDom(message,cDom) {
//     var messageItem = document.createElement("div");
//     messageItem.setAttribute("t",message.createTime)
//     var messageItemU = document.createElement("div")
//     messageItemU.className = "message-item-u"

//     var avatar = document.createElement("img")
//     avatar.className = "message-item-avatar"
//     if (message.static){
//         avatar.src = userData.avatar
//     }else {
//         avatar.src = message.launchUser.avatar
//     }

//     var content = document.createElement("div")
//     content.className = "message-item-content"

//     var bubble = document.createElement("div")
//     bubble.className = "message-item-content-bubble"
//     if (cDom)
//     bubble.appendChild(cDom)

//     content.appendChild(bubble)
//     if (message.launchId == userData.id || message.static){
//         messageItem.className = "message-item right"
//         messageItemU.appendChild(content)
//         messageItemU.appendChild(avatar)
//     } else {
//         messageItem.className = "message-item left"
//         var nickname = document.createElement("p")
//         nickname.className = "message-item-content-nickname"
//         nickname.innerText = message.launchUser.nickname
//         content.insertBefore(nickname,content.childNodes[0])
//         messageItemU.appendChild(avatar)
//         messageItemU.appendChild(content)
//     }
//     messageItem.appendChild(messageItemU)
//     return messageItem
// }


// /*
//     聊天室面板切换
//  */
// function switchChatRoom() {
//     var uData = JSON.parse(this.getAttribute("uData"))
//     // console.log(roomUser)
//     if (uData.id === userData.id) return
//     roomUser = uData
//     document.getElementsByClassName("active-u-l")[0].classList.remove("active-u-l")
//     this.classList.add("active-u-l")
//     document.getElementsByClassName("message-box-title")[0].innerText = roomUser.nickname
//     setInitRoom()
//     hiddenUserListPopup()
// }
// // 群聊切换
// function switchChatRoomGroup(that){
//     document.getElementsByClassName("active-u-l")[0].classList.remove("active-u-l")
//     that.classList.add("active-u-l")
//     roomUser = null
//     document.getElementsByClassName("message-box-title")[0].innerText = "聊天室(" + document.getElementById("user-list-title-inline-g").innerText +")"
//     setInitRoom()
//     hiddenUserListPopup()
// }
// function setInitRoom(){
//     var loadDom = document.createElement("div")
//     loadDom.innerText = "加载更多"
//     loadDom.className = "load-message"
//     loadDom.onclick = function (ev) {
//         loadMessage(this,false)
//     }
//     var iconDom = document.createElement("span")
//     iconDom.className = "iconfont icon-time"
//     loadDom.insertBefore(iconDom,loadDom.childNodes[0])

//     messageBoxContent.innerHTML = ""
//     setTimeout(function () {
//         messageBoxContent.appendChild(loadDom)
//         document.getElementsByClassName("message-box-system-message-c")[0].value = ""
//         loadTime=new Date().getTime()
//         preTime=new Date().getTime()
//         loadMessage(document.getElementsByClassName("load-message")[0],true)

//     },200)
// }



// function timeChange(time){
//     var thisTime = new Date().getTime()
//     var timeObj = new Date(time)
//     var hours = timeObj.getHours()
//     var minutes = timeObj.getMinutes()
//     var timeStr = (hours < 10 ? '0' + hours : hours)+":"+(minutes < 10 ? '0' + minutes : minutes)
// // 今天凌晨的时间
//     var thisTime0 = new Date(new Date(thisTime).setHours(0, 0, 0, 0)).getTime()
// // 需要转换的时间的凌晨时间
//     var time0 = new Date(new Date(time).setHours(0, 0, 0, 0)).getTime()
// // 相差天数
//     var dayDiff = Math.floor((thisTime0 - time0)/86400000)

//     if(dayDiff === 0) {
//         return timeStr
//     } else if(dayDiff === 1) {
//         return "昨天 " + timeStr
//     } else if (dayDiff === 2) {
//         return "前天" + timeStr
//     } else {
//         var month = timeObj.getMonth()
//         var day = timeObj.getDate()
//         return timeObj.getFullYear()+"-"+(month < 10 ? '0' + month : month)+"-"+(day < 10 ? '0' + day : day) +" "+timeStr
//     }
// }

// function showUserListPopup() {
//     document.getElementsByClassName("web03")[0].classList.add("mobile")
// }
// function hiddenUserListPopup() {
//     document.getElementsByClassName("web03")[0].classList.remove("mobile")
// }

// function switchUserListTab(n) {
//     var userListTab = document.getElementsByClassName("user-list-tab")[0].getElementsByTagName("div")
//     if (!userListTab[0].classList.contains("user-list-tab-on")){
//         if (n===0)loadRelevantUser(true)
//     }else {
//         //设置选中
//         var userListItemsAll = document.getElementsByClassName("user-list-items-all")[0].getElementsByClassName("user-list-item")
//         for (let i = 0; i < userListItemsAll.length; i++) {
//             var userItem = JSON.parse(userListItemsAll[i].getAttribute("uData"))
//             if (roomUser!==null && userItem.id === roomUser.id) {
//                 document.getElementsByClassName("active-u-l")[0].classList.remove("active-u-l")
//                 userListItemsAll[i].classList.add("active-u-l")
//                 break
//             }
//         }
//     }
//     document.getElementsByClassName("user-list-tab-on")[0].classList.remove("user-list-tab-on")
//     userListTab[n].classList.add("user-list-tab-on")
//     document.getElementsByClassName("user-list-items-relevant")[0].style.display = ["block","none"][n]
//     document.getElementsByClassName("user-list-items-all")[0].style.display = ["none","block"][n]
// }