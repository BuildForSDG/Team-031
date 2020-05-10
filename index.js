require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));


app.use(session({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized:false,

}))

//set up passport
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb+srv://victor_eyo:test123@team031-5rrit.mongodb.net/sellerDB',{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.set("useCreateIndex", true)

//sellerdb schema
const sellerSchema = new mongoose.Schema({
    email: String,
    password: String
})

sellerSchema.plugin(passportLocalMongoose)

const Seller = new mongoose.model("Seller", sellerSchema)

passport.use(Seller.createStrategy());

//stores user in session
passport.serializeUser(function(Seller, done) {
  done(null, Seller.id);
});

//retrieves user from session
passport.deserializeUser(function(id, done) {
  Seller.findById(id, function(err, Seller) {
    done(err, Seller);
  });
});


//seller sign up route
app.get('/seller', function(req, res){
    res.sendFile(__dirname+'/seller.html')
})

app.post('/seller', function(req, res){
    Seller.register({username:req.body.username}, req.body.password, function(err, seller){
        if(err){
            console.log(err);
            //res.redirect('./register');
        }else{
            passport.authenticate('local')(req, res, function(){
                res.send('Successfully Registered')
            })
        }
    })
})


//seller login route
app.get('/login', function(req, res){
    res.sendFile(__dirname+'/login.html')
})

app.post('/login', function(req, res){
    const seller = new Seller({
        username:req.body.username,
        password:req.body.password
    })

    req.login(seller, function(err){
        if(err){
            console.log(err)
        }else{
            passport.authenticate('local')(req, res, function(){
                res.send('Welcome')
            })
        }
    })

})



let port = 3000

app.listen(port, function(){
    console.log('server started on 3000')
})