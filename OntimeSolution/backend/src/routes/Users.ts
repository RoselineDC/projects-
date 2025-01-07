// handle user registration

import express, {Request, Response} from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// /api/users/register
router.post("/register", [
    // validate first name 
    check("firstName", "First Name is required").isString(),
    // validate last name
    check("lastName", "Last Name is required").isString(),
    // validate email
    check("email", "Email is required").isEmail(),
    // validate password
    check("password", "Password with 6 or more characters  required").isLength({min: 6}),
], async (req: Request, res: Response) => {  
    // get errors picked up by validator 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }
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
            process.env.JWT_SECRET_KEY as string,
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
        return res.status(200).send({
            message: "User registered successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Something Went Wrong"});
        
    }
})

export default router;