require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('✅ Connected to MongoDB successfully')
    } catch (error) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit process if connection fails
    }
}

module.exports = connectDB; 