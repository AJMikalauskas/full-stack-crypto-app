// Mongoose Data Model Schema For Adding Coin, may use later;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema({
    id: {
        type: String
    },   
    symbol: {
        type: String
    },   
    name: {
        type: String
    },
    image: {
        type: String
    },
    market_cap: {
        type:Number
    },
    current_price: { 
        type: Number
    },
    market_cap_rank: {
        type: Number
    },
    price_change_1h: {
        type: Number
    },
    price_change_24h: {
        type: Number
    },
    price_change_7d: {
        type: Number
    },
    volume: {
        type: Number
    },
    chartData: {
        type: Array
    }
})

module.exports = mongoose.model("Coins",coinSchema);