const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");   // joi schema for validation

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;  // post-login-page redirecting user to the page where it was like edit, delete, new listing after login/signup
        //loggedin nhi hai to og url save krva lenge redirect url mai
        req.flash("error", "You must me looged in to create listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        // fer redirect url se locals mai save krva lenege to avoid originalurl getting deleted from passport
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// server side validation for listings
module.exports.validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body); // validating schema using joi
    if(error){
        let errMsg = error.details.map((el) => el.message).join(","); // printing additional details from the error
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

// server side validation for reviews
module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body); // validating schema using joi
    if(error){
        let errMsg = error.details.map((el) => el.message).join(","); // printing additional details from the error
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isreviewAuthor = async(req,res,next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};