//  pushing data.js to mongo atlas
require("dotenv").config();   // load env variables


const mongoose = require("mongoose");
const Listing = require("./models/listing"); 
const sampleListings = require("./init/data"); 

mongoose.connect(process.env.ATLASDB_URL)
  .then(async () => {
    await Listing.deleteMany({}); //clear old data
    await Listing.insertMany(sampleListings);
    console.log("Database seeded!");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
