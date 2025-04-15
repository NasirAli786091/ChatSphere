import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({
    path : "../.env"
})

export const connectDB = async() => {
    try {
        await mongoose.connect((process.env.DB_URI).replace("<db_password>", process.env.DATABASE_PASSWORD));
        console.log("connected to database");
    } catch (error) {
        console.log("error occured at db.js");
        console.log(error);
    }
}