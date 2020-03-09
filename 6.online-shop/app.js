let express = require('express')
let app = express();

app.use(express.static('public'))

app.set('view engine', 'pug')

app.listen(3000,function(){
    console.log('Server is working')
})

// app.get('/',function(req,res){
// })