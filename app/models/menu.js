const mongoose = require('mongoose'); //name of the file is the name of the collection made 

const menuSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    }
});


//create a collection
const menu = mongoose.model("Menu",menuSchema);

module.exports = menu;