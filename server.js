const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const port = process.env.PORT || 8000;

const viewsPath = path.join(__dirname,'/resources/views');

app.get("/",(req,res)=>{
    res.render("home");    
});


app.use(expressLayout);
app.set('views',viewsPath);
app.set('view engine','ejs');

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
});