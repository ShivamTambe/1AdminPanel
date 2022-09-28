const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const md5 = require("md5");

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json());


mongoose.connect("mongodb+srv://Admin:Admin123@cluster0.cuic2kf.mongodb.net/loginDB",{useNewUrlParser: true});

const loginSchema = {
    firstName : String,
    lastName : String,
    email : String,
    screenName : String,
    password : String,
    confirmPassword : String,
    dateOfBirth : Date,
    zipCode : Number,
    gender : String
};

const Id = mongoose.model("Id", loginSchema);

const person1 = new Id({
    firstName : "Rocket",
    lastName : "Fire",
    email : "admin@gmail.com",
    screenName : "RocketOfficial",
    password : "admin@1234",
    confirmPassword : 'admin@1234',
    dateOfBirth : 05/06/2011,
    zipCode : 372938,
    gender :"male"
})
const person2 = new Id({
    firstName : "Rocket",
    lastName : "Fire",
    email : "user@gmail.com",
    screenName : "RocketOfficial",
    password : "user@1234",
    confirmPassword : 'user@1234',
    dateOfBirth : 05/06/2011,
    zipCode : 372938,
    gender :"male"
})
const defaultitems = [ person1, person2];


app.post("/signup", function(req,res){
    let newId = new Id({
        firstName : `${req.body.firstname}`,
        lastName : `${req.body.lastname}`,
        email : `${req.body.email}`,
        screenName : `${req.body.screenname}`,
        password : md5(req.body.password),
        confirmPassword : md5(req.body.confirmpassword),
        dateOfBirth : req.body.bday,
        zipCode : req.body.zipcode,
        gender :"male"
    })
    if(md5(req.body.password) === md5(req.body.confirmpassword)){
        newId.save();
    }
    res.redirect("/login");
})

app.get("/login",function(req, res){
    res.render("login");
})


app.post("/login",async function(req, res){
    let email = req.body.email;
    let password = md5(req.body.password);
        Id.find({}, function(err, foundItems){
        console.log(foundItems);
        let page = 0;
            for(var i=0; i<foundItems.length ; i++){
                // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
                if((email == foundItems[i].email && foundItems[i].password == password) || (email == "admin@gmail.com" && password == "admin@1234")){
                    console.log("founnd");
                    page++;
                    console.log(page);
                    break;
                }
            } 
            if(page >=1){
                // res.redirect(`/index?name=${email}`)
                res.redirect("/index");
            }
            else{
                res.redirect("/login");
            }
        });
})

app.post("/signup", function(req,res){
    let newId = new Id({
        firstName : `${req.body.firstname}`,
        lastName : `${req.body.lastname}`,
        email : `${req.body.email}`,
        screenName : `${req.body.screenname}`,
        password : md5(req.body.password),
        confirmPassword : md5(req.body.confirmpassword),
        dateOfBirth : req.body.bday,
        zipCode : req.body.zipcode,
        gender :"male"
    })
    if(md5(req.body.password) === md5(req.body.confirmpassword)){
        newId.save();
    }
    res.redirect("/login");
})

app.post("/login",async function(req, res){
    let email = req.body.email;
    let password = md5(req.body.password);
        Id.find({}, function(err, foundItems){
        console.log(foundItems);
        let page = 0;
            for(var i=0; i<foundItems.length ; i++){
                // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
                if((email == foundItems[i].email && foundItems[i].password == password) || (email == "admin@gmail.com" && password == "admin@1234")){
                    console.log("founnd");
                    page++;
                    console.log(page);
                    break;
                }
            } 
            if(page >=1){
                // res.redirect(`/index?name=${email}`)
                res.redirect("/index");
            }
            else{
                res.redirect("/login");
            }
        });
})

app.get("/", function(req, res){
    res.render("login");
})
app.get("/signup", function(req, res){
    res.render("signup");
})
app.get("/admin", function(req, res){
    res.render("admin");
})

app.listen(port, function(){
    console.log("server is running on prot "+ port);
})