var list = require('./list.js')

module.exports = function(file) {
    var name = file.path.split('/')[file.path.split('/').length-1].split('.')[0]
    var time = list[name] || false

    var re2 = function (n) { return (n > 9 ? n : '0' + n) }
    var careatDate = new Date(time)
    var year = careatDate.getFullYear() + ''
    var month = (careatDate.getMonth() + 1) + ''
    var day = careatDate.getDate() + ''
    var dateStr = year + '-' + re2(month) + '-' + re2(day)
    var dateDir = year + '/' + re2(month) + '/'

    return {
        careatTime: time,
        dateStr: dateStr,
        dateDir: dateDir
    };
}