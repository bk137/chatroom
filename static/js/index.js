const registerData = {}
var initSuccess=false,socketUserList = [], users = [], loadTime = new Date().getTime(), preTime = new Date().getTime(), roomUser = null, inLineUserList = [], relevantUserList = [];
const socket = io("http://localhost:3000/");

window.onload = function () {
    (function () {
        //判断是否已经登录
        // initIsLogin()
        //初始化选择头像
        initAvatar()
    })()

    // function initIsLogin() {
    //     // 登录直接到message box
    //     if(JSON.stringify(registerData) != "{}"){
    //         $(".register-box").hide();
    //         $("#windowBox").show();
    //     } 
    // }

    function initAvatar() {
        var avatarList = document.getElementById("avatarList");
        var avatarDom = document.createDocumentFragment()
        for (var i = 1; i <= 8; i++) {
            (function () {
                var img = document.createElement("img");
                img.src = "http://localhost:3000/image/avatar" + i + ".jpg";
                img.className = i === 1 ? "avatar-login avatar-login-on" : "avatar-login"
                img.onclick = function () {
                    selectAvatar(img)
                }
                avatarDom.appendChild(img)
            })()
        }
        avatarList.appendChild(avatarDom)
    }

    function selectAvatar(img) {
        var avatarDom = document.getElementsByClassName("avatar-login")
        for (var i = 0; i < avatarDom.length; i++) {
            if (avatarDom[i].classList.contains("avatar-login-on")) {
                avatarDom[i].classList.remove("avatar-login-on")
                break
            }
        }
        img.className = "avatar-login avatar-login-on"
        registerData.avatar = img.src
    }
}


//提交登录数据
function registerFn() {
    var nickname = document.getElementById("nickname").value;
    var avatar = $(".avatar-login-on").attr("src");
    var sex = $("input:radio:checked").val();
    socket.emit("login", {
        nickname: nickname,
        avatar: avatar,
        sex: sex
    })
}

socket.on("error-login", data => {
    alert(data.msg)
})

socket.on("success-login", data => {
    $(".register-box").fadeOut();
    $("#windowBox").css('display', "flex");
    registerData.nickname = data.nickname;
    registerData.sex = data.sex;
    registerData.avatar = data.avatar;
    let sex_url = `http://localhost:3000/image/sex${data.sex}.png`;
    $("#avatar_url").attr("src", data.avatar);
    $(".user-list-header-txt>p>span").text(data.nickname);
    $(".user-list-header-txt>p:eq(1)").text(data.nickname);
    $(".user-list-header-txt>p>img").attr('src', sex_url);
    initEnjoy()
})



//监听新增用户
socket.on("addUser", data => {
    $(".message-box-content").append(`
        <div class="message-system">${data.nickname}进入聊天室</div>
    `)
})

//监听所有用户
socket.on("userList", data => {
    $('.user-list-items-all').html('');
    data.forEach(e => {
        $(".user-list-items-all").append(`
        <div class="user-list-header user-list-item">
            <div class="user-list-header-avatar user-list-item-header-avatar">
                <img src="${e.avatar}" alt="">
            </div>
            <div class="user-list-header-txt">
                <span class="user-list-header-nickname user-list-item-header-nickname">${e.nickname}</span>
                <img src="http://localhost:3000/image/sex${e.sex}.png" class="user-list-header-avatar-sex">
            </div>
        </div>
        `)
    });

    $("#message-box-title-inline").text(`聊天室(${data.length})`);
})
//监听删除用户
socket.on("delUser", data => {
    //添加离开信息
    $(".message-box-content").append(`
        <div class="message-system">${data.nickname}骂骂咧咧地离开了聊天室</div>
    `)
})

//聊天功能
function sendMessage() {
    //获取内容
    let content = $(".message-box-system-message-c").val().trim()
    console.log(content)
    //清楚内容
    $(".message-box-system-message-c").val("")
    //判断不为空 
    if (!content) return alert("内容不能为空")

    //发送服务器
    socket.emit("sendMessage", {
        'type': 'text',
        'content': content,
        'user': registerData
    });
}

//监听全局信息
socket.on("content",data=>{
    console.log(data)
    //判断当前信息是否为自己得
    if(data.user.nickname!=registerData.nickname){
        //不是自己的往左边靠
        //判断发过来得是什么类型得信息
        if(data.type=='text'){
            $('.message-box-content').append(`
            <div class="message-item left">
                <div class="message-item-u">
                    <img src="${data.user.avatar}" alt="" class="message-item-avatar">
                    <div class="message-item-content">
                        <p class="message-item-content-nickname">${data.user.nickname}</p>
                        <div class="message-item-content-bubble">${data.content}</div>
                    </div>
                </div>
             </div>
        `)
        }else if(data.type=="img"){
            $('.message-box-content').append(`
            <div class="message-item left">
                <div class="message-item-u">
                    <img src="${data.user.avatar}" alt="" class="message-item-avatar">
                    <div class="message-item-content">
                        <p class="message-item-content-nickname">${data.user.nickname}</p>
                        <img src="${data.content}" style="max-width:150px;max-height:150px;" /> 
                    </div>
                </div>
             </div>
        `)  
        }
        
    }else{
        //判断type
        if(data.type=='text'){
            $('.message-box-content').append(`
            <div t="1594023891000" class="message-item right">
                <div class="message-item-u">
                    <div class="message-item-content">
                        <div class="message-item-content-bubble">
                            ${data.content}
                        </div>
                    </div>
                    <img class="message-item-avatar" src="${data.user.avatar}">
                </div>
            </div>
        `)
        }else if(data.type=='img'){
            $('.message-box-content').append(`
            <div t="1594023891000" class="message-item right">
                <div class="message-item-u">
                    <div class="message-item-content">
                        <img src="${data.content}" style="max-width:150px;max-height:150px;" /> 
                    </div>
                    <img class="message-item-avatar" src="${data.user.avatar}">
                </div>
            </div>
        `)
        }
        
    }
    //当前元素得底部滚动到可视区
    $('.message-box-content').children(":last").get(0).scrollIntoView(false);
})



// 表情
function showEnjoy(n) {
    document.getElementsByClassName("enjoy-view")[0].style.display = ["none", "inline-block"][n]
}
//加载表情 
function initEnjoy() {
    var enjoy = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "☺", "😇", "😐", "😑", "😶", "😏", "😣", "😥", "😮", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "😒", "😓", "😔", "😕", "😲", "😷", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😬", "😰", "😱", "😳", "😵", "😡", "😠", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "👦", "👧", "👨", "👩", "👴", "👵", "👶", "👱", "👮", "👲", "👳", "👷", "👸", "💂", "🎅", "👰", "👼", "💆", "💇", "🙍", "🙎", "🙅", "🙆", "💁", "🙋", "🙇", "🙌", "🙏", "👤", "👥", "🚶", "🏃", "👯", "💃", "👫", "👬", "👭", "💏", "💑", "👪", "💪", "👈", "👉", "☝", "👆", "👇", "✌", "✋", "👌", "👍", "👎", "✊", "👊", "👋", "👏", "👐", "✍", "👣", "👀", "👂", "👃", "👅", "👄", "💋", "👓", "👔", "👕", "👖", "👗", "👘", "👙", "👚", "👛", "👜", "👝", "🎒", "💼", "👞", "👟", "👠", "👡", "👢", "👑", "👒", "🎩", "🎓", "💄", "💅", "💍", "🌂", "🌹", "🍀", "🍎", "💰", "📱", "🌙", "🍁", "🍂", "🍃", "🌷", "💎", "🔪", "🔫", "🏀", "⚽", "⚡", "👄", "👍", "🔥"]
    var enjoyDom = document.createDocumentFragment()
    var tr = document.createElement("tr");
    for (var i = 1; i <= enjoy.length; i++) {
        (function (i) {
            var td = document.createElement("td");
            td.onmousedown = function () {
                var messageBoxSystemMessageC = document.getElementsByClassName("message-box-system-message-c")[0]
                var cursorPositionIndex = getPursorPositionIndex()
                var selectionText = getSelectionText()
                var oldValue = messageBoxSystemMessageC.value
                if (messageBoxSystemMessageC === document.activeElement) {
                    //选中有内容 内容替换表情
                    if (selectionText) {
                        //截取光标后的内容
                        messageBoxSystemMessageC.value = oldValue.substring(0, cursorPositionIndex) + oldValue.substring(cursorPositionIndex, oldValue.length).replace(selectionText, enjoy[i - 1])
                    }
                    else if (cursorPositionIndex !== undefined) {//没选内容 插入表情
                        messageBoxSystemMessageC.value = oldValue.substring(0, cursorPositionIndex) + enjoy[i - 1] + oldValue.substring(cursorPositionIndex, oldValue.length)
                    }
                } else {
                    messageBoxSystemMessageC.value = oldValue + enjoy[i - 1]
                }
                document.getElementsByClassName("enjoy-view")[0].style.display = "none"
            }
            td.innerText = enjoy[i - 1]
            tr.appendChild(td)
            if (i % 12 === 0) {
                enjoyDom.appendChild(tr)
                tr = document.createElement("tr");
            }
        })(i)
    }
    enjoyDom.appendChild(tr)
    document.getElementById("enjoyViewTable").appendChild(enjoyDom)
    let obj = new Date();
    let hour = obj.getHours();
    let minute = obj.getMinutes();
    $(".message-box-content").append(`
        <p class="message-time">今天${hour}:${minute}</p>
    `)
}

// 发送图片
function choiceImg(e) {
    // if (!initSuccess) return alert("请在初始化成功后再发送图片")
    var file = e.files[0]
    //需要把这个文件发送到服务器，借助 H5新增得fileReader
    var fr = new FileReader()
    fr.readAsDataURL(file);
    fr.onload = function(){
        socket.emit("sendMessage",{
            type:"img",
            content:fr.result,
            user:registerData,
        })
    }
}

//ctrl+enter
document.onkeydown = function (e) {
    var keyCode = e.keyCode || e.which || e.charCode;
    if (e.ctrlKey && keyCode === 13) {
        sendMessage()
    }
}

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

