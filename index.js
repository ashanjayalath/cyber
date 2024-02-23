const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 4000;
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const customerRoutes = require('./routes/customerRoutes');
const contactPersonRoutes = require('./routes/contactPersonRoutes');

const mongoDB = require('./database/connection');
const errorMessages = require('./midleware/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();

//midelware
app.use(express.json());
app.use(cors({
    origin:process.env.ORIGIN_URL || "http://localhost:3000",
    credentials:true
})); // Allow requests from localhost:3000
app.use(cookieParser());
app.use(express.json({limit:"25mb"}));
// app.use(express.urlencoded({limit:"25mb"}));


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
app.use('/api/admin',userRoute);
app.use('/api/sales',itemRoutes);
app.use('/api/customer',customerRoutes);
app.use('/api/contact_person',contactPersonRoutes);


//mongo db connection
mongoDB();


app.listen(port,()=>{
    console.log(`App Runing On Port Number : ${port}`);
})
