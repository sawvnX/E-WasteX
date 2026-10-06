import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ewastex', {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`[MongoDB] Standalone MongoDB server not active. E-WasteX backend running in Hybrid-Mock Mode.`);
  }
};

export default connectDB;
