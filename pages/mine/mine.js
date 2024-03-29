// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      avatarUrl: '',
      userInfo: {},
      logged: false,
      takeSession: false,
      requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../mine/mine',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              
            }
          })
        }
      }
    })
  },

  charts:function(){
    wx.navigateTo({
      url: '../chart/chart',
    })
  },

  onGetUserInfo:function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },


})

