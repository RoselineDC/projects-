import exp from "constants";
import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

// verify token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //  ACCESS TOKEN THRUE KEY
    const token = req.cookies["auth_token;"]
    // check if token exist
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    // verify token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        // pass user id
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch(error){
        return res.status(401).json({message: "Unauthorized"});

    }

};

export default verifyToken;
