const express = require("express");
const router = express.Router({mergeParams: true});  // parent route ke ander id use ho rhi thi use access krne ke liye
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");
const  reviewController  = require("../controllers/reviews.js");

// POST Route
router.post("/", 
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",
    isLoggedIn,
    isreviewAuthor, 
    wrapAsync(reviewController.deleteReview));

module.exports = router;