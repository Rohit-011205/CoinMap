import mongoose from 'mongoose';

const portfolioHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    totalPortfolioValue: {
        type: Number,
        required: true,
    },
    totalInvestment: {
        type: Number,
        required: true,
    },
    totalPnL :{
        amount: { type: Number, required: true },
        percent: { type: Number, required: true },
    },
    holdingSnapshot: [{
        symbol:String,
        quantity: Number,
        buyPrice: Number,
        currentPrice: Number,
        currentValue: Number,
        investedValue: Number,
        pnl: Number,
        pnlPercent: Number, 
    }]
},
    {        timestamps: true} 
)

portfolioHistorySchema.index({ userId: 1, createdAt: -1 });

const PortfolioHistory = mongoose.model('PortfolioHistory', portfolioHistorySchema);

export default PortfolioHistory