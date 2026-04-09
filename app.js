if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");   // helps creating layouts (templates) in a website which are same in all pages like navbas, footers etc.
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const {MongoStore} = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const paymentController = require("./controllers/paymentController.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL

main().then(() =>{    // calling mongoose
    console.log("connected to db");
}).catch(err =>{
    console.log(err);
})
async function main(){  // creating database
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  // to parse the data coming inside req
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);   // using ejs mate for making templates
app.use(express.static(path.join(__dirname, "/public")));  // for using static files (public folder/ style.css)


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,         // interval (in seconds) after session updates
});

store.on("error", (err) =>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,  // in milliseconds
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,               // for preventing crossscripting attacks 
    },
};

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || 
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({
//     mongoUrl: dbUrl,
//     crypto: {
//       secret: process.env.SESSION_SECRET || "mysecretcode",
//     },
//     touchAfter: 24 * 3600, // seconds
//   }),
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };


// app.get("/", (req, res) =>{
//     res.send("Hi, i am root");
// });

// using sessions and flash
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Middleware to set local variables for EJS
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    
    // This line tells EJS that 'currUser' is whoever is logged in (req.user)
    // If no one is logged in, it will be 'undefined' or 'null', which is fine!
    res.locals.currUser = req.user; 
    res.locals.razorpayKey = process.env.RZP_API_KEY;
    
    next();
});

// app.get("/demouser", async(req,res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student",
//     });

//     let registeredUser = await User.register(fakeUser, "hello");
//     res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.post("/create-order", paymentController.createOrder);
app.get("/success", paymentController.renderSuccess);


// server side validation (error handling)
// Catch-all errors for unmatched routes
app.use((req, res, next) =>{ 
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message= "something went wrong"} = err;  // deconstructing statuscode and message from the error
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {message});
});

app.listen(8080, () =>{
    console.log("server is listening to port 8080");
});