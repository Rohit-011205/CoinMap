import express from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res,next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.UserID = decoded.id
        return next();

    }
    catch (error) {
        // res.status(401).json({
        //     // // console.error(error)
        //     // success: false,
        //     // message: error.message

            
        // })
         console.error('JWT error:', error.message);
         console.log("TOKEN:", token)
console.log("DECODED:", decoded)

    return res.status(401).json({ success: false, message: error.message });
    }
}

export default authMiddleware;