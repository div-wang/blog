var gulp = require('gulp'),
    sass = require('gulp-sass'),
    less = require('gulp-sass'),
    swig = require('gulp-swig'),
    through = require('through2'),
    markdown = require('./markdown'),
    dest = require('./markdown/dest.js'),
    fs = require('fs'),
    path = require('path');


function css() {
    gulp.src('./src/static/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./blog/static/css'))
}

function js() {
    gulp.src('./src/static/js/*.js')
        .pipe(gulp.dest('./blog/static/js'))
}

function img() {
    gulp.src('./src/static/img/**')
        .pipe(gulp.dest('./blog/static/img'))
}

function md() {
    fs.readdir('./src/html/blog/', function(err, files) {
        gulp.src('./src/html/blog/*.md')
            .pipe(markdown(files.length))
            .pipe(swig())
            .pipe(gulp.dest('./blog/dist/'))
            .pipe(dest(files.length))
            // .pipe(through.obj(function(file, enc, cb) {
            //     var fileName = file.path.split('/blog/')[1]
            //     gulp.src('./blog/'+fileName).pipe(gulp.dest('./blog/'+file.date))
            //     cb()
            // }))
    })
}

function watch() {
    gulp.watch('./src/html/blog/*.md', md);
    gulp.watch('./src/static/js/*.js', js);
    gulp.watch('./src/static/scss/*.scss', css);
}

module.exports = function() {
    css()
    js()
    img()
    md()
    watch()
};
