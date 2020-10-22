var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var getData = function (op){

    // 设置根目录
    op.root = path.normalize(__dirname+'/..')+op.root;

    // 设置静态访问根目录
    app.use(express.static(op.root));

    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods","POST,GET");
        res.header("Content-Type", "application/json;charset=utf-8");
        var data = getOutput(op, req, res);
        res.end(data);
    });

    // 监听端口
    app.listen(op.port);
    console.log('listen to 127.0.0.1:'+op.port); 
}

// 处理ajax请求
var getOutput = function (op, req, res){

    var data = '',
        path = req.path.replace(/(^\/*)/g, ''),
        param = req.query||req.body;

    return data;
}

module.exports = getData;
