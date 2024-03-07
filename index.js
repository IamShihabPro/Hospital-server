import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import authRoute from './routes/auth.js'

const app = express();
dotenv.config();

const port = process.env.PORT || 5000
const corsOptions = { origin: true };

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lgdhrpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
const connectDB = async() =>{
    try{
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch(err){
        console.log('MongoDB connection failed')
    }
}

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/auth', authRoute); // Mount the authRoute with the correct path


app.get('/', (req, res) => {
    res.send('Hospital Server is Running');
});

app.listen(port, () => {
    connectDB()
    console.log(`server is running on port ${port}`);
});
