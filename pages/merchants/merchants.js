//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    userInfo:"",
    emptyBody:false,
    shareList:[],
  },

//点击列表跳到编剧界面
  clickItem:function(e){
    let contentID = e.currentTarget.dataset.id;
    let shareNo = app.globalData.userInfo.UserNo;
    wx.navigateTo({
      url: '../shareInfo-add/shareInfo-add?contentID=' + contentID,
    })
  },

//点击添加
  clickAdd:function(){
    wx.navigateTo({
      url: '../shareInfo-add/shareInfo-add',
    })
  },
  
  //请求服务获取我的内容列表
  getMyShowContent:function(){
    let that = this;
    let url = app.globalData.address + '/getMyShareInfo';
    let data = {
      UserNo: app.globalData.userInfo.UserNo
    };
    util.HttpGet(url,data,function(res){
      if(res.Code == 1){
        if (res.ShareMyList.length > 0){
          that.setData({
            shareList: res.ShareMyList,
            emptyBody:false,
          });
        }else{
          that.setData({
            emptyBody: true
          });
        }
       
      }
    });
  },
  onShow:function(){
    this.getMyShowContent();
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  }


})
