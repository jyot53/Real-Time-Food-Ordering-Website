require('dotenv').config(); //to get the varaibles that are defined in .envfile 
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash'); //Flash Messages for your Express Application
const MongoDbStore = require('connect-mongo'); //to store cookies in mongo database rather than in memory which is default;
const path = require('path');
const passport = require('passport');
const port = process.env.PORT || 8000;

const viewsPath = path.join(__dirname,'/resources/views');
const staticPath = path.join(__dirname,'/public');

//Database Connection
mongoose.connect("mongodb://localhost:27017/realtimeordering",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : true 
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Connection Done!!!");
}).catch(err => {
    console.log("Connection Failed "+err);
});


//Session Store
// let mongoStore = new  MongoDbStore({
//     mongooseConnection : connection,
//     collection : 'sessions'
// });

//Session Configuration (it is the middleware)
app.use(session({
    secret: process.env.COOKIE_SECRET,  //this secret key , api keys , passwords should be stored in different file .env (dotenv module)
    resave: false,
    store : MongoDbStore.create({
        mongoUrl : 'mongodb://localhost:27017/realtimeordering'
    }),
    saveUninitialized: true,
    cookie: { 
        maxAge : 1000*60*60*24 //24 hours
    }
  }));

  
//passport configuration
const passportinit = require("./app/config/passport");
passportinit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Assests
app.use(express.static(staticPath));

app.use(express.json()); //to get/receive the json data from the client
app.use(express.urlencoded({
    extended:false
}));

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
  });
  

//Set the template engine
app.use(expressLayout); //default name is layout.ejs
app.set('views',viewsPath);
app.set('view engine','ejs');

require("./routes/web")(app); //all the routes are called from here 

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
});