const app = getApp()
const db = wx.cloud.database()  //链接数据库

Page({
  data: {
    number: 15,
    array: [],
    time: "",
    ordername:'',
    date: "",
    id:0,
    res:[],
    resdata:[],
    objectArray: [
      { id: 15, url:"../../images/eat.png"},
      { id: 14, url: "../../images/chiyao.png"},
      { id: 13, url: "../../images/drink.png"},
      { id: 12, url: "../../images/dushu.png"},
      { id: 11, url: "../../images/bengdi.png"},
      { id: 10, url: "../../images/games.png"},
      { id: 9, url: "../../images/jianpan1.png"},
      { id: 8, url: "../../images/kaoshi.png"},
      { id: 7, url: "../../images/meeting.png"},
      { id: 6, url: "../../images/shopping.png"},
      { id: 5, url: "../../images/sport.png"},
      { id: 4, url: "../../images/music.png"},
      { id: 3, url: "../../images/sleep.png" },
      { id: 2, url: "../../images/bath.png"},
      { id: 1, url: "../../images/shangke.png"},
      ],
  },
  onLoad: function (options) {
    var that = this
    let array = [];
    var opt = JSON.parse(options.orderdata)
    console.log("事件id："+opt.id)
    that.setData({
      id:opt.id,
      ordername:opt.dataset.name
    })
    for (let i = 0; i < this.data.number; i++) {
      array.push({ color: 'rgba(247, 168, 22, 0.308)' })
    }
    this.setData({
      array: array
    })
    db.collection('admin_data').where({
      _openid: app.globalData.openid
    }).get({
      success(res) {
        console.log("数据库返回值：",res)
        that.setData({
          res: res
        })
      }
    })
  },

choice:function(e){
  var that = this
  console.log("图片id："+e.currentTarget.dataset.id)
  // var pages = getCurrentPages()
  // var indexpages = pages[pages.length - 2]
  // indexpages.imgchange(that.data.objectArray[e.currentTarget.dataset.id].url)
  db.collection('admin_data').where({
    _openid:app.globalData.openid
  }).get({
      success(e1){
        console.log("事件id：",that.data.id)
        that.data.res.data[0].athings[that.data.id - 1].imgsrc = that.data.objectArray[e.currentTarget.dataset.id].url
        that.setData({
          res:that.data.res
        })
        console.log("测试要存储的图片路径：" , that.data.res.data[0].athings[that.data.id - 1].imgsrc)
        that.setData({
          resdata: that.data[0].res
        })
      }
  })
},

  userNameInput:function(e){
    var that = this
    // var pages = getCurrentPages()
    // var indexpages = pages[pages.length - 2]
    // indexpages.namechange(e.detail.value)
    db.collection('admin_data').where({
      _openid: app.globalData.openid
    }).get({
      success(e1) {
        console.log("事件name：" , e.detail.value)
        that.data.res.data[0].athings[that.data.id - 1].things = e.detail.value
        that.setData({
          res: that.data.res
        })
        console.log("测试要存储的name：" , that.data.res.data[0].athings[that.data.id - 1].things)
        that.setData({
          resdata: that.data.res.data[0].athings
        })
      }
    })
  },

  SaveThings:function(){
    let that = this;
    var pages = getCurrentPages()
    var frontpages = pages[pages.length - 2]
    console.log("保存的:",that.data.resdata)
    if(that.data.resdata == 0){
      wx.showToast({
        title: '请填写事件信息',
        image:'../../images/wrong.png'
      })
    }
    else{
      // wx.setStorage({
      //   key: 'orderchange',
      //   data: that.data.resdata,
      // })
      
      var pages = getCurrentPages()
      var frontpages = pages[pages.length - 2]
      frontpages.orderchange(that.data.resdata)
      wx.navigateBack({
        
      })
      db.collection('admin_data').where({
        _openid: app.globalData.openid
      }).get({
        success(res1) {
          console.log(res1)
          db.collection('admin_data').doc(res1.data[0]._id).update({
            data: {
              athings: that.data.resdata
            },
            success(e) {
              console.log(e)
              frontpages.showtoast()
            }
          })

        }
      })                       //上传至数据库
    
    }
  }
})