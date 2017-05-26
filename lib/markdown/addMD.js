var exec = require('child_process').exec,
    fs = require('fs'),
    argvs = process.argv.splice(2)

if(!argvs || argvs.length === 0) {
  console.log('\x1b[31m新增文章错误：请输入文件名\x1b[0m')
  return
}

argvs.forEach(function (name) {

  exec(`cd './src/html/blog' && touch ${name}.md`)

  fs.readFile(__dirname + '/fileDate/list.js', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
      if(err) throw err
      var data = JSON.parse(data.split('=')[1]) || {}
      var date = new Date().getTime()
      data[name] = date
      fs.writeFile(__dirname + '/fileDate/list.js', `module.exports = ${JSON.stringify(data)}`, function(e){
          if(e) throw e
      })
  })

})


