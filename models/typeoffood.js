var mongoose = require("mongoose")

const foodtypeSchema = new mongoose.Schema({
    type:String
})

const foodtype = mongoose.model("foodtype", foodtypeSchema)

module.exports = foodtype
