import express from "express"
import { getMarketCoins } from "../controllers/market.controller.js"

const router = express.Router()

router.get("/top",getMarketCoins)

export default router