const path = require('path')

//absolute way
console.log(__filename)

//relative way
console.log(path.basename(__filename))


console.log(path.dirname(__filename))

//file extension
console.log(path.extname(__filename))

//object with data
console.log(path.parse(__filename))

//generate new way
console.log(path.join(__dirname,'test','second.html'))


console.log(path.resolve(__dirname,'test', 'second.html'))