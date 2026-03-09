const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    }, 
    description: String,
     image: {
        url: String,
        filename: String,
        // type: String,
        // default: "https://images.unsplash.com/photo-1739045193736-8d0f198e292a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1739045193736-8d0f198e292a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        // // default will check if image does not exist, null or undefined

    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"   // using review model for reference
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {     // using mongoose geojson
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
            }
        }
});

// will delete the reviews corresponding to that listing when we delete a listing
listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({ _id: {$in: listing.reviews}});
    }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;