import mongoose from 'mongoose';
import Asset from './assets.model.js';

const holdingSchema=new mongoose.Schema({
    UserID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required : true,
    },
    symbol:{
        type: String,
        required: true, 
    },
    name:{
        type: String,
        required: true,
    },
    // assetId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Asset',
    //   required: true,
    //   index: true,
    // },
    quantity:{
        type: Number,
        required: true, 
    },
    buyPrice:{
        type: Number,
        required: true, 
    },
    buyDate:{
        type: Date,
        default:Date.now,
    },
    currentPrice:{
        type: Number,
        default : 0,
    },
    createdAt:{
        type: Date, 
        default: Date.now,
    },

})

const Holding = mongoose.model('Holding', holdingSchema);

export default Holding;