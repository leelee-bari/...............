const express = require("express")
const app = express()
const path = require("path")
const crypto = require("crypto")
const mongoose = require("mongoose")
const multer = require("multer")
const fs = require("fs")
const bodyParser = require("body-parser")
const mongodb = require("mongodb")
const passport = require("passport")
const expresssession = require("express-session")
const localStrategy = require("passport-local")
const methodOverride = require("method-override")
const FoodVendor = require("./models/vendors")
const Orders = require("./models/orders")
const User = require("./models/user") 
const Comments = require("./models/comments")
const typeoffood = require("./models/typeoffood")

//telling the app to use middleware



app.use(express.static("public"))
app.use(express.static("public/image"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(methodOverride("_method"))
app.set("view engine", "ejs")

app.use(expresssession({
    secret:"first fullstack website",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//initalizing grid fs stream




app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

//mongo URI

const mongoURI = 'mongodb://localhost/foodhub'
const MongoClient = mongodb.MongoClient
mongoose.connect(mongoURI,
    {   useNewUrlParser:true, useUnifiedTopology: true}, err =>{
            console.log('connected')
    })

var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './public/image/')
    },
    filename:function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage,
    // fileFilter:function(req, file, cb){
    //     checkFileType(file, cb)
    // }
})
// function checkFileType(file, cb){
//     const filetypes =/jpeg|jpg|png|gif/
//     const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
//     const mineType = filetypes.test(file.mineType)

//     if(mineType && extname){
//         return cb(null, true)
//     }else{
//         cb('Error: Images Only')
//     }
// }




//getting to the landingpage
app.get("/", function(req, res){
    res.render("landing")
})



app.get("/kitchens", function(req, res){
    FoodVendor.find({}, function(err, vendors){
        if(err){
            res.send(err)
        }else{
            res.render("home", {vendors:vendors})
        }
    })
})

app.get("/kitchens/new", function(req, res){
    res.render("addkitchen")
})


var cpUploads = upload.fields([{name:'profilePicture', maxCount:1}, {name:'imagesOfFoodtoDisplay', maxCount:4}])
app.post("/kitchens",cpUploads,function(req, res){
    var name = req.body.name

    var profilePicture = fs.readFileSync(req.files.path)
    var encode_image_profilePicture= profilePicture.toString('base64')
  
    var final_image_profilePicture={
        contentType:req.files.mimetype,
        path:req.files.path,
        image:new Buffer(encode_image_profilePicture,'base64')
    }

    var imagesOfFoodtoDisplay = fs.readFileSync(req.files.path)
    var encode_image_imagesOfFoodtoDisplay = imagesOfFoodtoDisplay.toString('base64')
    var final_image_imagesOfFoodtoDisplay = {
        contentType:req.files.mimetype,
        path:req.files.path,
        image:new Buffer(encode_image_imagesOfFoodtoDisplay, 'base64')  
    } 
    var caption1 = req.body.caption1


    // var encode_image_imagesOfFoodtoDisplay = req.files.imagesOfFoodtoDisplay.data.toString('base64')
    // var final_image_imagesOfFoodtoDisplay = {
    //     image:new Buffer(final_image_imagesOfFoodtoDisplay, 'base64')
    // }
    // var imagesOfFoodtoDisplay = {
    //     data:fs.readFileSync(path.join(__dirname + '/public/image/' + final_image_imagesOfFoodtoDisplay)),
    //     contentType:'image/jpg'
    // }
    
    var imagesOfFoodtoDisplay = fs.readFileSync(req.files.path)
    var encode_image_imagesOfFoodtoDisplay = imagesOfFoodtoDisplay.toString('base64')
    var final_image_imagesOfFoodtoDisplay = {
        contentType:req.files.mimetype,
        path:req.files.path,
        image:new Buffer(encode_image_imagesOfFoodtoDisplay, 'base64')  
    } 
    var caption2 = req.body.caption2

   
    var imagesOfFoodtoDisplay = fs.readFileSync(req.files.path)
    var encode_image_imagesOfFoodtoDisplay = imagesOfFoodtoDisplay.toString('base64')
    var final_image_imagesOfFoodtoDisplay = {
        contentType:req.files.mimetype,
        path:req.files.path,
        image:new Buffer(encode_image_imagesOfFoodtoDisplay, 'base64')  
    } 
    var caption3 = req.body.caption3

    
    var imagesOfFoodtoDisplay = fs.readFileSync(req.files.path)
    var encode_image_imagesOfFoodtoDisplay = imagesOfFoodtoDisplay.toString('base64')
    var final_image_imagesOfFoodtoDisplay = {
        contentType:req.files.mimetype,
        path:req.files.path,
        image:new Buffer(encode_image_imagesOfFoodtoDisplay, 'base64')  
    } 
    var caption4 = req.body.caption4

    var descriptionOfTheFood = req.body.descriptionOfTheFood
    var AddressofVendor = req.body.AddressofVendor
    var price = req.body.price


    var vendorName = {
        id:req.user._id,
        username:req.user.username,
        email:req.user.email
    }
    var newVendors ={
        name:name,
        profilePicture: profilePicture,
        imagesOfFoodtoDisplay:imagesOfFoodtoDisplay, 
        caption1:caption1,
        imagesOfFoodtoDisplay:imagesOfFoodtoDisplay,
        caption2:caption2, 
        imagesOfFoodtoDisplay:imagesOfFoodtoDisplay, 
        caption3:caption3,
        imagesOfFoodtoDisplay:imagesOfFoodtoDisplay, 
        caption4:caption4 ,
        descriptionOfTheFood:descriptionOfTheFood, 
        AddressofVendor:AddressofVendor, 
        vendorName:vendorName,
        price:price
    }
    FoodVendor.create(newVendors, function(err, vendors){
        if(err){
            return res.status(400).send(err)
            
        }else{
            res.redirect("/kitchens")
            console.log(vendors)
        }
    })
})



//     //res.json({file:req.files})





app.get("/kitchen/:id", function(req, res){
    //finding the vendor by id, note the second argument of the callback function can be named 
    //anything and it coontains info from that particular id
    FoodVendor.findById(req.params.id).populate("comments").populate("order").exec(function(err, vendorsfoundById){
        if(err){
            console.log(err)
        }else{
            res.render("showkitchen", {vendors:vendorsfoundById})
            
        }
    })
    
})

app.get("/kitchen/:id/comment/new", function(req, res){
    FoodVendor.findById(req.params.id, function(err, vendors){
        if(err){
            console.log(err)
        }else{
             res.render("newcomment", {vendors:vendors})
        }
    })
   
})
app.post("/kitchen/:id/comment", function(req, res){
    FoodVendor.findById(req.params.id, function(err, vendors){
        if(err){
            console.log(err)
        }else{
            
            Comments.create(req.body.comments, function(err, newComment){
                newComment.author.username = req.user.username
                newComment.author.id = req.user._id
                newComment.save()
                vendors.comments.push(newComment)
                console.log(vendors.author.username)
                vendors.save()
                res.redirect("/kitchen/" + vendors._id )
            })
        }
    })

})
app.post("/kitchen/:id/order", function(req, res){
    FoodVendor.findById(req.params.id, function(err, vendors){
        if(err){
            console.log(err)
        }else{
            Orders.create(req.body, function(err, newOrder){
                newOrder.username.name = req.user.username
                newOrder.username.id= req.user._id
                newOrder.username.Address = req.user.Address
                newOrder.username.phoneNumber = req.user.phoneNumber
                console.log(newOrder)
                newOrder.save()
                vendors.order.push(newOrder)
                vendors.save()
                res.redirect("/kitchen/" + vendors._id)
            })
        }
    })
})


//routes for the signup page
app.get("/signUp", function(req, res){
    res.render("signup")
})


app.post("/signUp", function(req, res){
    //register user 
    const users = new User(req.body.user)
    User.register(users, req.body.password, function(err, newUser){
        if(err){
            console.log(err)
            return  res.render("signup")
        }else{
            
            //passport has to authenticate the user with the local schema
            passport.authenticate("local")(req, res, function(){
                res.redirect("/kitchens")
            })
        }
    })
    
})

app.get("/login", function(req, res){
    res.render("login")
})

app.post("/login", passport.authenticate("local", {
    successRedirect:"/kitchens",
    failureMessage: String
}), function(req, res){

})

app.get("/logout", function(req, res){
    req.logout()
    res.redirect("/kitchens")
})







app.get("/:id/editkitchen", function(req, res){
    FoodVendor.findById(req.params.id, function(err, foundVendor){
        if(err){
            console.log(err)
        }else{
            res.render("editkitchen", {vendors:foundVendor})
        }
    })
    
})


app.delete("/delete/:id", function(req, res){
    FoodVendor.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/kitchens")
        }
    })
})

app.delete("/delete/:id/comment/:comments_id", function(req, res){
    Comments.findByIdAndDelete(req.params.comments_id, function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/kitchen/" + req.params.id)
        }
    })
})








function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.listen(process.env.PORT || 3000, function(){
    console.log('connected')
})