
import express, {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("./register", async (req: Request, res: Response) => {  
    try{
        // check if user or email exists
        let user = await User.findOne({
            email: req. body.email,
        });
        if (user) {
            return res.status(400).json({message: "User already exists"});
        }
        // create new user
        user = new User(req.body);
        await user.save();
        // create token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KAY as string,
            {
                expiresIn: "1d",
            }
        );

        //  add coockie to response
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //true for production false for development
            maxAge: 86400000,
        })
        res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Something Went Wrong"});
        
    }
})
