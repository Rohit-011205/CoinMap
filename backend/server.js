  // const express = require('express')
  import express from "express"
  // import { Switch } from 'react-router-dom'

  // const mongoose = require ('mongoose')
  import mongoose from "mongoose";
  // const dotenv = require('dotenv');
  import dotenv from 'dotenv'
  import cors from "cors"
  // const authRoutes = require('./src/routes/auth.js');
  // const router = require('./src/routes/auth.js');
  import authRoutes from "./src/routes/auth.router.js";
  // const authRoutes = require(
  import holdingroutes from "./src/routes/holdings.router.js";
  import { HistorySnapshot } from "./src/Snapshots/PortfolioSnapshots.js";
  import marketRoutes from "./src/routes/market.router.js"
  import { getMarketCoins } from "./src/controllers/market.controller.js";


  dotenv.config();

  const app = express()

  console.log("EMAIL CONFIG:", {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? "LOADED" : "MISSING",
  });

  // const authRoutes = require('./routes/auth');

  // app.use('/api/auth', authRoutes);


  //middlewares

  

  app.use(express.json());
  app.use(cors({
    origin: [
      "http://localhost:5173",                
      "https://coinmap-portfolio.vercel.app/" 
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));


  //api
  console.log('Mounting /api/auth routes');
  // app.use('/api/auth', authRoutes);

  app.use('/api/auth',authRoutes);
  app.use('/api/portfolio',holdingroutes);
  app.use('/api/market', marketRoutes)

  //test route

  app.get('/', (req, res) => {
      res.json({messgae: "Welcome to CoinCollect API" })
  })  


  mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
      console.log("Connected to MongoDB") 
    HistorySnapshot();}
  )
  .catch((err)=>{
      console.error("Error connecting to MongoDB", err)
  })








  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    HistorySnapshot();
  });