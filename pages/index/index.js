//index.js

import wxRequest from '../../utils/request_main'
import api from '../../utils/request'
import Dialog from "../../miniprogram_npm/vant-weapp/dialog/dialog"

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    radio: '1', // 复选框默认属性
    username: 'wangkuan', // 表单内容
    show: false, // 是否显示弹出框
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
          hasUserInfo: true,
          show: false
        })
      }
      // 还是会一闪而过
      /**
       *@desc 原因：getUserInfo回来之前先触发了true
       *@author wangkuan
       *@date 2018/12/4
       */
      if (!this.hasUserInfo) {
        this.setData({
          show: true
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
    // if (!app.globalData.isAuth) {
    //   this.setData({
    //     show: true
    //   })
    // }
  },
  onShow: function() {

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
  clinckDialog: function() {
    Dialog.confirm({
      title: '标题',
      message: '弹个窗~'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  // 有赞UI列表点击事件
  click: function() {
    console.log('click')
  },
  // 有赞UI复选框改变事件
  onChange: function(event) {
    this.setData({
      radio: event.detail,
    })
  },
  // input改变事件
  onInput: function(event) {
    this.setData({
      username: event.detail,
    })
  },
  // 强制授权，牛皮哄哄
  getInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.getUserInfo(e)
      // 异步关闭弹窗
      setTimeout(() => {
        this.setData({
          show: false
        })
      }, 1000)
    } else {
      this.setData({
        show: true
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e, 'e')
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.getData()
    } else {
      this.setData({
        show: true
      })
    }
  }
})
