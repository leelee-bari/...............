const mongoose = require("mongoose")


const foodvendorSchema = new mongoose.Schema({
    name:String,
    profilePicture:{
        type:Buffer
    },
    imagesOfFoodtoDisplay:{
       type:Buffer
    },
    caption1:String,
    imagesOfFoodtoDisplay:{
       type:Buffer
    },
    caption2:String,
    imagesOfFoodtoDisplay:{
       type:Buffer
    },
    caption3:String,
    imagesOfFoodtoDisplay:{
       type:Buffer
    },
    caption4:String,
    descriptionOfTheFood:String,
    AddressofVendor:String,
    price:Number,
    vendorName:{
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username:String,
    },
    order:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    comments:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"comment"
        }
    ],
    foodType:{
        id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"foodtype"
        },
        type:String
    }

})



const FoodVendor = mongoose.model("FoodVendor", foodvendorSchema)

module.exports = FoodVendor