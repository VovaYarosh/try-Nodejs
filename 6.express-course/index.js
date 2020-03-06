const express = require('express')
const app = express()

const products = ['Apple', 'Pen','Comp']

app.get('/',(req,res,next)=>{
    res.send('its working')
})


app.listen(5000,()=>{
    console.log('its started', new Date())
})