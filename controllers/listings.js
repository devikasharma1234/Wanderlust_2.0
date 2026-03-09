// backend functionality code
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
};   

module.exports.renderNewForm = (req, res) =>{   // new route ko show route ke upar rkhna pdega kyunki db upar vale show route id se access ho rha tha to router.js new ko bhi ek id smjh rha hai or vo mil nhi rhi to isiliye ye SHOW ke upar rkhna pdega
    res.render("listings/new.ejs");
}

module.exports.showListings = async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");  // populate used when we want data along with that req.
    if(!listing){  // listing does not exist
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async(req, res, next) =>{
        let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send()
  

        let url = req.file.path;
        let filename = req.file.filename;

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;    // associating owner with the listing
        newListing.image = {url, filename};

        newListing.geometry = response.body.features[0].geometry;

        let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "New Listing Created");
        res.redirect("/listings");
};

module.exports.renderEditForm = async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);

    if(!listing){  // listing does not exist
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async(req, res) =>{
    let {id} = req.params;

    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});  // deconstructing req.body.listing object to individual parameters

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req, res) =>{
    let {id} = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success", "Listing Deleted");
   res.redirect("/listings");
};