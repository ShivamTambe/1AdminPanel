const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
const md5 = require("md5");
// const { userInfo } = require("os");

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



// mongoose.connect("mongodb+srv://Admin:Admin123@cluster0.cuic2kf.mongodb.net/todolistDB",{useNewUrlParser: true});
mongoose.connect("mongodb+srv://shivam:Shivam123@cluster0.gcp5u27.mongodb.net/GYMlistDB",{useNewUrlParser: true});

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json());

// let name = req.body.name;
//     let password = req.body.password;
//     let price = req.body.price;
//     let gymname = req.body.gymname;
//     let discountprice = req.body.discountprice;
//     let state = req.body.state;
//     let city = req.body.city;
//     let zipcode = req.body.zipcode;

const gymSchema ={
    gymname : String,
    price : Number,
    discountprice:Number,
    state: String,
    city : String,
    zipcode:Number
};
const userSchema ={
    name : String,
    service : String
}

const GymInfo = mongoose.model("GymInfo", gymSchema);
const UserInfo = mongoose.model("UserInfo", userSchema)

const person2 = new GymInfo({
    gymname: "gym",
    price : 300,
    discountprice: 100,
    state: "Washington",
    city:" ciyt",
    zipcode: 320393
})
const defaultitems = [ person2];

// const loginSchema = {
//     firstName : String,
//     lastName : String,
//     email : String,
//     screenName : String,
//     password : String,
//     confirmPassword : String,
//     dateOfBirth : Date,
//     zipCode : Number,
//     gender : String
// };

// const Id = mongoose.model("Id", loginSchema);

// const person1 = new Id({
//     firstName : "Rocket",
//     lastName : "Fire",
//     email : "admin@gmail.com",
//     screenName : "RocketOfficial",
//     password : "admin@1234",
//     confirmPassword : 'admin@1234',
//     dateOfBirth : 05/06/2011,
//     zipCode : 372938,
//     gender :"male"
// })
// const person2 = new Id({
//     firstName : "Rocket",
//     lastName : "Fire",
//     email : "user@gmail.com",
//     screenName : "RocketOfficial",
//     password : "user@1234",
//     confirmPassword : 'user@1234',
//     dateOfBirth : 05/06/2011,
//     zipCode : 372938,
//     gender :"male"
// })
// const defaultitems = [ person1, person2];


// app.post("/signup", function(req,res){
//     let newId = new Id({
//         firstName : `${req.body.firstname}`,
//         lastName : `${req.body.lastname}`,
//         email : `${req.body.email}`,
//         screenName : `${req.body.screenname}`,
//         password : md5(req.body.password),
//         confirmPassword : md5(req.body.confirmpassword),
//         dateOfBirth : req.body.bday,
//         zipCode : req.body.zipcode,
//         gender :"male"
//     })
//     if(md5(req.body.password) === md5(req.body.confirmpassword)){
//         newId.save();
//     }
//     res.redirect("/login");
// })
app.post("/addgyms",function(req, res){
    let name = req.body.name;
    let password = req.body.pass;
    let pricee = req.body.price;
    let gymnamee = req.body.gymname;
    let discountpricee = req.body.discountprice;
    let statee= req.body.state;
    let cityy = req.body.city;
    let zipcodee = req.body.zipcode;

        
    // if(name == "admin" && password =="admin@123"){
        let newgym = new GymInfo({
            gymname : gymnamee,
            price : pricee,
            discountprice:discountpricee,
            state: statee,
            city : cityy,
            zipcode:zipcodee
        })

        newgym.save();
    // }
    res.redirect("/forms");
})

app.post("/addusers",function(req, res){

        let newuser = new UserInfo({
            name : req.body.username,
            service: req.body.service
        })

        newuser.save();

    res.redirect("/addusers");
})

app.get("/gyms", function(req,res){
    // GymInfo.find({}, function(err, foundItems){
    //         // console.log(foundItems);
    //         return foundItems;
    //     });
    GymInfo.find().then(result =>{
        res.render('admin',{ item : result});
    }).catch(err => console.log(err));
})
app.get("/users", function(req,res){
    // GymInfo.find({}, function(err, foundItems){
    //         return foundItems;
    //     });
    UserInfo.find().then(result =>{
        
        res.render('usersdetails',{ item : result});
    }).catch(err => console.log(err));
})

app.get("/addusers",function(req,res){
    res.render('userform');
})
app.get("/login",function(req, res){
    res.render("login");
})


app.post("/login",async function(req, res){
    let email = req.body.email;
    let password = md5(req.body.password);
        Id.find({}, function(err, foundItems){
        let page = 0;
            for(var i=0; i<foundItems.length ; i++){
                // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
                if((email == foundItems[i].email && foundItems[i].password == password) || (email == "admin@gmail.com" && password == "admin@1234")){
                    
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
        
        let page = 0;
            for(var i=0; i<foundItems.length ; i++){
                // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
                if((email == foundItems[i].email && foundItems[i].password == password) || (email == "admin@gmail.com" && password == "admin@1234")){
                    
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

app.post("/filtersearch",function(req, res){
    let all = req.body.all;
    let economical = req.body.economical;
    let premimum = req.body.premimum;

    if(all=='on' || (economical=='on' && premimum=='on')){
        GymInfo.find().then(result =>{
            res.render('admin',{ item : result, type: "gyms"});
        }).catch(err => console.log(err));
    }
    else{
        if(economical=='on'){
            GymInfo.find({ discountprice: {$lte:100}}).then(result =>{
                res.render('admin',{ item : result, type: "gyms"});
            }).catch(err => console.log(err));
        }
        else{
            GymInfo.find({ discountprice: {$lte:300, $gt:100}}).then(result =>{
                res.render('admin',{ item : result, type: "gyms"});
            }).catch(err => console.log(err));
        }
    }
})


app.post("/filterusers",function(req, res){
    let all = req.body.all;
    let m = req.body.msg;
    let t = req.body.train;
    // console.log(all);
    if(all=='on' || (m == 'on' && t=='on')){
        UserInfo.find().then(result =>{
        // console.log(result);
            
            res.render('usersdetails',{ item : result});
        }).catch(err => console.log(err));
    }
    else{
        // console.log(m);
        if(m =='on'){
            UserInfo.find({service:'Message'}).then(result =>{
                console.log(result);
                res.render('usersdetails',{ item : result, type: "gyms"});
            }).catch(err => console.log(err));
        }
        else{
            console.log(t);
            if(t =='on'){
                UserInfo.find({service:'Training'}).then(result =>{
                    console.log(result);
                    res.render('usersdetails',{ item : result, type: "gyms"});
                }).catch(err => console.log(err));
            }
        }
    }
})



app.get("/forms",function(req,res){
    res.render("forms");
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
app.get("/addgyms", function(req,res){
    res.render("forms");
})

app.listen(port, function(){
    console.log("server is running on prot "+ port);
})