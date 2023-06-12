//app.js


App({
  globalData:{
    openid:null,
    code:null,
    res:null,
    date:null
  },
  data:{
    code:''
  },
  onLaunch: function () {
    var that = this
    // wx.setEnableDebug({
    //   enableDebug: true
    // })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

  //   wx.login({
  //   //获取code
  //   success: function (res) {
  //     that.globalData.code = res.code //返回code
  //     console.log(that.globalData.code)
  //   }
  // })

  // setTimeout(function(e) {wx.request({
  //   url: 'https://mspwxn.cn/getid.php',
  //   data: {code:that.globalData.code},
  //   header: {
  //     'content-type': 'application/json'
  //   },
  //   success: function (res) {
  //     console.log(res)
  //     that.globalData.openid = res.data.openid //返回openid
  //     console.log(that.globalData.openid)
  //   }
  // })},1000)
   },
   

  
  
  
})
