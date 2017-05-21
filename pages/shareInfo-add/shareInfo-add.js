var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    showID: "",
    showContentHead: "",
    showContentImportant: "",
    showContentEnd: "",
    editShowInfo:true
  },
  //输入前面内容
  inputHead: function (e) {
    let text = e.detail.value;
    this.setData({
      showContentHead: text
    });
  },
  //输入重要内容
  inputImportant: function (e) {
    let text = e.detail.value;
    this.setData({
      showContentImportant: text
    });
  },
  //输入后面内容
  inputEnd: function (e) {
    let text = e.detail.value;
    this.setData({
      showContentEnd: text
    });
  },


  //请求服务获取详情内容
  getShareDetail: function (ContentID) {
    let that = this;
    let url = app.globalData.address + '/getShareDetail';
    let data = {
      UserNo: app.globalData.userInfo.UserNo,
      ContentID: ContentID
    };
    util.HttpGet(url, data, function (res) {
      if (res.Code == 1) {
        that.setData({
          showID: res.ShareInfo[0]["ShowContentID"],
          showContentHead: res.ShareInfo[0]["ShowContentHead"],
          showContentImportant: res.ShareInfo[0]["ImprotentContent"],
          showContentEnd: res.ShareInfo[0]["ShowContentEnd"],
          emptyBody: false,
        });
      }
    });

  },

  //点击确认
  clickConfirm: function () {
    let that = this;
    let url = app.globalData.address + '/addShareInfo';
    let data = {
      UserNo: app.globalData.userInfo.UserNo,
      ContentID: that.data.showID,
      ContentHead: that.data.showContentHead,
      ImprotantContent: that.data.showContentImportant,
      ContentEnd: that.data.showContentEnd,
    };
    util.HttpGet(url, data, function (res) {
      if (res.Code == 1) {
        let title = "成功";
        if (that.data.showID == "") {
          title = "添加成功";
        } else {
          title = "修改成功";
        }
        wx.showToast({
          title: title,
        });
        wx.navigateBack({
          delta: 1
        })

      }
    });
  },

//点击查看结果
  clickLookResult:function(){
    let that = this;
    let url = app.globalData.address + '/addShareInfo';
    let data = {
      UserNo: app.globalData.userInfo.UserNo,
      ContentID: that.data.showID,
      ContentHead: that.data.showContentHead,
      ImprotantContent: that.data.showContentImportant,
      ContentEnd: that.data.showContentEnd,
    };
    util.HttpGet(url, data, function (res) {
      if (res.Code == 1) {
        wx.redirectTo({
          url: '../shareInfo/shareInfo?contentID=' + that.data.showID + '&shareUserNo=' + app.globalData.userInfo.UserNo + '&shareUserName=' + app.globalData.userInfo.UserName,
        })

      }
    });
  },


  onLoad: function (option) {
    let contentID = typeof (option.contentID) == 'undefined' ? "" : option.contentID;
    if (contentID != "") {
      this.setData({
        editShowInfo:true
      });
      wx.setNavigationBarTitle({
        title: '修改内容'
      })
      this.getShareDetail(contentID);
    } else {
      this.setData({
        editShowInfo: false
      });
      wx.setNavigationBarTitle({
        title: '添加新内容'
      })
    }
  }
})
