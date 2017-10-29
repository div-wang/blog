# 使用element-ui的upload组件上传到七牛云

> 最近基于element-ui开发管理平台，老的上传组件基于plupload官方推荐的，有点过于重了。自己写了一个基于element-ui的上传组件。


## 后端获取token实现

[获取上传token的文档](https://developer.qiniu.com/kodo/manual/1208/upload-token)
最下面有[Demo-nodejs](https://github.com/qiniu/nodejs-sdk.v6/blob/master/qiniu/rs.js?ref=developer.qiniu.com)

填入ak,sk,以及bucketName(就是开始创建的对象存储空间的名字)，修改demo的key重新运行即可。

![qiniu](/static/img/element-upload-component-to-qiniu.png)

还有个具体点的代码实现：[Smallpath的小站](https://smallpath.me/post/element-upload-qiniu#后端)

## 前端代码实现
#### QiniuUp控件
```html
<template>
  <el-upload
    :action="qiniuUpUrl"
    :accept="accept"
    :before-upload="QiniuGetKey"
    :on-success="QiniuUpSuccess"
    :file-list="fileList"
    :data="QiniuForm">
    <el-button size="small" type="primary">选择文件</el-button>
    <div slot="tip" class="el-upload__tip" v-if="upTip">{{upTip}}</div>
  </el-upload>
</template>

<script>
  import request from 'utils/request'

  export default {
    data () {
      return {
        QiniuForm: {},
        // 判断http和https
        qiniuUpUrl: window.location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com'
      }
    },
    props: {
      // 上传组件所对应的form字段名
      formField: {
        type: String
      },
      // 上传组件的提示信息
      upTip: {
        type: String
      },
      // 限制上传文件的类型
      accept: {
        type: String
      },
      // 上传成功后的回调函数
      callback: {
        type: Function
      },
      // 限制文件大小
      maximum: {
        type: String
      }
    },
    methods: {
      getMaximum () {
        let num = this.maximum
        let k = 1024
        let m = k * k
        let g = k * k * k
        if (!num) return g * g
        let G = num.indexOf('G') > -1 || num.indexOf('g') > -1
        let M = num.indexOf('M') > -1 || num.indexOf('m') > -1
        let K = num.indexOf('K') > -1 || num.indexOf('k') > -1
        let size = G ? G * g : M ? M * m : K * k
        return size
      },
      QiniuGetKey (file) {
        if (!this.callback) {
          this.$message.error('QiniuUp ERROR : 没有可用于接收上传文件的参数')
          return
        }
        if (file.size > this.getMaximum()) {
          this.$message.error(`QiniuUp ERROR : 文件大小不能超过${this.maximum}`)
          return
        }
        // 获取七牛上传uptoken
        return request.get({
          url: `${BASE_URL}/getQiniuUpToken?userToken=${USER_TOKEN}`
        }).then((res) => {
          this.QiniuForm = {
            token: res.data.uptoken
          }
        })
      },
      QiniuUpSuccess (res, file, fileList) {
        this.callback && this.callback(res, file, fileList, this.formField)
      }
    }
  }
</script>
```
## 回调实现
七牛返回的[响应报文](https://developer.qiniu.com/kodo/api/1312/upload#3)
```js
  /**
   * [upFileCallback 七牛上传文件的回调函数]
   * @param  {object} res      [七牛返回的响应报文]
   * @param  {object} file     [当前上传的文件]
   * @param  {array} fileList [当前上传的文件列表]
   * @param  {string} Field    [七牛上传组件传递的formField字段]
   */
  upFileCallback (res, file, fileList, Field) {
    // 获取七牛回传的文件key
    let url = `${encodeURI(res.key)}`
    // 获取七牛回传文件的type
    let type = file.raw.type.split('/')[0].toLowerCase()
  }
```

