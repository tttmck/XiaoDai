// pages/mine/mine.js
const app = getApp();
const db = wx.cloud.database();
Page({

  

  data: {
      allthings:[],
      circlecardloop:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    this.getdata();
    wx.getStorage({
      key: 'orderadd',
      success: function(res) {
        that.setData({
          circlecardloop:res.data
        })
        console.log(that.data.circlecardloop)
      },
    })
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  getdata: function () {     //获取后台事件数量，加入列表
    var that = this
    db.collection('admin_data').where({
      _openid:app.globalData.openid
    }).get({
      success(res2) {
        app.globalData.athings = res2.data[0].athings
          that.setData({
            allthings: app.globalData.athings//列表添加
          })
        console.log(app.globalData.athings)
      }
    })
  },

  addon: function (e) {
    var that = this
    console.log(e.currentTarget)
    var id = e.currentTarget.id
    var name = e.currentTarget.dataset.name
    var imgurl = e.currentTarget.dataset.imgurl
    var cls = e.currentTarget.dataset.cls
    var length = that.data.circlecardloop.length
    that.data.circlecardloop.push({
      idd: id,
      count: length,
      things: name,
      imgsrc: imgurl,
      activecls: cls
    })
    console.log(length)
    var page = getCurrentPages()
    var page1 = page[page.length - 2]
    page1.orderadd(that.data.circlecardloop)
    wx.switchTab({
      url: '../index/index',
    })
    
    db.collection('admin_data').where({
      _openid: app.globalData.openid
    }).get({
      success(res1) {
        res1.data[0].test.push({
          idd:id,
          count: res1.data[0].test.length,
          things: name,
          imgsrc:imgurl,
          activecls:cls
        })
        
        app.globalData.res = res1.data[0].test
        
        db.collection('admin_data').doc(res1.data[0]._id).update({
          data: {
            test: res1.data[0].test
          },
          success(e1) {
            console.log(e1)
            wx.showToast({
              title: '添加成功！',
            })
          },
        })
      }
    })
  },

  

})