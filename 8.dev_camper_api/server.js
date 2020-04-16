const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error')

const connectDB = require('./config/db')


//load env vars
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//body parser
app.use(express.json())

// dev logging middleware
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

//mount routers
app.use('/api/v1/bootcamps',bootcamps)

app.use(errorHandler)

const PORT = process.env.PORT || 3500;

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
    );

    //handle unhandled promise rejections
    process.on('unhandledRejection',(err,promise) => {
        console.log(`error: ${err.message}`.red);
        //close server & exit process
        server.close(() => process.exit(1))
    })