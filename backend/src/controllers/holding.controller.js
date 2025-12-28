import Holding from "../models/holding.model.js";
import { getMarketdata } from "../services/Priceservice.js";
import Asset from "../models/assets.model.js";
import { calculatePortfolioMetrics } from "../services/Portfoliocalculator.js";

export const getHolding = async (req, res) => {
    try {
        const holding = await Holding.find({ UserID: req.UserID }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: holding,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,

        })
    }
}

export const addHolding = async (req, res) => {
    try {
        const UserID = req.UserID;
        const { symbol, name, quantity, buyPrice, buyDate, currentPrice } = req.body;
        if (!symbol || !name || !quantity || !buyPrice) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: symbol, name, quantity, buyPrice",

            })
        }


        const addHolding = new Holding({
            UserID: req.UserID,
            symbol: symbol.toUpperCase(),
            name,
            quantity: parseFloat(quantity),
            buyPrice: parseFloat(buyPrice),
            buyDate: buyDate || Date.now(),
            currentPrice: currentPrice || buyPrice,
        })

        await addHolding.save();
        res.status(200).json({
            success: true,
            message: "Holding added successfully",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

export const updateHolding = async (req, res) => {
    try {
        const { holdingId } = req.params;

        const holding = await Holding.findById(holdingId);
        if (!holding) {
            return res.status(404).json({
                success: false,
                message: "Holding not found",
            })

        }
        if (holding.UserID.toString() !== req.UserID) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized User",
            })
        }

        const { quantity, buyPrice, buyDate, currentPrice } = req.body;

        if (quantity) holding.quantity = parseFloat(req.body.quantity);
        if (buyPrice) holding.buyPrice = parseFloat(req.body.buyPrice);
        if (buyDate) holding.buyDate = req.body.buyDate;
        if (currentPrice !== undefined)
            holding.currentPrice = parseFloat(currentPrice);


        await holding.save();

        res.status(200).json({
            success: true,
            message: "Holding updated successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteHolding = async (req, res) => {
    try {
        const { holdingId } = req.params;

        const holding = await Holding.findById(holdingId);
        if (!holding) {
            return res.status(404).json({
                success: false,
                message: "Holding not found",
            })
        }
        if (holding.UserID.toString() !== req.UserID) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized User",
            })
        }

        await Holding.findByIdAndDelete(holdingId);

        res.status(200).json({
            success: true,
            message: "Holding deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const PortfolioSummary = async (req, res) => {
    try {
        const holdings = await Holding.find({ UserID: req.UserID })

        if (holdings.length === 0) {
            return res.status(200).json({
                success: true,
                totalPortfolioValue: 0,
                totalInvestment: 0,
                change24h: { amount: 0, percent: 0 },
                totalPnL: { amount: 0, percent: 0 },
                bestPerformer: null,
                worstPerformer: null,
                holdingsCount: 0,
                holdings: [],

            })
        }

        const symbols = [...new Set(holdings.map(h => h.symbol.toUpperCase()))];

        console.log("SYMBOLS:", symbols);
        console.log("TYPE:", typeof symbols[0]);


        const marketData = await getMarketdata(symbols);

        let totalPortfolioValue = 0;
        let totalInvestment = 0;
        // let total24hChange = 0;

        const holdingsPnL = holdings.map((holding) => {
            const marketInfo = marketData[holding.symbol];

            // const currentPrice = marketInfo?.currentPrice != null ? marketInfo.currentPrice : holding.currentPrice;
            if (!marketInfo) {
                console.warn(`No market data for ${holding.symbol} - using stored price`);
            }
            // const currentPrice = holding.currentPrice;
            const currentPrice =
                marketInfo && typeof marketInfo.currentPrice === "number"
                    ? marketInfo.currentPrice
                    : holding.currentPrice;

            // const Change24hPercent = market?.PriceChangePercentage24h || 0;



            const currentValue = holding.quantity * currentPrice;
            const investedValue = holding.quantity * holding.buyPrice;
            const pnl = currentValue - investedValue;
            const pnlPercent = investedValue ? (pnl / investedValue) * 100 : 0;
            totalPortfolioValue += currentValue;
            totalInvestment += investedValue;

            return {
                _id: holding._id,
                symbol: holding.symbol,
                name: holding.name,
                quantity: holding.quantity,
                buyPrice: holding.buyPrice,
                currentPrice: Number(currentPrice.toFixed(3)),

                high24h: marketInfo?.high24h || null,
                low24h: marketInfo?.low24h || null,
                priceChange24h: marketInfo?.priceChange24h || 0,
                priceChangePercentage24h: marketInfo?.priceChangePercentage24h ?? 0,

                currentValue: Number(currentValue.toFixed(3)),
                investedValue: Number(investedValue.toFixed(3)),
                pnl: Number(pnl.toFixed(3)),
                pnlPercent: Number(pnlPercent.toFixed(3)),

                image: marketInfo?.image || null,
            };

        })

        // const currentPrice = marketInfo.currentPrice ?? holding.currentPrice;

        // const totalInvestment = holdingsPnL.reduce((sum, h) => sum + h.investedValue, 0);
        const totalPnL = totalPortfolioValue - totalInvestment;
        const totalPnLPercent = totalInvestment ? (totalPnL / totalInvestment) * 100 : 0;

        let total24hChange = 0;
        let total24hChangePercent = 0;


        holdingsPnL.forEach((h) => {
            const market = marketData[h.symbol];
            if(!market) return;
            const weight = totalPortfolioValue > 0 ? h.currentValue / totalPortfolioValue : 0;

            const priceChange24h = market?.priceChange24h || 0;
            total24hChange += weight * priceChange24h;

            total24hChangePercent += weight * ((market?.priceChangePercentage24h) || 0);

        })

        const change24hPercent = total24hChangePercent;
        const change24hAmount = (change24hPercent / 100) * totalPortfolioValue || 0;






        const bestPerformer = holdingsPnL.length > 0 ? holdingsPnL.reduce((max, h) => h.pnlPercent > max.pnlPercent ? h : max) : null;

        const worstPerformer = holdingsPnL.length > 0 ? holdingsPnL.reduce((min, h) => h.pnlPercent < min.pnlPercent ? h : min) : null;


        // const Change24h = totalPortfoliovalue * 0.0237; // Mock I have to change it later with real data  
        // const Change24hPercent = 2.37;

        return res.json({
            success: true,
            totalPortfoliovalue: parseFloat(totalPortfolioValue.toFixed(3)),
            totalInvestment: parseFloat(totalInvestment.toFixed(3)),

            Change24h: { amount: change24hAmount, percent: change24hPercent },

            totalPnL: { amount: totalPnL, percent: totalPnLPercent },

            bestPerformer: bestPerformer ? {
                _id: bestPerformer._id,
                symbol: bestPerformer.symbol,
                name: bestPerformer.name,
                pnlPercent: bestPerformer.pnlPercent,
                pnl: bestPerformer.pnl,
                currentPrice: bestPerformer.currentPrice,
            } : null,

            worstPerformer: worstPerformer ? {
                _id: worstPerformer._id,
                symbol: worstPerformer.symbol,
                name: worstPerformer.name,
                pnlPercent: worstPerformer.pnlPercent,
                pnl: worstPerformer.pnl,
                currentPrice: worstPerformer.currentPrice,
            } : null,

            holdingsCount: holdings.length,
            holdings: holdingsPnL,
        });


    }
    // try {

    //     const holdings = await Holding.find({ UserID: req.UserID })

    //     const metrics = await calculatePortfolioMetrics(holdings)

    //     return res.json({
    //         success: true,
    //         totalPortfoliovalue: metrics.totalPortfolioValue,
    //         totalInvestment: metrics.totalInvestment,
    //         Change24h: {
    //             amount: metrics.change24hAmount,
    //             percent: metrics.change24hPercent,
    //         },
    //         totalPnL: {
    //             amount: metrics.totalPnL,
    //             percent: metrics.totalPnLPercent,
    //         },
    //         bestPerformer: metrics.bestPerformer,
    //         worstPerformer: metrics.worstPerformer,
    //         holdingsCount: holdings.length,
    //         holdings: metrics.holdingsPnL,
    //     });


    // }
    catch (error) {
        console.error("Portfolio Summary Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

