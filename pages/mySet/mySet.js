// pages/mySet/mySet.js
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

  clear:function(){
    wx.clearStorage()
    wx.showToast({
      title: '清除成功',
    })
  },

aboutus:function(){
  wx.navigateTo({
    url: '../aboutus/aboutus',
  })
},
yinsi:function(){
  wx.navigateTo({
    url: '../yinsi/yinsi',
  })
}

})