# 微信短链接打开支付宝领红包

> 今天朋友在微信给我发来一个短连接 [http://t.cn/RHu4yXj](http://t.cn/RHu4yXj)，在微信打开之后，直接跳转到支付宝领红包页面，感觉非常新奇，决定研究下源码。


## 首先解析短链接

[http://t.cn/RHu4yXj](http://t.cn/RHu4yXj) ==> [https://ie34.com/wx_zfb.html](https://ie34.com/wx_zfb.html)

## 取出源码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="https://i.alipayobjects.com/common/favicon/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="https://i.alipayobjects.com/common/favicon/favicon.ico" type="image/x-icon">
    <title>正在打开支付宝，请稍候……</title>
</head>
<body>
<script type="text/javascript">
  var url1 = "https://qr.alipay.com/c1x09214odvs9va2cyg7vd2";
  var url2 = "https://qr.alipay.com/c1x09214odvs9va2cyg7vd2";
  function is_weixin() {
      if (/MicroMessenger/i.test(navigator.userAgent)) {
          return true
      } else {
          return false
      }
  }

  function is_android() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/(Android|SymbianOS)/i)) {
          return true
      } else {
          return false
      }
  }

  function is_ios() {
      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
          return true
      } else {
          return false
      }
  }

  function android_auto_jump() {
      WeixinJSBridge.invoke("jumpToInstallUrl", {}, function (e) {});
      window.close();
      WeixinJSBridge.call("closeWindow")
  }

  function ios_auto_jump() {
      if (url1 != "") {
          location.href = url1
      } else {
          window.close();
          WeixinJSBridge.call("closeWindow")
      }
  }

  function onAutoinit() {
      if (is_android()) {
          android_auto_jump();
          return false
      }
      if (is_ios()) {
          ios_auto_jump();
          return false
      }
  }
  if (is_weixin()) {
      if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
              document.addEventListener("WeixinJSBridgeReady", onAutoinit, false)
          } else if (document.attachEvent) {
              document.attachEvent("WeixinJSBridgeReady", onAutoinit);
              document.attachEvent("onWeixinJSBridgeReady", onAutoinit)
          }
      } else {
          onAutoinit()
      }
  } else {
      if (url2 != "") {
          location.href = url2
      } else {
          window.close()
      }
  }
</script>
</body>
</html>
```

## 分析一下代码

实现方式首先判断了是不是微信，在微信里再判断`WeixinJSBridge`是否注册, 接着根据安卓和ios平台调用代码。如果不是微信则直接跳转 url。

从实现方式看，用`WeixinJSBridge`做了层跳板，绕过 webview，直接用 native 代码跳转url。

这里不得不说有个地方我不明白，微信和支付宝正在支付领域争的你死我活，应该是不会那么轻易通过url 跳转到支付宝的。

于是我请教了 ios 同学，他也做了实验，返现通过代码直接跳转[https://qr.alipay.com/c1x09214odvs9va2cyg7vd2](https://qr.alipay.com/c1x09214odvs9va2cyg7vd2)是可以实现直接跳转支付宝并自动领红包的。

我猜想这可能是微信的一个 bug 吧，于是我开始用淘宝客代码做实验，链接[https://wx.loukx.com/wx_tz.html](https://wx.loukx.com/wx_tz.html)，结果是失败了

## 目前的已知问题

1、目前已知只有`qr.alipay.com`可以打开，淘宝客链接无法跳转

2、ios 11.2.1无法正常跳转到支付宝

3、此代码有可能是微信 native bug，有随时被封的可能


### 另外，我准备做个小功能，上传图片自动生成短链接，会在随后发出来敬请期待吧！





