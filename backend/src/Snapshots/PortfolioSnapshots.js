import nodeCron from "node-cron";
import PortfolioHistory from "../models/PortfolioHistory.js";
import User from "../models/user.model.js";
import Holding from "../models/holding.model.js";
import { getMarketdata, globalMarketCache, globalCacheTime } from "../services/Priceservice.js";
import { calculatePortfolioMetrics } from "../services/Portfoliocalculator.js";




let snapshotJob;


export const HistorySnapshot = () => {
  if (snapshotJob) return;
  snapshotJob = nodeCron.schedule('0 * * * *', async () => {
    console.log("Starting Snapshot....", new Date().toISOString());

    const maxretry = 5;
    // let lastnullerr = null;

    for (let attempt = 1; attempt <= maxretry; attempt++) {
      // let marketData = null;

      try {
        console.log(`  Snapshot attempt ${attempt}/${maxretry}`);

        const allHolding = await Holding.find();
        if (allHolding.length === 0) {
          return
        }

        const uniquesymbol = [...new Set(allHolding.map(h => h.symbol.toUpperCase()))]



        // Get all users
        const allUsers = await User.find().select('_id');

        if (!allUsers || allUsers.length === 0) {
          console.log('  No users found');
          return;
        }

        console.log(` Processing ${allUsers.length} users...`);

        let marketData = {};
          try {
            marketData = await getMarketdata(uniquesymbol);
          } catch (err) {
            console.error(`❌ Failed to get market data:`, err.message);
            if (attempt < maxretry) {
              console.log(`⏳ Waiting 2min before attempt ${attempt + 1}...`);
              await new Promise((resolve) =>
                setTimeout(resolve, 2 * 60 * 1000)
              );
              continue;
            }
            throw err;
          }

        if (Object.keys(marketData).length === 0) {
          console.warn(` Empty market data on attempt ${attempt}/${maxretry}`);
          if (attempt < maxretry) {
            console.log(` Waiting 1min before attempt ${attempt + 1}...`);
            await new Promise(resolve => setTimeout(resolve, 60 * 1000));
          }
          continue; // Skip to next attempt
        }


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
        return;
      }
      
      catch (error) {
        console.error('[SNAPSHOT JOB] Fatal error:', error);
        continue
      }
    }
  },
    {
      timezone: 'Asia/Kolkata',
    }
  );

  console.log('Portfolio snapshot job started (every hour)');
};


// STEP 1: Fix Infinite Retry Loop
// Deploy this first - minimal changes, maximum impact

// import nodeCron from "node-cron";
// import PortfolioHistory from "../models/PortfoliohHstory.js";
// import User from "../models/user.model.js";
// import Holding from "../models/holding.model.js";
// import { getMarketdata, globalMarketCache, globalCacheTime } from "../services/Priceservice.js";

// let snapshotJob;

// export const HistorySnapshot = () => {
//   if (snapshotJob) return;
//   snapshotJob = nodeCron.schedule('0 * * * *', async () => {
//     console.log("Starting Snapshot....", new Date().toISOString());

//     const maxretry = 5;
//     let success = false; // ✅ ADD THIS FLAG

//     for (let attempt = 1; attempt <= maxretry; attempt++) {
//       try {
//         console.log(`📸 Snapshot attempt ${attempt}/${maxretry}`);

//         const allHolding = await Holding.find();
//         if (allHolding.length === 0) {
//           console.log('No holdings found');
//           success = true; // ✅ Mark as successful (nothing to do)
//           break; // ✅ EXIT LOOP
//         }

//         const uniquesymbol = [...new Set(allHolding.map(h => h.symbol.toUpperCase()))];

//         // Get all users
//         const allUsers = await User.find().select('_id');

//         if (!allUsers || allUsers.length === 0) {
//           console.log('No users found');
//           success = true; // ✅ Mark as successful
//           break; // ✅ EXIT LOOP
//         }

//         console.log(`Processing ${allUsers.length} users...`);

//         let marketData = await getMarketdata(uniquesymbol);

//         if (Object.keys(marketData).length === 0) {
//           console.warn(`Empty market data on attempt ${attempt}/${maxretry}`);
//           if (attempt < maxretry) {
//             console.log(`Waiting 1min before attempt ${attempt + 1}...`);
//             await new Promise(resolve => setTimeout(resolve, 60 * 1000));
//           }
//           continue; // Skip to next attempt
//         }

//         globalMarketCache = marketData;
//         globalCacheTime = Date.now();
//         console.log('🌍 Cron updated global market cache');

//         // For each user, create a snapshot
//         for (const user of allUsers) {
//           try {
//             const holdings = await Holding.find({ UserID: user._id });

//             // Skip users with no holdings
//             if (!holdings || holdings.length === 0) {
//               continue;
//             }

//             let totalPortfolioValue = 0;
//             let totalInvestment = 0;

//             // Build holdings snapshot
//             const holdingSnapshot = holdings.map((holding) => {
//               const symbol = holding.symbol.toUpperCase();
//               const marketInfo = marketData[symbol];
//               const currentPrice =
//                 marketInfo?.currentPrice != null
//                   ? marketInfo.currentPrice
//                   : holding.currentPrice;

//               const currentValue = holding.quantity * currentPrice;
//               const investedValue = holding.quantity * holding.buyPrice;
//               const pnl = currentValue - investedValue;
//               const pnlPercent = investedValue
//                 ? (pnl / investedValue) * 100
//                 : 0;

//               totalPortfolioValue += currentValue;
//               totalInvestment += investedValue;

//               return {
//                 symbol: holding.symbol,
//                 quantity: holding.quantity,
//                 buyPrice: holding.buyPrice,
//                 currentPrice: Number(currentPrice.toFixed(3)),
//                 currentValue: Number(currentValue.toFixed(3)),
//                 investedValue: Number(investedValue.toFixed(3)),
//                 pnl: Number(pnl.toFixed(3)),
//                 pnlPercent: Number(pnlPercent.toFixed(3)),
//               };
//             });

//             const totalPnL = totalPortfolioValue - totalInvestment;
//             const totalPnLPercent = totalInvestment
//               ? (totalPnL / totalInvestment) * 100
//               : 0;

//             // Save snapshot
//             await PortfolioHistory.create({
//               userId: user._id,
//               totalPortfolioValue: Number(totalPortfolioValue.toFixed(3)),
//               totalInvestment: Number(totalInvestment.toFixed(3)),
//               totalPnL: {
//                 amount: Number(totalPnL.toFixed(3)),
//                 percent: Number(totalPnLPercent.toFixed(3)),
//               },
//               holdingSnapshot,
//             });

//             console.log(`Snapshot for user ${user._id.toString().slice(-6)}`);
//           } catch (userError) {
//             console.error(`Error for user ${user._id}:`, userError.message);
//             continue;
//           }
//         }

//         console.log('[SNAPSHOT JOB] Completed!');
//         success = true; // ✅ Mark successful after completing all users
//         break; // ✅ EXIT RETRY LOOP
//       } catch (error) {
//         console.error('[SNAPSHOT JOB] Fatal error:', error.message);
//         if (attempt === maxretry) {
//           console.error(`All ${maxretry} retries failed. Last error:`, error.message);
//         }
//         continue; // Try next attempt
//       }
//     }

//     // ✅ NEW: Log final status
//     if (!success) {
//       console.error('[SNAPSHOT JOB] FAILED - All retries exhausted');
//     }
//   },
//     {
//       timezone: 'Asia/Kolkata',
//     }
//   );

//   console.log('Portfolio snapshot job started (every hour)');
// };
