import express, {Request, Response} from 'express';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/Users';


// connect to mongodb
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string );


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// check user
app.use("/api/user", userRoutes);


// start the Express server
app.listen(7000, () => {
    console.log("Server is running on port: 7000");
});
