// ------ Initialization Logic -------

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust2";

main().then(() =>{    // calling mongoose
    console.log("connected to db");
}).catch(err =>{
    console.log(err);
})

async function main(){  // creating database
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
    await Listing.deleteMany({}); // clearing already existing data
    initData.data = initData.data.map((obj) =>   // will create new array with owner
        ({...obj, owner: "6999d6e002d44d06809d437e"}));
    await Listing.insertMany(initData.data);   // accesing data key inside initData -> data.js -> sampleListing object
    console.log("data was initialized");
};
initDB();






