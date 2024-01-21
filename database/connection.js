require('dotenv').config();
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URL;

const mongoDB = async()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log('MongoDB Connection Start');
    } catch (error) {
        console.log(`Cannot connect Mongo DB database ${error}`);
    }
}

module.exports = mongoDB;