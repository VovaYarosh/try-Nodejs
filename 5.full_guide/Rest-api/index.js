const express = require('express')
const path = require('path')
//підключаєм роути до головного файлу
const todoRoutes = require('./routes/todo')
const app = express()
const PORT = process.env.port || 3000

//при підключенні роутів префікс повинен бути api тому що всы запити відсилаються по адресі api 
app.use('/api/todo', todoRoutes)

//використовуєм модуль path щоб вказати шлях до статичної папки паблік
app.use(express.static(path.join(__dirname, "public")))

//даний мідлвер буде завжди іти перед запуском сервера
//потрібно на кожний запит повертати один файл для цього викликається метод res.sendFile
app.use((req,res,next)=>{
    res.sendFile('/index.html')
})

app.listen(PORT)