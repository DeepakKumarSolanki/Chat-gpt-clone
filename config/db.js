const mongoose = require('mongoose')
const colors =require('colors')

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connected to mongodb successfully ${mongoose.connection.host}` .bgGreen.white);
    } catch (error) {
       console.log(`${error} error connecting to mongodb`.bgRed.white) ;
    }
}

module.exports = connectDB;