import express from "express";
import authMiddleware from '../middlewares/user.middleware.js';
import { addHolding,updateHolding,deleteHolding,getHolding,PortfolioSummary } from "../controllers/holding.controller.js";
import PortfolioHistory from "../models/PortfoliohHstory.js";
import { exportexcel } from "../controllers/export.controller.js";



const router = express.Router();
router.use(authMiddleware);

router.get('/history',authMiddleware,async(req,res) =>{
    try {
    const userId = req.UserID;
    const { range = '1D' } = req.query;

    let days = 1;
    if (range === '7D') days = 7;
    if (range === '1M') days = 30;
    if (range === '1Y') days = 365;

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    console.log(`Fetching history for user ${userId} from last ${days} days`);

    const snapshots = await PortfolioHistory.find({
      userId,
      createdAt: { $gte: dateFrom },
    })
      .sort({ createdAt: 1 })
      .lean();

    if (!snapshots || snapshots.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: `No history found for range ${range}`,
      });
    }

    console.log(`Found ${snapshots.length} snapshots`);

    const data = snapshots.map((s) => {
      let timeLabel = '';

      if (range === '1D') {
        timeLabel = s.createdAt.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      } else if (range === '7D') {
        timeLabel = s.createdAt.toLocaleDateString('en-US', {
          weekday: 'short',
        });
      } else {
        timeLabel = s.createdAt.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
        });
      }

      return {
  timestamp: s.createdAt,
  value: s.totalPortfolioValue,
  pnl: s.totalPnL?.amount || 0,
  pnlPercent: s.totalPnL?.percent || 0,
};
    });

    res.json({
      success: true,
      data,
      count: data.length,
      range,
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})


router.post('/holdings/add', addHolding);
router.put('/holdings/update/:holdingId', updateHolding);
router.delete('/holdings/:holdingId', deleteHolding);
router.get('/holdings', getHolding);
router.get('/summary',PortfolioSummary);

router.get('/export/excel',  exportexcel);

export default router;
  