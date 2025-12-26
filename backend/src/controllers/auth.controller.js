import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import TempUser from '../models/tempnew.user.model.js';
// import authMiddleware from '../middlewares/user.middleware.js';
import { generateCode, sendVerficationemail } from '../config/email.js';

const generateToken = (UserID) => {
    return jwt.sign(
        { id: UserID },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"

            })
        }

        // Here will be existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this e-mail"
            })

        }

        await TempUser.deleteOne({ email });

        const verificationCode = generateCode();

        // here will be creating new user
        const tempUser = new TempUser({
            username, email, password,
            verificationCode,
            verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000)
        });



        await tempUser.save();




        try {

            const code = generateCode();
            await sendVerficationemail(email, verificationCode, username)

            return res.status(201).json({ success: true, message: 'User created, verification email sent' });
        } catch (emailError) {
            console.error('Email send error FULL:', emailError);
            return res.status(500).json({
                success: false,
                message: "User created but verification email failed to send"
            });
        }

        // return res.status(201).json({
        //     success:true,
        //     message:"User created successfully. Check your email for verification code.",
        //     user:{
        //         id:newUser._id,
        //         email: newUser.email,
        //     }
        // })

        // here will be generating token for new user
        // const token = generateToken(newUser._id);

        return res.status(200).json({
            success: true,
            message: "Verification code sent to your email"
        });

    }
    catch (error) {
        console.error(error)
        res.status(500).json({

            success: false,
            message: error.message


        })
    }
}
// login :-----------

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }

        // if (!User.isVerified) {
        //     const code = generateCode();
        //     User.verificationCode = code;
        //     User.verificationCodeExpires = Date.now() + 10 * 60 * 1000;
        //     await User.save();

        //     await sendVerficationemail(User.email, code, User.username);

        //     return res.status(403).json({
        //         success: false,
        //         message: "Verification email sent. Please verify your email."
        //     });
        // }

        if (!existingUser.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in."
            });
        }


        const passwordvalidation = await bcrypt.compare(password, existingUser.password);
        if (!passwordvalidation) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = generateToken(existingUser._id);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            }
        })

    }
    catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message

        console.error('JWT verify error:', error.message);
        res.status(500).json({
            success: false,
            message: error.message || "Login failed"
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.UserID)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        })

    } catch (error) {
        console.log('req.userId from token:', req.userId);
        console.log('all users:', await User.find().select('_id email'));

        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body

        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: "Email and verification code are required"
            })
        }
        const tempUser = await TempUser.findOne({ email });
        if (!tempUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // if (tempUser.isVerified) {
        //     return res.json({
        //         success: true,
        //         message: "Email already verified. You can now log in."
        //     });
        // }

        if (tempUser.verificationCode !== code) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code"
            });
        }

        if (new Date() > tempUser.verificationCodeExpires) {
            return res.status(400).json({
                success: false,
                message: "Verification code has expired. Please request a new one."
            });
        }

        // user.isVerified = true;
        // user.verificationCode = undefined;
        // user.verificationCodeExpires = undefined
        // await user.save()
        // const hashedPassword = await bcrypt.hash(tempUser.password, 10)

        const newUser = new User({
            username: tempUser.username,
            email: tempUser.email,
            password: tempUser.password,
            isVerified: true,
        });

        await newUser.save()

        await TempUser.deleteOne({ email: tempUser.email });

        const token = generateToken(newUser._id)




        return res.json({
            success: true,
            message: "Email verified successfully! You can now log in.",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });


    } catch (error) {
        console.error('Email verification error:', error);
        res.status(400).json({
            success: false,
            message: "Email verification failed"
        });

    }
}



