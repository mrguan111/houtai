$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    showUserInfo()

    //ajax提交用户信息
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()

        //key=value&key2=value&token=
        var formData = $(".layui-form").serialize()

        $.ajax({
            method: "post",
            url: "/api/updateUser",
            data: formData + "&token=" + getToken(),
            dataType: "jsonp",
            jsonpCallback: "callback",
            success: function(resp) {
                console.log(resp)
                if (resp.code !== 200) {
                    return layui.layer.msg("更新失败!")
                }
                layui.layer.msg("更新成功！")
            }
        })
    })

    //重置表单数据
    $(".layui-form").on("reset", function(e) {
        e.preventDefault()

        showUserInfo()
    })


})

function showUserInfo() {
    //ajax获取用户信息
    $.ajax({
        url: "/api/userinfo?token=" + getToken(),
        dataType: "jsonp",
        jsonpCallback: "callback",
        success: function(resp) {
            console.log(resp)

            //快速给表单赋值
            layui.form.val("user_info", resp.result)
        }
    })
}