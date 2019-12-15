//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false // loading
  },

  //事件处理函数
  swiperchange: function(e) {
    //console.log(e.detail.current)
  },

  onLoad: function() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    //sliderList
    app.wxRequest('GET', "http://huanqiuxiaozhen.com/wemall/slider/list", {}, (res) => {
      // 请求成功回调
      console.log(res.data)
      that.setData({
        images: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    })

    //venuesList
    app.wxRequest('GET', 'http://huanqiuxiaozhen.com/wemall/venues/venuesList', {}, (res) => {
      // 请求成功回调
      console.log(res.data)
      that.setData({
        loadingHidden: true
      })
    }, (err) => {
      console.log(err.errMsg)
    })

    //choiceList
    app.wxRequest('GET', 'http://huanqiuxiaozhen.com/wemall/goods/choiceList', {}, (res) => {
      // 请求成功回调
      console.log(res)
      that.setData({
        choiceItems: res.data.data.dataList
      })
      setTimeout(function() {
        that.setData({
          loadingHidden: true
        })
      }, 1500)
    }, (err) => {
      console.log(err.errMsg)
    })


    // 车市
    app.wxRequest('GET', 'https://api.weixin.qq.com/sns/jscode2session', {}, (res) => {
      // 请求成功回调
      console.log(res)
      that.setData({
        loadingHidden: true
      })
    }, (err) => {
      console.log(err.errMsg)
    })

  }
})