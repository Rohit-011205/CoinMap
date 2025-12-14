import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import authMiddleware from '../middlewares/user.middleware.js';

const generateToken = (UserID) => {
    return jwt.sign(
        { id:UserID },
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

        // here will be creating new user
        const newUser = new User({
            username,
            email,
            password
        })
        await newUser.save();

        // here will be generating token for new user
        const token = generateToken(newUser._id);

        res.status(201).json({
            success: true,
            message: "New user cretaed Successfully",
            token,
            User: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        })
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
  return res.status(401).json({
    success: false,
    message: "Invalidd token"
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

