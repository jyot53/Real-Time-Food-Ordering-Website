const mongoose = require('mongoose'); //name of the file is the name of the collection made 

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"User",
    }
},{ timestampes : true});


//create a collection
const user = mongoose.model("User",userSchema);

module.exports = user;