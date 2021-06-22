const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const port = process.env.PORT || 8000;

const viewsPath = path.join(__dirname,'/resources/views');
const staticPath = path.join(__dirname,'/public');

app.use(express.static(staticPath));

app.use(expressLayout);
app.set('views',viewsPath);
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("home");    
});

app.get("/cart",(req,res)=>{
    res.render("customers/cart");
});
app.get("/login",(req,res)=>{
    res.render("auth/login");
});
app.get("/register",(req,res)=>{
    res.render("auth/register");
});



app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
});