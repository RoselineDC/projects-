// handle user login
import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';


const router = express.Router();

// route
router.post("/login", [
    // validate email ND PASSWORD
    check("email", "Email is required").isEmail(),
    check("password", "Password with more than 6 characters is required").isLength({
        min: 6
    }),
], async (req: Request, res: Response) => {
    //  record errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    // pass requets
    const { email, password } = req.body;
    // check if user exists
    try {
        // catch user
        const user = await User.findOne({ email })
        // check if user is not there 
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // check if password is match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // match create access token
        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, 
            {
                expiresIn: "1d"
            }
        );
        // create cookie for token
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //true for production false for development
            maxAge: 86400000,
        })
       
        res.status(200).json({ userId: user.id });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something Went Wrong" });

    }

});
// validate token and send status ok
router.get("/validate-token", verifyToken, (req: Request, res: Response)=> {
    res.status(200).send({ userId: req.userId });
})
// handle logout
router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });	
    res.status(200).json({ message: "Logout successful" });
});

export default router;
