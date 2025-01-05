import express, {Request, Response} from 'express';
import "dotenv/config";
import cors from 'cors';
import mongoose from 'mongoose';


// connect to mongodb
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string );


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// get routes
app.get("/api/test", async (req: Request, res: Response) => {
    res.json({message: "Hello from express eendpoint"});
});


// start the Express server
app.listen(7000, () => {
    console.log("Server is running on port: 7000");
});
