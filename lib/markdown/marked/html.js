var gulp = require('gulp'),
	swig = require('gulp-swig'),
	fs = require('fs'),
    path = require('path'),
    fileDate = require('../fileDate'),
    feedData = [],
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
    var linkUri = '/' + date.dateDir + link
    var listHtml = `<div class="member"><a class="member-name" target="_blank" href="${linkUri}">${title}{% include \'../icons/link.html\' %}</a><div class="member-skills"><span class="dateStr">${date.dateStr}</span>${summary}</div></div>\n`
    
	// 生成文章头尾内容
    var htmlString = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
            <meta name="keywords" keywords="${title.replace(' ', ',')}">
            <meta name="description" content="${summary.replace(/<[^>]+>/g, "")}">
            <title>${title}</title>
            <link rel="icon" type="image/x-icon" href="//div-1255800596.cos.ap-beijing.myqcloud.com/logo.png">
            {% include "../static/blog-css.html" %} 
            {% include '../static/gtag.html' %}
        </head>
        <body>
            {% include "../common/head.html" %}
            <article class="markdown-body">
                ${content}
            </article>
            {% include "../common/weixin.html" %}
            {% include "../common/foot.html" %}
        </body>
    </html>`
    feedData.push({
        title,
        summary,
        link: linkUri,
        author: 'Div',
        pubDate: date.dateStr
    })
    // console.log(listHtml)
	list.push({
        html: listHtml,
        date: date.careatTime
    });

    // 当最后一个文件处理完，生成首页
    if (list.length === num - 1) {
        // 排序并生成首页模版
        fs.writeFile('src/html/common/list.html', listSort(list), 'utf8', function(err) {
            if (err) throw err;
        });
        const art = require('art-template')
        const content = art(path.resolve(__dirname, '../../../src/rss/index.art'), {
            title: 'Div-wang的博客',
            host: 'https://blog.div-wang.com',
            date: new Date(),
            ttl: 600,
            item: feedData
        })
        fs.writeFile("blog/feed.xml", content, (err) => {
            if (err) throw err;
            console.log('生成xml成功')
        })
        // 处理首页数据
        gulp.src('./src/html/*.html')
        .pipe(swig())
        .pipe(gulp.dest('./blog/'))
    }

    return new Buffer(htmlString)
}
