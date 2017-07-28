# js操作剪切板复制粘贴

> 最近写一个js复制文本内容的功能，在网上搜了一圈，发大部分文章都是比较老旧的，有的甚至是flash复制。

截至2016年，clipboard API还在发展中，很多规范已经更新，市面上大部分文章都是比较老的API，很大一部分被抛弃。

### 使用event.clipboardData.setData()复制到剪切板

在`copy`可以使用 event.clipboardData.setData() 更改剪贴板内容。

请注意，为了防止event事件默认操作被浏览器覆盖，需要阻止默认事件：
```js
  document.addEventListener('copy'，function(e){
    e.preventDefault(); //默认行为是复制所选文本
    e.clipboardData.setData('text/plain'，'foo');
  });
```
#### 使用execCommand触发复制事件

如果需要触发复制事件(而不仅仅是通过浏览器UI处理用户复制的请求)，则必须使用document.execCommand('copy')。
```js
  document.getElementById("copyBtn").onclick = function(){
    document.execCommand('copy');
  }
```
出发事件后还需要删除当前copy事件的绑定
```js
  let copy = (e) => {
    e.preventDefault()
    e.clipboardData.setData('text/plain', url || '')
    e.clipboardData.setData('text/html', url || '')
  }
  document.addEventListener('copy', copy, false)
  document.execCommand('copy')
  document.removeEventListener('copy', copy)
```

#### 浏览器对clipboard API支持情况

+ Firefox支持`copy/cut/paste`事件(Firefox 22+)和`execCommand('copy')`用户操作(Firefox 41+)。
+ Chrome也支持`copy/cut/paste`和`execCommand('copy')`(Chrome 42+)。
+ caniuse.com声称Safari(截至9.1)不支持`execCommand('copy')`。
+ 微软的IE和Edge不支持clipboard API，可以使用微软自己的API:

```js
  window.clipboardData.setData('Text', url || '')
```

#### ------------ 2017-07-27 更新 ------------

最近发现在Safari中document.execCommand('copy')限制了必须由用户触发才有效，所以在Safari中document.execCommand('copy')一直返回false

> It looks like the copied text gets returned properly by the event, but the document.execCommand('copy') always returns false in Safari. Safari doesn't support the execCommand API as mentioned at the bottom of the [Clipboard.js documentation](https://clipboardjs.com/).

于是经过反复试错，最终决定使用兼容性最好的input.select()

#### 完整代码
```html
<input type="text" name="copyInput" id="copyInput" style="position:absolute;opacity: 0;">
```
```js
const copyUrl = (text) => {
  try {
    var input = document.getElementById('copyInput')
    input.value = text
    input.focus()
    input.select()
    if (document.execCommand('copy', false, null)) {
      alert('复制成功')
    } else {
      alert('当前浏览器不支持复制操作，请使用Ctrl+c手动复制')
    }
  } catch (e) {
    alert(`复制出错：${e}`)
  }
}
```




