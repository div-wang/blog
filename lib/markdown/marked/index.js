var gutil = require('gulp-util'),
	through = require('through2'),
    marked = require('marked'),
    mkHtml = require('./html.js');

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

module.exports = function (num) {
    return through.obj(function(file, enc, cb) {
        var that = this;

        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'))
            return cb()
        }


        // markdown转换成html
        marked(file.contents.toString(), function(err, data) {
            file.contents = new Buffer(data);
            file.path = gutil.replaceExtension(file.path, '.html');
        });

        file.contents = mkHtml(file, num)

        that.push(file)
        cb()

    });
};


