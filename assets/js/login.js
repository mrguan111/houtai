$(function() {
    //登录框中的a
    $(".login-box a").on("click", function() {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    //注册框中的a
    $(".reg-box a").on("click", function() {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    //自定义校验
    var form = layui.form
    form.verify({
        username: function(value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
            if (!(/^[\S]{2,18}$/.test(value))) {
                return "用户名长度为4-6位";
            }
        },
        pass: [
            /^[\S]{3,20}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var oldPwd = $("#r_password").val()
            if (oldPwd != value) {
                $("#r_repassword").val('')
                $("#r_password").val('')
                $("#r_password").focus()
                return "两次密码不一致"
            }
        }
    })


    // 监听注册表单的提交事件
    $('#regForm').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#r_username').val(),
            password: $('#r_password').val()
        }
        $.ajax({
            url: '/s/user/regist',
            data: data,
            dataType: "jsonp",
            jsonpCallback: "callback",
            success: function(res) {
                if (res.code !== 200) {
                    return layer.msg(res.msg)
                }
                layer.msg('注册成功，请登录！')
                    // 模拟人的点击行为
                $('#regForm a').click()
            }
        })
    })

    $('#loginForm').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#l_username').val(),
            password: $('#l_password').val()
        }
        $.ajax({
            url: '/s/user/login',
            data: data,
            dataType: "jsonp",
            jsonpCallback: "callback",
            success: function(res) {
                if (res.code !== 200) {
                    return layer.msg(res.msg)
                }

                //存储账号和密钥信息
                //console.log("保存：", res.result)
                storeLogin(res.result)

                layer.msg('登录成功!')
                    //跳转到首页
                window.location.href = "/index.html"
            }
        })
    })
})