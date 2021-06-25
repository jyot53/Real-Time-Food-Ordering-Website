const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");
const bcrypt = require('bcrypt');
function passportinit(passport){
    passport.use(new LocalStrategy({usernameField : 'email'}, async (email,password,done)=>{
        //login logic
        //check if emial exists or not
        const user = await User.findOne({email:email});
        if(!user){
            return done(null,false, {message : 'No User With Entered Email'});
        }
        bcrypt.compare(password,user.password).then(match =>{
            if(match){
                return done(null,user,{message : 'Login Successfully'});
            }
            return done(null,false,{message : 'Incorrect Username or Password'});
        }).catch(err=>{
            return done(null,false,{message : 'Something Went Wrong'});
        });

    }));

    passport.serializeUser((user,done)=>{
        done(null,user._id);                                             
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id , (err,user)=>{
            done(err,user);
        });                                             
    });

    
}

module.exports = passportinit;