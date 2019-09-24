# wx-image-theme-color

小程序获取图片的主题色

## 原理

将图片绘制到canvas上，获取canvas上所有像素点相加取平均值

## 使用方法

wxml：创建一个canavs标签

```
<canvas canvas-id="myCanvas" style="width: {{imgColorCanvas.w}}px; height: {{imgColorCanvas.h}}px;"></canvas>
```

wxss：隐藏canvas标签

```
canvas{
  opacity: 0;
  position: absolute;
  z-index: -1;
}
```

js：引入colorfulImg.js

```
const imgColor = require('./colorfulImg.js')
```

`data`初始配置如下：

```
imgColorCanvas: {
  w: 100,
  h: 100,
  rgb: (0,0,0)
}
```

获取主题色使用方法

```
getImgColor() {
    let that = this
    imgColor.getImageInfo(
      'myCanvas',
      this.data.imgSrc,
      function (rgb) {
        that.setData(rgb)
      });
  },
```
> 注：wx-colorfullImg.js中有getImageInfo和CanvasContext.drawImage方法 <br>
>  CanvasContext.drawImage：所要绘制的图片资源（网络图片要通过 getImageInfo / downloadFile 先下载） <br>
> getImageInfo：获取图片信息。网络图片需先配置download域名才能生效
