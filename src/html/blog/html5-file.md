# HTML5 file对象和blob对象的互相转换

> 最近在做一个裁剪图片的需求，基于vue和elementui，裁剪完图片遇到一个坑，elementui的upload组件接受一个promise，要求promise resolve一个File对象才可以使用新文件上传，而canvas是转成了blob对象，我google查了好久，没有发现有blob对象转File的文章，所以今天来写一个吧！


## 使用FileReader 对象转换：File => DataURL
该对象用于读取文件（读取单个对象文件，所以，不能直接读取 Filelist 对象文件集合），即把文件内容读入内存。它接收 File 对象或 Blob 对象，作为参数。

##### 生成该对象的构造函数方法如下：
```javascript
  var reader = new FileReader(); // 参数为 Blob 对象或 File 对象
```

##### 对于不同类型的文件，FileReader 使用不同的方法读取。方法如下：
* readAsBinaryString(Blob|File)：返回二进制字符串，该字符串每个字节包含一个 0 到 255 之间的整数。
* readAsText(Blob|File, opt_encoding) ：返回文本字符串。默认情况下，文本编码格式是'UTF-8'，可以通过可选的格式参数，指定其他编码格式的文本。
* readAsDataURL(Blob|File)：返回一个基于 Base64 编码的 data-uri 对象。
* readAsArrayBuffer(Blob|File) ：返回一个 ArrayBuffer（数组缓存）对象。
* abort()：该方法用于中止文件上传。

##### 下面是获取上传对象的文本内容的方法：
```javascript
    var reader = new FileReader();
    reader.onload = function(e){
        // target.result 该属性表示目标对象的DataURL
        console.log(e.target.result);
    }
    // 传入一个参数对象即可得到基于该参数对象的文本内容
    reader.rederAsDataURL(file);
```

## 利用canvas剪切图片
[CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage) 是 Canvas 2D API 中的方法，它提供了多种方式来在Canvas上绘制图像，我们使用drawImage方法节剪切图片。
##### 先从canvas获取剪切过的图片DataURL
```javascript
    // 获取canvas
    let ctx = this.$refs.canvas.getContext('2d')
    // 获取图片dom元素
    let image = this.$refs.image
    // 裁剪图片200 * 200图片
    ctx.drawImage(image, x, y, w, h, 0, 0, 200, 200)
    // canvas生成剪切过的图片DataURL
    this.cutAvater = this.$refs.canvas.toDataURL()
```
具体的裁剪方法我下篇文章会写
##### 将dataurl转换为Blob对象
```javascript
    let arr = this.cutAvater.split(',')
    let data = window.atob(arr[1])
    let mime = arr[0].match(/:(.*?);/)[1]
    let ia = new Uint8Array(data.length)
    for (var i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i)
    }
    this.blob = new Blob([ia], {type: mime})
```


## 利用File Api讲blob转成File对象
其实我google找了一圈只有 File => Blob，没人写怎么用Blob => File
最终我在[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)中找到了[File()构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/File/File)
```javascript
    let files = new window.File([this.blob], file.name, {type: file.type})
```
File()构造函数的前两个参数为必传

## 参考：
[Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)

[File.File()](https://developer.mozilla.org/zh-CN/docs/Web/API/File/File)

[CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

[文件和二进制数据的操作](http://javascript.ruanyifeng.com/htmlapi/file.html)


