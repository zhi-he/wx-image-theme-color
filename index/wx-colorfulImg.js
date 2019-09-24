module.exports = {
  getImageInfo(canvasId, imgSrc, callback) {
    let that = this
    wx.getImageInfo({
      src: imgSrc,
      success(res) {
        callback({
          'imgColorCanvas.w': res.width,
          'imgColorCanvas.h': res.height
          })
        that.colorfulImg(canvasId, res, callback)
      }
    })
  },
  colorfulImg(canvasId, imgEl, callback) {
    var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {
        r: 0,
        g: 0,
        b: 0
      }, // for non-supporting envs
      context = wx.createCanvasContext(canvasId),
      i = -4,
      length,
      rgb = {
        r: 0,
        g: 0,
        b: 0
      },
      count = 0

    if (!context) {
      return defaultRGB;
    }
    let height = imgEl.height;
    let width = imgEl.width;
    context.drawImage(imgEl.path, 0, 0, width, height);
    context.draw(true, function () {
      let data = ''
      wx.canvasGetImageData({
        canvasId: canvasId,
        x: 0,
        y: 0,
        width,
        height,
        success: function (res) {
          let data = res.data
          let length = data.length;
          while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data[i];
            rgb.g += data[i + 1];
            rgb.b += data[i + 2];
          }
          // ~~ 取整
          rgb.r = ~~(rgb.r / count);
          rgb.g = ~~(rgb.g / count);
          rgb.b = ~~(rgb.b / count);
          callback({ 'imgColorCanvas.rgb': `rgb(${rgb.r},${rgb.g},${rgb.b})` })
        },
      });
    })
  }
}