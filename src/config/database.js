import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/doanna');
        console.log("connection successful")
    } catch (error) {
        console.log("connection failed: " + error)
    }
}

