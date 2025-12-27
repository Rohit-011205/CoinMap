import nodeCron from "node-cron";
import PortfolioHistory from "../models/PortfoliohHstory.js";
import User from "../models/user.model.js";
import Holding from "../models/holding.model.js";
import { getMarketdata } from "../services/Priceservice.js";
import { calculatePortfolioMetrics } from "../services/Portfoliocalculator.js";




let snapshotJob;


export const HistorySnapshot = () => {
  if (snapshotJob) return;
  snapshotJob = nodeCron.schedule('0 * * * *', async () => {
    console.log("Starting Snapshot....", new Date().toISOString());
    try {
      //get all holding

      const allHolding = await Holding.find();
      if (allHolding.length === 0) {
        return
      }

      const uniquesymbol = [...new Set(allHolding.map(h => h.symbol.toUpperCase()))]



      // Get all users
      const allUsers = await User.find().select('_id');

      if (!allUsers || allUsers.length === 0) {
        console.log('⚠️  No users found');
        return;
      }

      console.log(`👥 Processing ${allUsers.length} users...`);

      const marketData = await getMarketdata(uniquesymbol);


      globalMarketCache = marketData;
      globalCacheTime = Date.now();
      console.log('🌍 Cron updated global market cache');

      // if (error.response?.status === 429) {
      //   console.warn("Rate limited! Serving stale data.");
      //   return marketdatacache; // Return the old data so the UI doesn't break
      // }

      // For each user, create a snapshot
      for (const user of allUsers) {
        try {
          const holdings = await Holding.find({ UserID: user._id });

          // Skip users with no holdings
          if (!holdings || holdings.length === 0) {
            continue;
          }

          // Get market data
          // const symbols = holdings.map((h) => h.symbol.toUpperCase());


          let totalPortfolioValue = 0;
          let totalInvestment = 0;

          // Build holdings snapshot
          const holdingSnapshot = holdings.map((holding) => {
            const symbol = holding.symbol.toUpperCase();
            const marketInfo = marketData[symbol];
            const currentPrice =
              marketInfo?.currentPrice != null
                ? marketInfo.currentPrice
                : holding.currentPrice;

            const currentValue = holding.quantity * currentPrice;
            const investedValue = holding.quantity * holding.buyPrice;
            const pnl = currentValue - investedValue;
            const pnlPercent = investedValue
              ? (pnl / investedValue) * 100
              : 0;

            totalPortfolioValue += currentValue;
            totalInvestment += investedValue;

            return {
              symbol: holding.symbol,
              quantity: holding.quantity,
              buyPrice: holding.buyPrice,
              currentPrice: Number(currentPrice.toFixed(3)),
              currentValue: Number(currentValue.toFixed(3)),
              investedValue: Number(investedValue.toFixed(3)),
              pnl: Number(pnl.toFixed(3)),
              pnlPercent: Number(pnlPercent.toFixed(3)),
            };
          });

          const totalPnL = totalPortfolioValue - totalInvestment;
          const totalPnLPercent = totalInvestment
            ? (totalPnL / totalInvestment) * 100
            : 0;

          // Save snapshot
          await PortfolioHistory.create({
            userId: user._id,
            totalPortfolioValue: Number(totalPortfolioValue.toFixed(3)),
            totalInvestment: Number(totalInvestment.toFixed(3)),
            totalPnL: {
              amount: Number(totalPnL.toFixed(3)),
              percent: Number(totalPnLPercent.toFixed(3)),
            },
            holdingSnapshot,
          });

          console.log(`Snapshot for user ${user._id.toString().slice(-6)}`);
        } catch (userError) {
          console.error(`Error for user ${user._id}:`, userError.message);
          continue;
        }
      }

      console.log('[SNAPSHOT JOB] Completed!');
    } catch (error) {
      console.error('[SNAPSHOT JOB] Fatal error:', error);
    }
  },
    {
      timezone: 'Asia/Kolkata',
    }
  );

  console.log('Portfolio snapshot job started (every hour)');
};
