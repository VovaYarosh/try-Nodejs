const express = require('express')
const path = require('path')
const csrf = require('csurf')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const MONGODB_URI = `mongodb+srv://VovaYarosh:qwerty1234@cluster0-9chaf.mongodb.net/shop`
const app = express()

const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
})
const store = new  MongoStore({
    collection: "session",
    uri: MONGODB_URI

})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/courses',coursesRoutes)
app.use('/card',cardRoutes)
app.use('/orders',ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try{
        await mongoose.connect(MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        // const candidate = await User.findOne()
        // if(!candidate){
        //     const user = new User({
        //         email:'vova@df.net',
        //         name:'Vova',
        //         cart:{items: []}
        //     })

        //     await user.save()
        // }

        app.listen(PORT,()=>{ 
            console.log(`server is running on port ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }
    
}

start()



