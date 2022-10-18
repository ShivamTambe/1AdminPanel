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



// mongoose.connect("mongodb+srv://Admin:Admin123@cluster0.gcp5u27.mongodb.net/GYMlistDB",{useNewUrlParser: true});
mongoose.connect("mongodb+srv://shivam:Shivam123@cluster0.gcp5u27.mongodb.net/GYMlistDB?ssl=true",{useNewUrlParser: true});
// mongoose.connect("mongodb://<username>:<password>@ac-pp1j05o-shard-00-00.gcp5u27.mongodb.net:27017,ac-pp1j05o-shard-00-01.gcp5u27.mongodb.net:27017,ac-pp1j05o-shard-00-02.gcp5u27.mongodb.net:27017/businesslistDB?ssl=true&replicaSet=atlas-xmkp7m-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser: true});
// mongodb://shivam:Shivam123@ac-pp1j05o-shard-00-00.gcp5u27.mongodb.net:27017,ac-pp1j05o-shard-00-01.gcp5u27.mongodb.net:27017,ac-pp1j05o-shard-00-02.gcp5u27.mongodb.net:27017/?ssl=true&replicaSet=atlas-xmkp7m-shard-0&authSource=admin&retryWrites=true&w=majority

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json());



const gymSchema ={
    gymname : String,
    price : Number,
    gymbio: String,
    discountprice:Number,
    state: String,
    city : String,
    zipcode:Number,
    image: String
};
const userSchema ={
    name : String,
    service : String,
    userbio: String,
    city: String,
    state: String,
    zipcode : Number
};
const businessSchema ={
    businessname : String,
    bio : String
}
const personalSchema={
    trainername: String,
    trainerbio: String,
    location: String
}
const adminSchema ={
    username : String,
    password : String,
    id: String
};
const promoSchema={
    promocode: String,
    value: Number
}




const GymInfo = mongoose.model("GymInfo", gymSchema);
const UserInfo = mongoose.model("UserInfo", userSchema)
const BusinessInfo = mongoose.model("BusinessInfo", businessSchema);
const PersonalTrainer = mongoose.model("PersonalTrainer",personalSchema);
const adminInfo = mongoose.model("adminInfo",adminSchema);
const PromoInfo = mongoose.model("PromoInfo",promoSchema);


app.post("/addpersonaltrainer",function(req, res){
    let name = req.body.username;
    let password = req.body.adminpassword;
    adminInfo.find().then(result =>{
        console.log(result);
        for(var i=0; i<1; i++) {
                if(password == result[i].password && name == result[i].username){
                    let newtrainer = new PersonalTrainer({
                        trainername : req.body.trainername,
                        trainerbio : req.body.trainerbio
                    })
                    newtrainer.save();
            }
            res.redirect("/addpersonaltrainer");
        }
    }).catch(err => console.log(err));
})

app.post("/addbusiness",function(req, res){
    let name = req.body.username;
    let password = req.body.adminpassword;
    adminInfo.find().then(result =>{
        console.log(result);
        for(var i=0; i<1; i++) {
                if(password == result[i].password && name == result[i].username){
                    let newbusiness = new BusinessInfo({
                        businessname : req.body.businessname,
                        bio : req.body.bio
                    })
                    newbusiness.save();
            }
            res.redirect("/addbusiness");
        }
    }).catch(err => console.log(err));
})

app.post("/addusers",function(req, res){
    let name = req.body.username;
    let password = req.body.adminpassword;
    adminInfo.find().then(result =>{
        console.log(result);
        for(var i=0; i<1; i++) {
                if(password == result[i].password && name == result[i].username){
                    let newuser = new UserInfo({
                        name : req.body.username,
                        service: req.body.service,
                        userbio: req.body.userbio,
                        city : req.body.city,
                        state : req.body.state,
                        zipcode : req.body.zip,
                        image: req.body.gymimg
                    })
            
                    newuser.save();
            }
            res.redirect("/addusers");
        }
    }).catch(err => console.log(err));
})
app.post("/addgyms",function(req, res){
    let name = req.body.username;
    let password = req.body.adminpassword;
    let pricee = req.body.price;
    let gymnamee = req.body.gymname;
    let discountpricee = req.body.discountprice;
    let statee= req.body.state;
    let cityy = req.body.city;
    let zipcodee = req.body.zipcode;
    let gymbio = req.body.gymbio;
    let profileimg = req.body.gymimg;

        
    adminInfo.find().then(result =>{
        console.log(result);
        for(var i=0; i<1; i++) {
            // console.log(result[i].password);
            // console.log(result[i].username);

                if(password == result[i].password && name == result[i].username){
                let newgym = new GymInfo({
                    gymname : gymnamee,
                    price : pricee,
                    gymbio: gymbio,
                    discountprice:discountpricee,
                    state: statee,
                    city : cityy,
                    zipcode:zipcodee
                })
        
                newgym.save();
            }
            res.redirect("/forms");
        }
        // console.log(result[1].adminpassword);
        // console.log(password);
    }).catch(err => console.log(err));
})

// app.post("/addusers",function(req, res){
//     let name = req.body.username;
//     let password = req.body.adminpassword;
//     adminInfo.find().then(result =>{
//         console.log(result);
//         for(var i=0; i<1; i++) {
//                 if(password == result[i].password && name == result[i].username){
//                     let newuser = new UserInfo({
//                         name : req.body.username,
//                         service: req.body.service
//                     })
//                     newuser.save();
//             }
//             res.redirect("/addusers");
//         }
//     }).catch(err => console.log(err));
// })




app.get("/addpromo",function(req,res){
    res.render("addpromo");
})
app.get("/personaltrainer", function(req,res){
    PersonalTrainer.find().then(result =>{
        res.render('personaltrainer',{ item : result});
    }).catch(err => console.log(err));
})


app.get("/businessdetails", function(req,res){
    // GymInfo.find({}, function(err, foundItems){
    //         return foundItems;
    //     });
    BusinessInfo.find().then(result =>{
        // console.log(result);
        res.render('businessdetails',{ item : result});
    }).catch(err => console.log(err));
})

app.get("/gyms", function(req,res){
    // GymInfo.find({}, function(err, foundItems){
    //         // console.log(foundItems);
    //         return foundItems;
    //     });
    GymInfo.find().then(result =>{
        // console.log(result);
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



app.post("/addpromo",function(req,res){
    let codee = req.body.code;
    let valuee = req.body.value;
    let passwordd = req.body.adminpassword;
    let namee = req.body.username;

    console.log(req.body.adminpassword);
    console.log(namee);
    console.log(req.body.code);
    console.log(valuee);

    adminInfo.find().then(result =>{
        console.log(result);
        for(var i=0; i<1; i++) {
            console.log(result[i].password);
            console.log(result[i].username);

                // if(passwordd == result[i].password && namee == result[i].username){
                if(true){
                    console.log("YES");
                let newpromo = new PromoInfo({
                    promocode : codee,
                    value: valuee
                })
        
                newpromo.save();
            }
            res.redirect("/addpromo");
        }
    }).catch(err => console.log(err));

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
    let economical1 = req.body.economical1;
    let premimum1 = req.body.premimum;

    if(all=='on' || (economical=='on' && premimum=='on')){
        GymInfo.find().then(result =>{
            res.render('admin',{ item : result, type: "gyms"});
        }).catch(err => console.log(err));
    }
    else{
        if(economical=='on'){
            if(economical1 == 'on'){
                GymInfo.find({ discountprice: {$lte:50}}).then(result =>{
                    res.render('admin',{ item : result, type: "gyms"});
                }).catch(err => console.log(err));
            }
            if(premimum1=='on'){
                GymInfo.find({ discountprice: {$lte:150, $gt:50}}).then(result =>{
                    res.render('admin',{ item : result, type: "gyms"});
                }).catch(err => console.log(err));
            }
            GymInfo.find({ discountprice: {$lte:100}}).then(result =>{
                res.render('admin',{ item : result, type: "gyms"});
            }).catch(err => console.log(err));
        }
        else{
            if(premimum =='on'){
                if(economical1=="on"){
                    GymInfo.find({ discountprice: {$lte:300, $gt:150}}).then(result =>{
                        res.render('admin',{ item : result, type: "gyms"});
                    }).catch(err => console.log(err));
                }
                if(premimum1=='on'){
                    GymInfo.find({ discountprice: {$lte:501, $gt:300}}).then(result =>{
                        res.render('admin',{ item : result, type: "gyms"});
                    }).catch(err => console.log(err));
                }
            }
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
app.post("/editgyms",function(req,res){
    let editid = req.body.changeid;
    let pricee = req.body.price;
    let gymnamee = req.body.gymname;
    let discountpricee = req.body.discountprice;
    let statee= req.body.state;
    let cityy = req.body.city;
    let zipcodee = req.body.zipcode;
    console.log(editid);
    GymInfo.updateOne({_id:editid},{$set:{gymname:`${gymnamee}`}}).then(result =>{
        console.log(result);
    });
    res.redirect("/gyms");
})
app.post("/editpersonaltrainer",function(req,res){
    let editid = req.body.changeid;
    let trainernamee = req.body.trainername;
    console.log(editid);
    PersonalTrainer.updateOne({_id:editid},{$set:{trainername:`${trainernamee}`}}).then(result =>{
        console.log(result);
    });
    res.redirect("/personaltrainer");
})

app.post("/editbusiness",function(req,res){
    let editid = req.body.changeid;
    let businessnamee = req.body.businessname;
    let trainerbio = req.body.trainerbio;
    console.log(editid);
    BusinessInfo.updateOne({_id:editid},{$set:{businessname:`${businessnamee}`}}).then(result =>{
        console.log(result);
    });
    res.redirect("/businessdetails");
})

app.post("/editusers",function(req,res){
    let editid = req.body.changeid;
    let usernamee = req.body.username;
    console.log(editid);
    UserInfo.updateOne({_id:editid},{$set:{name:`${usernamee}`}}).then(result =>{
        console.log(result);
    });
    res.redirect("/usersdetails");
})

app.post("/searchbyname",function(req,res){
    let name = req.body.username;
    UserInfo.find({trainername:`${name}`}).then(result =>{
        res.render('usersdetails',{ item : result});
    }).catch(err => console.log(err));
})
app.post("/searchbycity",function(req,res){
    let name = req.body.usercity;
    UserInfo.find({city:`${name}`}).then(result =>{
        res.render('usersdetails',{ item : result});
    }).catch(err => console.log(err));
})
app.post("/searchbystate",function(req,res){
    let name = req.body.userstate;
    UserInfo.find({state:`${name}`}).then(result =>{
        res.render('usersdetails',{ item : result});
    }).catch(err => console.log(err));
})
app.post("/searchbyzip",function(req,res){
    let name = req.body.userzip;
    UserInfo.find({zipcode:`${name}`}).then(result =>{
        res.render('usersdetails',{ item : result});
    }).catch(err => console.log(err));
})





app.post("/changeadmin",function(req,res){
    let newusername = req.body.newusername;
    let newpassword = req.body.newpassword;
    let confirmpassword = req.body.confirmpassword;
    console.log(newpassword);
    console.log(confirmpassword);

    if(newpassword == confirmpassword){
        adminInfo.updateOne({id:'admin'},{$set:{password:`${newpassword}`}}).then(result =>{
            console.log(result);
        });
        adminInfo.updateOne({id:'admin'},{$set:{username:`${newusername}`}}).then(result =>{
            console.log(result);
        });
    }
    GymInfo.find().then(result =>{
        res.render('admin',{ item : result, type: "gyms"});
    }).catch(err => console.log(err));
})


app.get("/changeadmin",function(req,res){
    res.render('changeadmin');
})
app.get("/addpersonaltrainer",function(req,res){
    res.render('addpersonaltrainer');
})
app.get("/addbusiness",function(req,res){
    res.render('addbusiness');
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
app.get("/graph",function(req,res){
    res.render('graph')
})

app.listen(port, function(){
    console.log("server is running on prot "+ port);
})