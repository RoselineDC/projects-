import express, {Request, Response} from 'express';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/Users';
import authRoutes from './routes/auth';


// connect to mongodb
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// check user router
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// start the Express server
app.listen(7000, () => {
    console.log("Server is running on port: 7000");
});
