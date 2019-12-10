const express = require('express');
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');

const path = require('path');
const link = require('./config');
const todoRoutes = require('./routes/todos');



const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');
app.set('views','views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))

app.use(todoRoutes);

const PORT = process.env.PORT || 3000;

async function start(){
    try{
      await mongoose.connect(link.ip,{
          useNewUrlParser: true,
          useFindAndModify: false
      });
        app.listen(PORT,()=>{
            console.log('sever has been started');
        });
    }catch (e) {
        console.log(e)
    }
}

start()


