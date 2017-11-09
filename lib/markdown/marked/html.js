var gulp = require('gulp'),
	swig = require('gulp-swig'),
	fs = require('fs'),
    path = require('path'),
    fileDate = require('../fileDate'),
	list = [];

var sortNumber = function (a, b) {
    return a.date - b.date
}

var listSort = function (arr) {
    var sortArr = arr.sort(sortNumber)
    var html = ''
    for (var i = sortArr.length - 1; i >= 0; i--) {
        html += sortArr[i].html
    }
    return html
}

module.exports = function(file, num){
	// 获取时间
	var date = fileDate(file)
	// 获取转换后的html
	var content = file.contents.toString()

	// 生成文章列表
	var title = content.split('</h1>')[0].split('>')[1]
	var summary = content.split('</blockquote>')[0].split('</p>')[0].split('<p>')[1]
	var link = path.basename(file.path).replace(/md/, 'html')
	var listHtml = '<div class="member"><a class="member-name" target="_blank" href="/' + date.dateDir + link + '">' + title + '{% include \'../icons/link.html\' %}</a><div class="member-skills"><span class="dateStr">' + date.dateStr + '</span>' + summary + '</div></div>\n'

	// 生成文章头尾内容
	var head = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"><link rel="icon" type="image/x-icon" href="//div-wang.com/favicon.png">{% include "../static/blog-css.html" %} <title>' + title + '</title></head><body>{% include "../common/head.html" %}<article class="markdown-body">'
	var foot = '</article>{% include "../common/weixin.html" %}{% include "../common/foot.html" %}</body></html>'


	list.push({
        html: listHtml,
        date: date.careatTime
    });

	// 当最后一个文件处理完，生成首页
    if (list.length == num) {
        // 排序并生成首页模版
        fs.writeFile('src/html/common/list.html', listSort(list), 'utf8', function(err) {
            if (err) throw err;
        });
        // 处理首页数据
        gulp.src('./src/html/*.html')
        .pipe(swig())
        .pipe(gulp.dest('./blog/'))
    }

    return new Buffer(head + content + foot)
}
