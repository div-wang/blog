# js判断一个对象是否为空对象

> 最近遇到一个问题，用vue循环一个数组，展示一些海报图片。数组为空的话是不会遍历的，为了不让能够出现默认图片，这也就需要在数组中增加一个默认空对象arr[{}]。问题来了，提交的时候怎么判断这个对象是空的呢？

### 简单粗暴的判断

因为是展示海报图片，每个对象下都有url属性，所以最直接的判断当前object的url属性
```js
if (arr[0].url) {
  ...
}
```
这个方法是无法判断arr为空的情况，如果arr[0]是个null，那么浏览器回抛出`Cannot read property 'url' of undefined`的错误

### 使用es5的getOwnPropertyNames属性

getOwnPropertyNames 方法可以获取所有的元素键。它的返回值是一个数组，当数组长度为零时，说明对象为空。
```js
if (Object.getOwnPropertyNames(arr[0]))
```
这个方法和第一个方法相同，如果arr是个空数组，会抛出`Cannot convert undefined or null to object`

### jQuery的实现方法

Js判断object/json 是否为空，可以使用jQuery的isEmptyObject()方法。
jquery的实现非常简单，就是for in循环对象，默认返回true，如果可以循环则return false
代码如下：
```js
function isEmptyObject (obj) {
  for (let k in obj)
    return false
  return true
}
```
该方法可以兼容到所有异常情况，下面是例子：
```js
console.log(isEmptyObject());           //true
console.log(isEmptyObject({}));         //true
console.log(isEmptyObject(null));       //true
console.log(isEmptyObject(111));         //true
console.log(isEmptyObject({a: 1}));      //false
```

### 过滤原型继承属性的方法
上面也是最简单的实现，其实我们实际生产中还面对很多问题，不如对象从别处继承的对象过滤。
代码如下：
```js
function isOwnEmpty (obj) {
  for (let k in obj) {
    if(obj.hasOwnProperty(key)) return false
  }
  return true
};
```