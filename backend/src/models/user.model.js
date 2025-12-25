import mongoose from 'mongoose';

// const mongoose = require ('mongoose')
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,  // store the 6-digit code
    },
    verificationCodeExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

userSchema.pre("save", async function (){


    if (!this.isModified("password")) return ;
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed
    //    return next();
    //  next()
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema)
export default User;