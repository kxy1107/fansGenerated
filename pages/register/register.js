//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World',
    ISMerchants: false,
    userInfo: {},
    phone: "",
  },
  //输入手机号
  inputPhone: function (e) {
    let phone = e.detail.value;
    this.setData({
      phone: phone
    });
  },
  //点击确认
  clickConfirm: function () {
    let UserNo = app.globalData.userInfo.UserNo;
    let Phone = this.data.phone;
    let url = app.globalData.address + '/addMerchants';
    let data = {
      UserNo: UserNo,
      Phone: Phone
      };
    util.HttpGet(url, data,function(res){
      if(res.Code == 1){
        wx.showToast({
          title: '注册成功',
        });

        wx.redirectTo({
          url: '../merchants/merchants',
        })
      }
    })

  },

  onLoad: function () {

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
