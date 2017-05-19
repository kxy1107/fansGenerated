//app.js
var util = require('/utils/util.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
   
  },
  getUserInfo:function(cb){
    var that = this
      //调用登录接口
      wx.login({
        success: function (loginRes) {
          var url = that.globalData.address + '/login';
          var data = {
            Code:loginRes.code
          }
          util.HttpGet(url,data,function(res){
           wx.getUserInfo({
             withCredentials:true,
             success:function(res){
               let getUserUrl = that.globalData.address + '/getUserInfo';
              let userData = {
                encryptedData: res.encryptedData,
                iv:res.iv,
              };
              util.HttpGet(getUserUrl, userData, function (resUserData) {
                console.log("resUserData:" + resUserData);
                that.globalData.userInfo = resUserData;
                return typeof cb == "function" && cb(resUserData)
              })
             }
           })

          });
  
        }
      })
    
  },
  globalData:{
    address:"http://127.0.0.1:8017",
    userInfo:null
  }
})