const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 4000;
const userRoute = require('./routes/userRoute');

const mongoDB = require('./database/connection');
const errorMessages = require('./midleware/errorHandler');

const app = express();


//midelware
app.use(express.json());
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    });
});


//routes
app.use('/api/user',userRoute);

//mongo db connection
mongoDB();


app.listen(port,()=>{
    console.log(`App Runing On Port Number : ${port}`);
})
