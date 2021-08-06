$(function() {
    //显示账号
    updateUser();

    //给退出a标签注册退出事件
    $("#btnExit").on("click", function() {
        var index = layer.open({
            btn: ['确定', '取消'],
            title: '在线调试',
            content: '您确定要退出吗？',
            yes: function(index, layero) {
                layer.close(index); //如果设定了yes回调，需进行手工关闭

                clearUserInfo()

                window.location.href = "/login.html"
            }
        });
    })
})
function updateHeadPic(){
    console.log('更新的爹');

    $.ajax({
        url: '/api/userinfo',

        data: {
            token: getToken(),
        },
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: function (resp) {
            console.log(resp); 
            //更新个人信息
            storeLogin(resp.result);
            //触发更新头像
            updateUser();
        }
    })
}
function updateUser(){
    var userInfo = getUserInfo()
    if (!userInfo) {
        window.location.href = "/login.html"
    }
    console.log(userInfo)
        //显示头像
    $("#welcome").html("欢迎 " + userInfo.username)

    //有头像
    if (userInfo.pic) {
        $(".layui-nav-img").prop('src',userInfo.pic);
        $(".layui-nav-img").show()
        $(".text-avatar").hide()
    } else {
        //没有头像
        $(".layui-nav-img").hide()
        $(".text-avatar").show()

        //取出用户名的首字母
        $(".text-avatar").html(userInfo.username[0].toUpperCase())
    }

}