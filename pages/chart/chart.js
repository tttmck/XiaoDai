// pages/chooseLib/chooseLib.js
let Charts = require('wxcharts.js')
const app = getApp()
const db = wx.cloud.database()  //链接数据库
Page({
  data: {
    array:[],
    thingarry:[]
  },

  onLoad: function (options) {
    // var i
    // var j = ''
    // var that = this
    // db.collection('admin_data').where({
    //   _openid: app.globalData.openid
    // }).get({
    //   success(res){
    //     that.setData({
    //       array:res.data[0].test
    //     })
    //     console.log(that.data.array)
    //     for (i in that.data.array){
    //       j = that.data.array[i].things
    //       for(k in that.data.array){
    //         if (j == that.data.array[k].things){
              
    //         }
    //       }
    //     }
    //   }
    // })


    new Charts({
      canvasId: 'canvas1',
      type: 'pie',
      series: [{ name: '吃饭', data: 3 }, { name: '喝水', data: 2 }, { name: '写代码', data: 4 }, { name: '运动', data: 1 }, { name: '上课', data: 5 }],
      width: 300,
      height: 300,
      dataLabel: true,
    });
  },


})