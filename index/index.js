const app = getApp()
const imgColor = require('./wx-colorfulImg.js')
console.log(imgColor)
Page({
  data: {
    // canvas配置
    imgColorCanvas: {
      w: 100,
      h: 100,
      rgb: (0,0,0)
    },
    imgSrc: 'http://img5.dadicinema.com/film/poster/2d017969ff6a47eca4f018bd576edd96.png'
  },
  onLoad: function() {
    this.getImgColor()
  },
  getImgColor() {
    let that = this
    imgColor.getImageInfo(
      'myCanvas',
      this.data.imgSrc,
      function (rgb) {
        that.setData(rgb)
      });
  },
  getSrc(e) {
    this.setData({ imgSrc: e.detail.value })
    this.getImgColor()
  }
})