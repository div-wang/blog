# 使用element-ui的upload组件上传到七牛云

> 最近基于element-ui开发管理平台，老的上传组件基于plupload官方推荐的，有点过于重了。自己写了一个基于element-ui的上传组件。


## 后端获取token实现

[获取上传token的文档](https://developer.qiniu.com/kodo/manual/1208/upload-token)
最下面有[Demo-nodejs](https://github.com/qiniu/nodejs-sdk.v6/blob/master/qiniu/rs.js?ref=developer.qiniu.com)

填入ak,sk,以及bucketName(就是开始创建的对象存储空间的名字)，修改demo的key重新运行即可。

![qiniu](/static/img/element-upload-component-to-qiniu.png)

还有个具体点的代码实现：[Smallpath的小站](https://smallpath.me/post/element-upload-qiniu#后端)
