const mongoose = require("mongoose")
const passportlocalmongoose = require("passport-local-mongoose")

const customerschema = new mongoose.Schema({
    username:String,
    profilePicture:String,
    Address:String,
    phoneNumber:Number,
    email:String,
    password:String
})

customerschema.plugin(passportlocalmongoose)

const User = mongoose.model("User", customerschema)

module.exports = User
