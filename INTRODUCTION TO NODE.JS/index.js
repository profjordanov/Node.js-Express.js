setTimeout(function () {
  console.log('First')
}, 0)

console.log('Second')

const fs = require('fs')

fs.readFile('index.js','utf8', function (err, data) {
   if(err){
     console.log(err)
     return
  }
  console.log(data)
})
console.log('Finished')

const testModule = require('./test-module')

console.log(testModule.result)

