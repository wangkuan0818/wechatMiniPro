//index.js

import wxRequest from '../../utils/request_main'
import api from '../../utils/request'

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    // 使用第三方封装
    // wxRequest.get('https://api.it120.cc/common/mobile-segment/location?mobile=17512044201')
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getData()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getData: function() {
    // 普通封装
    wx.showLoading({
      title: '请求中，请耐心等待..'
    })
    api._get('/common/mobile-segment/location', {
      mobile: 17512044201,
    }).then(res => {
      console.log(res.data)
      wx.hideLoading()
      let {
        province,
        cityName,
        segmentName,
        postCode
      } = res.data
      this.setData({
        motto : `${province}-${cityName}-${segmentName}-${postCode}`
      })
    }).catch(e => {
      wx.hideLoading()
      console.log(e)
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.getData()
  }
})
