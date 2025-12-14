// const express = require('express')
import express from "express"
// import { Switch } from 'react-router-dom'

// const mongoose = require ('mongoose')
import mongoose from "mongoose";
// const dotenv = require('dotenv');
import dotenv from 'dotenv'
// const authRoutes = require('./src/routes/auth.js');
// const router = require('./src/routes/auth.js');
import authRoutes from "./src/routes/auth.router.js";
// const authRoutes = require(





const app = express()

// const authRoutes = require('./routes/auth');

// app.use('/api/auth', authRoutes);


//middlewares
app.use(express.json());


dotenv.config();
//api
console.log('Mounting /api/auth routes');
// app.use('/api/auth', authRoutes);

app.use('/api/auth',authRoutes);

//test route

app.get('/', (req, res) => {
    res.json({messgae: "Welcome to CoinCollect API" })
})  


mongoose.connect(process.env.MONGODB_URI)
.then(()=>
    console.log("Connected to MongoDB") 
)
.catch((err)=>{
    console.error("Error connecting to MongoDB", err)
})








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});