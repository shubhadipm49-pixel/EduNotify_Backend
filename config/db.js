import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connection = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to database")
})

export default connection;