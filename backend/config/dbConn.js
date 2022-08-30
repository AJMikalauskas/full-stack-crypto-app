const mongoose = require('mongoose');
const fsPromises = require("fs").promises;
const path = require("path");

const connectDB = async () => {
    try {
        // See Docs to understand the options passed in 2nd param objec; 1st param is the connection string
        // Added all IPs to whitelist for this
        await mongoose.connect("mongodb+srv://testBackend:test123@cluster0.yogqh.mongodb.net/MockCryptoDB?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch(err) {
        console.log(err)
;    }
}

module.exports = connectDB;