import mongoose from "mongoose";

export const connectDB = async () => {
    console.log('🔍 Database Connection Debug:')
    console.log('MONGO_URI from process.env:', process.env.MONGO_URI)
    console.log('MONGO_URI type:', typeof process.env.MONGO_URI)
    console.log('---')
    
    if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI is undefined! Check your .env file')
        process.exit(1)
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`❌ Error connecting to db: ${err.message}`);
        process.exit(1)
    }
}