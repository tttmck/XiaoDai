// pages/showpages/showpages.js

var imgnum = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dsply1: 'none',
    dsply2: 'none',
    num: 0,
    showimg: ['../../images/show1.jpg', '../../images/show2.jpg', '../../images/show3.jpg', '../../images/show4.jpg'],
    imgcls: 'img',
    butdata: '下一页',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  nextshow: function () {
    var that = this
    if (imgnum <= 3)
      that.setData({
        num: that.data.num + 1,
        imgcls: 'img' + imgnum
      })

    if (imgnum == 3)
      that.setData({
        butdata: '开启！',
      })
    if (imgnum > 3)
      wx.switchTab({
        url: '../index/index',
      })
    imgnum++
  },
})
