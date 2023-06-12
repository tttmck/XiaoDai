//index.js

const app = getApp()
const db = wx.cloud.database()  //链接数据库
var date = new Date()
var myDate = date.getFullYear() + '-' + (date.getMonth()+1) +'-' + date.getDate()
var imgnum = 1
console.log("今日日期："+myDate)
Page({ 
  data: {
    avatarUrl: './user-unlogin.png',
    nickName:'',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    circlecardloop: [],
    animationData: null,
    action:'addiary',
    name:'',
    pickerimg: ['https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/happy.png?sign=f6c2b0209256333654c5a869a3ebecd3&t=1557225812', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/wuyu.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1557225438', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/cry.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1557225438', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/angry.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1557225438', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/ku.png?sign=1b7f58f3b2bf685872a03983911f2ae3&t=1558858815', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/mengbi.png?sign=1b7f58f3b2bf685872a03983911f2ae3&t=1558858815', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/pibei.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1558858731', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/shoushang.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1558858731', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/zhenjing.png?sign=bd68feab68e057fc569fcd1637038acb&t=1558859002'],
    array: [
     
    ],
    dsply1:'none',
    dsply2:'none',
    num:0,
    showimg: ['../../images/show1.jpg', '../../images/show2.jpg', '../../images/show3.jpg', '../../images/show4.jpg'],
    imgcls:'img',
    butdata:'下一页',
    todaydate:myDate,
    opentype:'',
    arrayshow:[],
    reverse_show:[],
    onGotUserInfo:'',

    change: function (e) {
      wx.navigateTo({
        url: '../logs/logs',
        success: function (e) {
          console.log(e);
        },
        fail: function (e) {
          console.log(e);
        }
      })
    }
  },

  onLoad: function() {
    var that = this
    wx.hideTabBar({
      
    })
    if(app.globalData.res != null)
      this.setData({
        circlecardloop:app.globalData.res
      })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        db.collection('admin_data').where({
          _openid: res.result.openid
        }).get({
          success: function (res1) {
            var arrayres = []
            if (res1.data.length == 0) {
              that.setData({
                dsply2:'none',
                dsply1:'block'
              })
              db.collection('admin_data').add({
                data: {
                  openid: res.result.openid,
                  test:[],
                  dirly: [],
                  athings: [
                    { activecls: "circlecard", count: 1, imgsrc: "../../images/eat.png", things: "吃饭" },
                    { activecls: "circlecard", count: 2, imgsrc: "../../images/sleep.png", things: "睡觉" },
                    { activecls: "circlecard", count: 3, imgsrc: "../../images/drink.png", things: "喝水" },
                    { activecls: "circlecard", count: 4, imgsrc: "../../images/shangke.png", things: "上课" },
                    { activecls: "circlecard", count: 5, imgsrc: "../../images/sport.png", things: "运动" },
                    { activecls: "circlecard", count: 6, imgsrc: "../../images/jianpan1.png", things: "写代码" },
                    { activecls: "circlecard", count: 7, imgsrc: "../../images/bengdi.png", things: "蹦迪" }],
                  donethings:[
                    { count: 1, date: 1, things: "吃饭" },
                    { count: 2, date: 1, things: "睡觉" },
                    { count: 3, date: 1, things: "喝水" },
                    { count: 4, date: 1, things: "上课" },
                    { count: 5, date: 1, things: "运动" },
                    { count: 6, date: 1, things: "写代码" },
                    { count: 7, date: 1, things: "蹦迪" }
                  ],
                  userNickname: '',
                  usercountry: '',
                  usercity: '',
                  userprovince: ''
                },
              }),
                wx.showToast({
                  title: 'newuser',
                })
            }
            else{
              arrayres = res1.data[0].dirly
              console.log("数据库数据：", res1.data[0].dirly)
              wx.showTabBar({
                
              })
              that.setData({
                arrayshow:arrayres,
                // reverse_arrayshow:arrayres,
                // reverse_show:reverse_arrayshow.reverse(),
                array:res1.data[0].dirly,
                  dsply2: 'block',
                  dsply1: 'none'
              })
            }
                app.globalData.res = res1.data[0].test
                that.setData({
                  circlecardloop: res1.data[0].test//列表添加
                })
          },
        })
      },
      
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    

    //获取用户信息

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

  addorder:function(){
    var that = this
    wx.setStorage({
      key: 'orderadd',
      data: that.data.circlecardloop,
    })
    wx.navigateTo({
      url: '../addorder/addorder',
    })
  },

  cancle:function(idd){
    var position = 0
    var i = 0
    var j = 0
    var that = this
    var action1 = 'circlecardloop['+idd.currentTarget.dataset.id+'].activecls'
    that.setData({
      [action1]: 'circlecard-down'
    })
    console.log(that.data.circlecardloop[idd.currentTarget.dataset.id].activecls)
    db.collection('admin_data').where({
      _openid: app.globalData.openid
    }).get({
      success(res1) {
        that.name = idd.currentTarget.dataset.name
        j = res1.data[0].test.length
        console.log("123")
        for (i = 0; i < j;i++){
          if (that.name == res1.data[0].test[i].things){
            position = i
            break
          }
          console.log(i)
        }
        res1.data[0].test.splice(position, 1)
        that.setData({
          circlecardloop: res1.data[0].test//列表添加
        })
        db.collection('admin_data').doc(res1.data[0]._id).update({
          data: {
            test: res1.data[0].test
          },
          success(e1) {
            console.log(e1)
            wx.showToast({
              title: '达成！',
            })
            
          },
          fail(err) {
            console.log(err)
            wx.showToast({
              title: '失败',
            })
          }
        })
      }
    })
  },


  changedata:function(arry){
    var that = this
    var arrayres = arry
    console.log(arry)
    that.setData({
      arrayshow:arrayres,
      // reverse_arrayshow:arrayres,
      // reverse_show:reverse_arrayshow.reverse(),
      array:arry
    })
  },
  wooo:function(e){
    var that = this
    console.log("id:",e.currentTarget.dataset.id)
    wx.setStorage({
      key: 'iddd',
      data: that.data.array[e.currentTarget.dataset.id].date,     //传入当前日记日期
    })
    wx.setStorage({
      key: 'array',
      data: that.data.array,
    })
    wx.navigateTo({
      url: '../dyedit/dyedit',
    })
  },

  addiary:function(){
    var that = this
    var old = 0
    that.setData({
      action:'addiaryclc'
    })
    db.collection('admin_data').where({
      _openid:app.globalData.openid
    }).get({
      success(res){
        console.log(res)
        //判断是否今日已有日记
        if (that.data.array.length == 0){   //空记录 数组添加
          wx.setStorage({
            key: 'iddd',
            data: that.data.todaydate         //传入当前日期
          })
          wx.setStorage({
            key: 'array',
            data: that.data.array,
          })
          wx.navigateTo({
            url: '../dyedit/dyedit',
          })
          console.log(that.data.array)
        }
        else if (myDate == that.data.array[that.data.array.length - 1].date){
          console.log(myDate)
          wx.setStorage({
            key: 'iddd',
            data: that.data.todaydate         //传入当前日期
          })
          wx.setStorage({
            key: 'array',
            data: that.data.array,
          })
          wx.showModal({
            title: '提示',
            content: '已有日记，点击"确定"跳转',
            complete(e){
              console.log(e)
              if(e.confirm == true){
                wx.navigateTo({
                  url: '../dyedit/dyedit',
                })
                that.setData({
                  action: 'addiary'
                })
              }
              else
                that.setData({
                  action: 'addiary'
                })
            }
          })
          
        }
        else if (myDate != that.data.array[that.data.array.length - 1].date){
          console.log(that.data.array)
          
          wx.setStorage({
            key: 'iddd',
            data: that.data.todaydate        //传入当前日期
            
          })
          wx.setStorage({
            key: 'array',
            data: that.data.array,
          })
          console.log(myDate)
          wx.navigateTo({
            url: '../dyedit/dyedit',
          })
          that.setData({
            action: 'addiary'
          })
        }
      }
    })
  },

  showtoast:function(){
    wx.showToast({
      title: '保存成功！',
    })
  },

  nextshow:function(){
    var that = this
    if(imgnum <=3)
    that.setData({
      num:that.data.num+1,
      imgcls:'img'+imgnum
    })
    
    if(imgnum == 3)
      that.setData({
        butdata:'开启！',
        opentype:'getUserInfo',
        onGotUserInfo:'onGotUserInfo'
      })
    if(imgnum > 3){
     
      
      
    }
    imgnum++
  },
  
  onGotUserInfo:function(e){
    var that = this
    
    var name = e.detail.userInfo.nickName
    var coun = e.detail.userInfo.country
    var city = e.detail.userInfo.city
    var prov = e.detail.userInfo.province
    console.log(name)
    db.collection('admin_data').where({
      _openid:app.globalData.openid
    }).get({
      success(res){
        db.collection('admin_data').doc(res.data[0]._id).update({
          data:{
            userNickname: name,
            usercountry: coun,
            usercity: city,
            userprovince: prov,
          }
        })
      }
    })
    that.setData({
      dsply1: 'none',
      dsply2: 'block'
    })
    wx.showTabBar({

    })
  },

  orderadd:function(e){
    var that = this
    that.setData({
      circlecardloop:e
    })
  },
   

})


