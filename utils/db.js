import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URL = process.env.DB_URL;

async function connectDB(){
    try{
        await mongoose.connect(DB_URL);
        console.log("Connected to the database successfully");
    }catch(error){
        console.error("Error connecting to the database:", error);
    }
}

export default connectDB;
