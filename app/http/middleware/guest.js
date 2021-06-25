//when the user is already logged in it should not go into the login or register page (not even by typing route in url) 
// for this we are using the one middleware 
function guest(req,res,next){ 
    if(!req.isAuthenticated()){
        return next();
    }

    return res.redirect("/");

}

module.exports = guest;