const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
//підключаєм роути до головного файлу
const todoRoutes = require('./routes/todo')
const app = express()
const PORT = process.env.port || 3000

//використовуєм модуль path щоб вказати шлях до статичної папки паблік
app.use(express.static(path.join(__dirname, "public")))
//щоб привести буфер до обєкту в пост запиті використовуєм мідлвер
app.use(express.json())
//при підключенні роутів префікс повинен бути api тому що всi запити відсилаються по адресі api 
app.use('/api/todo', todoRoutes)

//даний мідлвер буде завжди іти перед запуском сервера
//потрібно на кожний запит повертати один файл для цього викликається метод res.sendFile
app.use((req,res,next)=>{
    res.sendFile('/index.html')
})


//запуск бази і сервера
//параметр {force:true} дозволяє видаляти таблиці з бази,видаливши з коду
//такий параметр краще забирати піся першого дроптейбла
async function start(){
    try{
        await sequelize.sync()
        app.listen(PORT)
    }catch(e){
        console.log(e)
    }
}

start()

