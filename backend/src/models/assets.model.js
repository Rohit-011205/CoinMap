import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
    symbol:{
        type: String,
        required: true,
        unique: true,
        upperCase: true,
        index:true,
    },
    name:{
        type: String,
        required: true,

    },
        currentPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    marketCap: {
      type: Number,
      default: 0,
    },
    change24h: {
      type: Number,
      default: 0,
    },
    volume: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '', 
    },

}, { timestamps: true })

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
