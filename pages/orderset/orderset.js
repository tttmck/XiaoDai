// pages/mine/mine.js
const app = getApp();
const db = wx.cloud.database();
Page({



  data: {
    allthings: [],
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // db.collection('admin_data').where({
    //   _openid: app.globalData.openid
    // }).get({
    //   success(res) {
    //     db.collection('admin_data').doc(res.data._id).update({
    //       data: {
    //         athings: [
    //           { activecls: "circlecard", count: 1, imgsrc: "../../images/eat.png", things: "吃饭" },
    //           { activecls: "circlecard", count: 2, imgsrc: "../../images/sleep.png", things: "睡觉" },
    //           { activecls: "circlecard", count: 3, imgsrc: "../../images/drink.png", things: "喝水" },
    //           { activecls: "circlecard", count: 4, imgsrc: "../../images/shangke.png", things: "上课" },
    //           { activecls: "circlecard", count: 5, imgsrc: "../../images/sport.png", things: "运动" },
    //           { activecls: "circlecard", count: 6, imgsrc: "../../images/jianpan1.png", things: "写代码" },
    //           { activecls: "circlecard", count: 7, imgsrc: "../../images/bengdi.png", things: "蹦迪" }]
    //       },
    //       success(e){
    //         console.log(e)
            
    //       }
    //     })
    //   }
    // })
   this.getdata();

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
      _openid: app.globalData.openid
    }).get({
      success(res2) {
        console.log(res2)
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
    var id = e.currentTarget.id
    var name = e.currentTarget.dataset.name
    console.log(e.currentTarget)
    that.setData({
      id:e.currentTarget.id
    })
    wx.navigateTo({
      url: '../perset/perset?orderdata=' + JSON.stringify(e.currentTarget)
    })
  },

  imgchange:function(e){
    var that = this
    console.log(e)
    var id = that.data.id - 1
    var imgurl = 'allthings[' + id + '].imgsrc'
    that.setData({
      [imgurl]:e
    })
  },
  namechange: function (e) {
    var that = this
    console.log(e)
    var id = that.data.id - 1
    var name = 'allthings[' + id + '].things'
    that.setData({
      [name]: e
    })
  },

  orderchange:function(successdata){
    var that = this
    console.log("函数返回值:",successdata)
        that.setData({
          allthings: successdata//列表添加
        })
  },

  showtoast:function(){
    wx.showToast({
      title: '修改成功',
    })
  }

})