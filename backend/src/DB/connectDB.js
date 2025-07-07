const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log('database connected successfully',connection.connection.host);
        
    } catch (error) {
        console.log("error connecting database ",error);
        process.exit(1);
    }
}

module.exports = connectDB;