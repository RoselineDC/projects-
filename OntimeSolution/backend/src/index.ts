import express, {Request, Response} from 'express';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/Users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';


// connect to mongodb
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// create express app	
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// access frontend in the backend 
app.use(express.static(path.join(__dirname, "../../frontend/dist")))

// check user router
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// start the Express server
app.listen(8000, () => {
    console.log("Server is running on port: 8000");
});
