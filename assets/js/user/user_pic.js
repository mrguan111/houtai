$(function() {
    var img = $("#image")
    var options = {
        aspectRatio: 1,
        preview: '.img-preview',
    }
    img.cropper(options)


    $("#uploadPic").on("click", function() {
        var dataURL = img.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        console.log(dataURL)
        $.ajax({
            url: "/api/update/avatar",
            method: "post",
            data: {
                pic: dataURL,
                token: getToken()
            },
            dataType: "jsonp",
            jsonpCallback: "callback",
            success: function(resp) {
                console.log(resp)
                if (resp.code != 200) {
                    return layui.layer.msg("更新头像失败！")
                }

                //让index.html上的所有头像全部使用图片头像
                window.parent.updateHeadPic()
            }

        })
    })


      //选择文件
      $("#checkPic").on("click", function() {
        $("#file").click()
    })

     //监听文件选择动作，然后把文件渲染到裁切框中
     $("#file").on("change", function() {
        var file = $("#file")[0].files[0]
        var url = URL.createObjectURL(file)
        img.cropper("destroy")
            .attr("src", url)
            .cropper(options);
    })
})