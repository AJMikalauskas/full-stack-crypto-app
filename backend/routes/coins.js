const express = require('express');
const router = express.Router();
const coinsController = require("../controllers/coinsController");

// 1st param is the route and 2nd param is the handleLogin method
router.post('/add', coinsController.addCoinToWatchList);
      
router.post('/retrieve', coinsController.retrieveWatchList);

router.delete('/deleteCoinFromWatchlist', coinsController.removeCoinFromWatchlist);

router.post('/addToDb', coinsController.addCoinsDataToDb);

router.get('/coinsRetrieve',coinsController.retrieveCoinsDataFromDB);

router.post('/addChartInfo', coinsController.addChartToDB);

router.post('/retrieveChartInfo', coinsController.retrieveChartFromDB);

module.exports = router;