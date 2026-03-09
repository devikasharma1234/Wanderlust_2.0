const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    // password and username passportLocalMongooose automatically define krdega
});

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", userSchema);


