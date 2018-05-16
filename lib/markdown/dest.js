var gulp = require('gulp'),
    gutil = require('gulp-util'),
    through = require('through2'),
    fileDate = require('./fileDate/'),
    exec = require('child_process').exec,
    i = 0;

module.exports = function(num) {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'))
            return cb()
        }
        i += 1;
        var fileName = file.path.split('/blog/dist/')[1];
        var date = fileDate(file);
        
        gulp.src('./blog/dist/' + fileName).pipe(gulp.dest('./blog/' + date.dateDir))
        if (i === num - 1) {
            exec('rm -rf ./blog/dist/', function(err, stdout, stderr) {
                if (err) console.log('shell error:' + stderr);
            })
        }
        cb()
    });
};
