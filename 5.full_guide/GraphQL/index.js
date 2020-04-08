const express = require('express')
const path = require('path')
const graphqlHTTP = require('express-graphql')
const sequelize = require('./utils/database')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')
const app = express()
const PORT = process.env.port || 3000

//використовуєм модуль path щоб вказати шлях до статичної папки паблік
app.use(express.static(path.join(__dirname, "public")))
//щоб привести буфер до обєкту в пост запиті використовуєм мідлвер
app.use(express.json())

app.use(graphqlHTTP({
    schema:schema,
    rootValue:resolver,
    graphiql: true
}))
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

