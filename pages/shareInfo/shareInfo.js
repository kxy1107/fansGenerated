// pages/shareInfo/shareInfo.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptyBody: true,//空数据控制
    userInfo: "",
    shareUserNo: "",
    shareUserName: "",
    contentHead: "",
    contentImportant: "",
    contentEnd: "",
    contentID: "",
    totalMoney: 0.00,
    friendClickList: [],
  },


  //请求服务获取详情内容
  getShareDetail: function () {
    let that = this;
    let url = app.globalData.address + '/getShareDetail';
    let data = {
      UserNo: app.globalData.userInfo.UserNo,
      ContentID: this.data.contentID
    };
    util.HttpGet(url, data, function (res) {
      if (res.Code == 1) {
        that.setData({
          contentHead: res.ShareInfo[0]["ShowContentHead"],
          contentImportant: res.ShareInfo[0]["ImprotentContent"],
          contentEnd: res.ShareInfo[0]["ShowContentEnd"],
        });
        that.addFriendLink();
      }
    });

  },


  //请求服务获取我的好友抢记录
  getLinkRecord: function () {
    let that = this;
    let url = app.globalData.address + '/getLinkRecord';
    let data = {
      ShowContentID: this.data.contentID,
      UserNo: that.data.userInfo.UserNo,
      ShareUserNo: that.data.shareUserNo,
    };
    util.HttpGet(url, data, function (res) {
      if (res.Code == 1) {

        if (res.LinkList.length > 0) {
          that.setData({
            totalMoney: res.TotalMoney,
            friendClickList: res.LinkList,
            emptyBody:false,
          });
        }

        
      }
    });

  },

  //进入页面后自动生成
  addFriendLink: function () {
    let that = this;
    // if (this.data.shareUserNo == this.data.userInfo.UserNo) {
    //   return;
    // }

    let url = app.globalData.address + '/addLinkInfo';
    let data = {
      ShowContentID: this.data.contentID,
      ShareUserNo: this.data.shareUserNo,
      ClickUserNo: this.data.userInfo.UserNo,
    };
    util.HttpGet(url, data, function (res) {
      if (res.Code == 1) {
        that.getLinkRecord();
      }
    });
  },


  //点击我也要
  clickCreat: function () {
    //将分享者改成自己
    this.setData({
      shareUserNo: this.userInfo.UserNo,
      shareUserName: this.userInfo.UserName,
    });
    //显示分享按钮
    wx.showShareMenu({
      withShareTicket: true
    })
  },



  //分享
  onShareAppMessage: function () {
    return {
      title: '快来帮我抢红包',
      path: '../shareInfo/shareInfo?contentID=' + this.data.contentID + '&shareUserNo=' + this.data.shareUserNo + '&shareUserName=' + this.data.UserName,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      contentID: options.contentID,
      shareUserNo: options.shareUserNo,
      shareUserName: options.shareUserName,
      userInfo: app.globalData.userInfo
    });
    //第一个分享者可以分享，不可二次分享
    if (options.shareUserNo == app.globalData.userInfo.UserNo) {
      wx.showShareMenu({
        withShareTicket: true
      })
    } else {
      wx.hideShareMenu()
    }

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getShareDetail();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})
