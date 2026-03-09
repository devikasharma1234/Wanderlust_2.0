const express = require("express");
const router = express.Router();   // requiring router object
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateListing, isOwner} = require("../middleware.js");

const ListingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// making restful api's for listings

// INDEX Route
// router.get("/",  wrapAsync(ListingController.index));

router    // same routes
    .route("/")
    .get(wrapAsync(ListingController.index))  // show(index) route
    .post(   // CREATE Route
    isLoggedIn,
    upload.single("listing[image]"),   // multer processing the image and converting to url(req.file)
    validateListing,
    wrapAsync(ListingController.createListing)
    );


// NEW Route   
router.get("/new", isLoggedIn, ListingController.renderNewForm);


// SHOW Route
router.get("/:id", wrapAsync(ListingController.showListings));


// EDIT Route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner, 
    wrapAsync(ListingController.renderEditForm));

// UPDATE Route
router.put("/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateListing));

// DELETE Route
router.delete("/:id", 
    isLoggedIn, 
    isOwner,
    wrapAsync(ListingController.deleteListing));

module.exports = router;