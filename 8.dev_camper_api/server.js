const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const connectDB = require('./config/db')


//load env vars
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// dev logging middleware
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

//mount routers
app.use('/api/v1/bootcamps',bootcamps)

const PORT = process.env.PORT || 3500;

const server = app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );

    //handle unhandled promise rejections
    process.on('unhandledRejection',(err,promise) => {
        console.log(`error: ${err.message}`);
        //close server & exit process
        server.close(() => process.exit(1))
    })