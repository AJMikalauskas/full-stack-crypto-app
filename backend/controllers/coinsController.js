const User = require("../model/User");
const Coin = require("../model/Coin");

const addCoinToWatchList = async(req,res) => {
    // We can't really assume anything even if the user is already auth for now.
        // For now, i'll just let there not be that much secondary checking such
            // as optional chaining and not sending that many 400 requests as
                // I wouldn't understand how a user would see the table of cryptos 
                    // info without being authenticated but I'll see...
                        // Authenticating Routes?
    const { email, coinData } = req.body;


    // 1. Find user or document of user
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    // 2. Add coin name from request.body to the watchlist array
    const duplicateCoinCheck = foundUser.watchList.filter(coin => coin.name === coinData.name);
    //console.log(duplicateCoinCheck);
    if(duplicateCoinCheck.length >= 1) return res.sendStatus(401);
    
    foundUser.watchList.push(coinData);
    const result = await foundUser.save();
    console.log(result);
    //3. Updates user info with spread operator --> return response
    res.json({ watchList: foundUser.watchList })
}

const removeCoinFromWatchlist = async(req,res) => {
    const { email, name } = req.body;
    console.log(email);
    console.log(name);
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized
  //  const duplicateCoinCheck = foundUser.watchList.find(coin => coin.name === name);
    const duplicateCoinCheck = foundUser.watchList.findIndex(coin => coin.name === name);
    console.log("duplicate coin check", duplicateCoinCheck);
   // if(duplicateCoinCheck.length <= 0) return res.sendStatus(401); // not unauthorized, but what status code?
    
    //const updatedUserWatchlist = foundUser.watchList.filter(coin => coin.name != duplicateCoinCheck.name);
    foundUser.watchList.splice(duplicateCoinCheck, 1);
    console.log("new watchlist",foundUser.watchList);
   //foundUser = { ...foundUser, watchList: updatedUserWatchlist};
    const result = await foundUser.save();
    console.log("result", result);
    //3. Updates user info with spread operator --> return response
    res.json({ watchList: foundUser.watchList })
}

const retrieveWatchList = async(req,res) => {
    const { email } = req.body;

    // I will eventually change this foundUser logic to be based on jwt.verify 
        // the refreshToken and maybe compare to the one in the database.
    const foundUser = await User.findOne({ email }).exec();
    if(!foundUser) return res.sendStatus(401); // unauthorized

    res.json({watchList: foundUser.watchList});
}

const addCoinsDataToDb = async(req,res) => {
   // req.body.map((coin) => {
    try {
        // Creates new document in specified collection in the Coin.js Model
        const result = await Coin.create({
            id: req.body.id,
            symbol: req.body.symbol,
            name: req.body.name,
            image: req.body.image,
            market_cap: req.body.market_cap,
            current_price: req.body.current_price,
            market_cap_rank: req.body.market_cap_rank,
            price_change_1h: req.body.price_change_percentage_1h_in_currency,
            price_change_24h: req.body.price_change_percentage_24h_in_currency,
            price_change_7d: req.body.price_change_percentage_7d_in_currency,
            volume: req.body.total_volume
        });

        res.status(201).json(result);
    } catch(err) {
        console.log(err);
    }
//})
}

const retrieveCoinsDataFromDB = async(req,res) => {
    //const { email } = req.body;

    // I will eventually change this foundUser logic to be based on jwt.verify 
        // the refreshToken and maybe compare to the one in the database.
    const coins = await Coin.find().exec();
    if(!coins) return res.sendStatus(401); // unauthorized

    res.json({coins});
}

const addChartToDB = async(req,res) => {
    const {chartData, coin} = req.body;
   // console.log(chartData);
  //  console.log(coin);
    console.log(req.body);
    const foundCoin = await Coin.findOne({ id: coin }).exec();
    console.log(foundCoin);
    if (!foundCoin) return res.sendStatus(401);

    foundCoin.chartData = chartData;
    const result = await foundCoin.save();
    console.log(result);

    res.json({ chartData: foundCoin.chartData});
}

const retrieveChartFromDB = async(req,res) => {
    const { coinName } = req.body;
    const foundCoin = await Coin.findOne({ id: coinName }).exec();
    console.log(foundCoin);

    res.json({ chartData: foundCoin.chartData });
}

module.exports = { addCoinToWatchList, retrieveWatchList, addCoinsDataToDb, retrieveCoinsDataFromDB, 
    removeCoinFromWatchlist, addChartToDB, retrieveChartFromDB };
