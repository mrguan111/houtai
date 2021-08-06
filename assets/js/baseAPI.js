$.ajaxPrefilter(function(options) {
    options.url = "http://192.168.1.115:8080" + options.url
    console.log(options)
})

//保存账号和token
function storeLogin(data) {
    var dataStr = JSON.stringify(data)
    localStorage.setItem("userInfo", dataStr)
}

//获取账号和token
function getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"))
}

function getToken() {
    return JSON.parse(localStorage.getItem("userInfo")).token
}

//删除userInfo
function clearUserInfo() {
    localStorage.removeItem("userInfo")
}