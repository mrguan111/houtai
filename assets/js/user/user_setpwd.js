$(function() {
    var form = layui.form
    form.verify({
        //新旧密码不能一样
        samepwd: function(value) {
            var oldPwd = $("input[name='oldPwd']").val()
            console.log("1次新密码=", value, "旧密码：", oldPwd)
            if (oldPwd == value) {
                return "新密码不能和原密码一致！"
            }
        },
        //新密码两次输入需要一致
        repwd: function(value) {

            var newPwd = $("input[name='newPwd']").val()
            console.log("二次新密码=", value, "一次新密码：", newPwd)
            if (newPwd != value) {
                return "新密码两次输入不一致！"
            }
        }
    })

    //重置密码
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()

        $.ajax({
            url: "/api/updatepwd",
            method: "post",
            dataType: "jsonp",
            jsonpCallback: "callback",
            data: $(".layui-form").serialize() + "&token=" + getToken(),
            success: function(resp) {
                console.log(resp)
                if (resp.code != 200) {
                    return layui.layer.msg("修改密码失败!")
                }
                layui.layer.msg("修改密码成功!")

                $(".layui-form")[0].reset()
            }
        })
    })
})