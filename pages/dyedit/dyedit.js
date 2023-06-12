const app = getApp();
const db =wx.cloud.database()
var myDate = new Date();
var yearr = myDate.getFullYear();
var monthh = myDate.getMonth()+1;
var dayy = myDate.getDate();
var dater = yearr+'-'+monthh+'-'+dayy;
var QQMapWX = require('qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    dateyear: '2019',
    datemonth: '6',
    dateday: '6',
    datexq: 0, //星期数 周日为0 0-7
    location: 'XX大学',
    concent: '',
    date: dater,
    setdate:'',
    region: [],
    index: 0,
    picker: ['开心', '无语', '伤心', '生气', '酷', '懵比', '疲惫', '受伤', '震惊'],
    pickerimg: ['https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/happy.png?sign=f6c2b0209256333654c5a869a3ebecd3&t=1557225812', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/wuyu.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1557225438', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/cry.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1557225438', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/angry.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1557225438', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/ku.png?sign=1b7f58f3b2bf685872a03983911f2ae3&t=1558858815', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/mengbi.png?sign=1b7f58f3b2bf685872a03983911f2ae3&t=1558858815', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/pibei.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1558858731', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/shoushang.png?sign=e52891ddb21c25cc0e6591891b07c9fb&t=1558858731', 'https://687a-hztx-8bc80c-1257718290.tcb.qcloud.la/zhenjing.png?sign=bd68feab68e057fc569fcd1637038acb&t=1558859002'],
    viewshow:true,
    textshow:true,
    focus:false,
    mytrue: true,
    myfalse: false,
    scrtop: 0,
    supercount: 0,
    dirly1:{},
    array:[],
    inner:''
  },

  onLoad: function (options) {
    var that = this
    var key = 0
    var getlatitude
    var getlongitude
    wx.getStorage({
      key: 'iddd',
      success: function (res) {
        console.log("当前日记日期:",res.data)
        that.setData({
          setdate: res.data        //setdate以时间为标准获取当前日记数据
        })
      },
    })
    wx.getStorage({
      key: 'array',
      success: function (res) {
        that.setData({
          array:res.data
        })
        for (var i = 0; i < that.data.array.length; i++)
          if (that.data.array[i].date == that.data.setdate) {
            console.log("编号：",i)
            key = 1
            
            that.setData({
              date: that.data.array[i].date,
              region: that.data.region,
              index: that.data.array[i].index,
              inner: that.data.array[i].inner
              
            })
          }
        if(key = 0&&that.data.array.length!=0){
          that.data.array.push({
            index: 0,
            date: dater,
            inner: ''
          })
        }
        else if(that.data.array.length == 0){
          console.log("时间：",myDate)
          that.data.array[that.data.array.length] = {
            index: 0,
            date: dater,
            inner: ''
          }
        }
      },
    })

    qqmapsdk = new QQMapWX({
      key: 'UX3BZ-W4QW6-MYFSR-MGNCL-LC4TE-IYFRE'
    });
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        console.log(res)
        getlatitude = res.latitude,
        getlongitude = res.longitude,
        console.log("123")
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: getlatitude,
            longitude: getlongitude
          },
          success: function (res) {//成功后的回调
            console.log(res);
            var res = res.result;
            var mks = [];
            //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.address,
              id: 0,
              latitude: res.location.lat,
              longitude: res.location.lng,
              iconPath: './resources/placeholder.png',//图标路径
              width: 20,
              height: 20,
              callout: { //在markers上展示地址名称，根据需求是否需要
                content: res.address,
                color: '#000',
                display: 'ALWAYS'
              }
            });
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            console.log(res);
            that.setData({
              region: [res.result.address_component.province , res.result.address_component.city , res.result.address_component.district]
            })
          }
        })
      },
      formSubmit(e) {
        
      }
    })
  },


  

  write: function(e){
    this.setData({
      viewshow: false,
      textshow: true,
      focus: true
    })
  },

  changeinner:function(e){
    var that = this
    console.log(e)
    that.setData({
      inner:e.detail.value
    })
  },

  over: function(e){
    console.log(e.detail.value)
    this.setData({
      inner: e.detail.value,
    })
  },
  rowchange:function(e){
    var lineCount = e.detail.lineCount;
    var count = (lineCount-18)*25;
    var supercount = this.data.supercount
    if (lineCount > 35 && lineCount > supercount){
      this.setData({
        focus: false,
        supercount: lineCount
      })
    }
    if (lineCount >= 18 && lineCount != supercount && lineCount<=35){
      // count+=50;
      this.setData({
        scrtop: count,
        supercount: lineCount
      })
    }
    
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },


  save:function(e){
    var that = this
    var old = 0;
    for (var i = 0; i < that.data.array.length; i++) {
      if (that.data.setdate == that.data.array[i].date) {
        console.log(that.data.setdate + ":" + that.data.inner)
        that.data.array[i] = {
          date: that.data.setdate,
          region: that.data.region,
          index: that.data.index,
          inner: that.data.inner
        }
        app.globalData.date = i
        old = 1;
        console.log("日记更改结果：",that.data.array,":",i)
        break
      }
    }
    if (old == 0) {
      that.data.array.push({
        date: dater,
        region: that.data.region,
        index: that.data.index,
        inner: that.data.inner
      })
      console.log('日记添加结果：',that.data.array)
    }
    var pages = getCurrentPages()
    var indexpages = pages[pages.length - 2]
    indexpages.changedata(that.data.array)
    wx.navigateBack({
    })

    db.collection('admin_data').where({
      _openid: app.globalData.openid
    }).get({
      success(res1){
        db.collection('admin_data').doc(res1.data[0]._id).update({
          data: {
            dirly: that.data.array
          },
          success(){
            indexpages.showtoast()
          }
          
        })
      }
    })
    
  },

})
const res = wx.getSystemInfoSync()


