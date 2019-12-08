const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

let db = require('./db');
let artistsController = require('./controllers/artists');


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',(req,res)=>{
   res.send("hello api")
});

app.get('/artists',artistsController.all);

app.get('/artists/:id',artistsController.findById);


app.post('/artists',artistsController.create);

app.put('/artists/:id',artistsController.update);

app.delete('/artists/:id',artistsController.delete);



db.connect('mongodb://localhost:27017/myapis',(err)=>{
    if(err){
        return console.log(err)
    }
    app.listen(3000,()=>{
    console.log('server is working')
});
})