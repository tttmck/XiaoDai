// pages/fedback/fedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  up:function(){
    wx.showToast({
      title: '提交成功！',
      success(e){
        setTimeout(function(){
          wx.navigateBack({

          })
        },300)
        
      }
    })
  }

})