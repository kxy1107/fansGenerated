//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {

  },
 
  onLoad: function () {
   
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
 
         let isMerchants =  userInfo.ISMerchants;
         if (isMerchants){
           //跳到商家页面
          wx.redirectTo({
            url: '../merchants/merchants',
          })
         }else{
          //跳到注册页面
           wx.redirectTo({
             url: '../register/register',
           })
         }
      
    })
  }
})
