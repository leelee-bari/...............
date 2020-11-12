const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    username:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String,   
        Address:String,
        phoneNumber:Number 
    },
    timeOrdered:{type: Date, default:Date.now}
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order