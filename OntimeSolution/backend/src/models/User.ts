// handle user authentication

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type usertType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    };

    // user schema
    const userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    });

    // brypt password before saving
    userSchema.pre("save", async function (next) {
        // const user = this;
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 8);
        }
        next();
    });

    // user model
    const User = mongoose.model<usertType> ("User", userSchema);

    export default User;