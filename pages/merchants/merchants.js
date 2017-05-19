//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    userInfo:"",
    shareList:[
      {
        ShowContentID:"111",
        ShowContentHead:"哈哈哈头",
        ImprotentContent: "哈哈哈中",
        ShowContentEnd: "哈哈哈尾",
      },
      {
        ShowContentID: "222",
        ShowContentHead: "哈哈哈头哈哈哈头哈哈哈头哈哈哈头哈哈哈头哈哈哈头222",
        ImprotentContent: "哈哈哈中222",
        ShowContentEnd: "哈哈哈尾222",
      },
      {
        ShowContentID: "333",
        ShowContentHead: "哈哈哈头333",
        ImprotentContent: "哈哈哈中333",
        ShowContentEnd: "哈哈哈尾哈哈哈头哈哈哈头333",
      }
    ],
  },

  clickItem:function(e){
    let contentID = e.currentTarget.dataset.id;
    let shareNo = app.globalData.userInfo.UserNo;
    wx.navigateTo({
      url: '../shareInfo/shareInfo?contentID=' + contentID + '&shareNo=' + shareNo,
    })
  },
  
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  }
})
