import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    verificationCode: String,
    verificationCodeExpires: Date,

     createdAt: {
        type: Date,
        default: Date.now,
        expires: 600  // ✅ Auto-delete after 10 minutes
    }
})


export default mongoose.model('TempUser', tempUserSchema);