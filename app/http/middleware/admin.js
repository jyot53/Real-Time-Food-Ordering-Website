function admin(req,res,next){
    if(req.isAuthenticated() && req.user.role=="admin"){
        return next();
    }else{
        res.redirect("/");
    }
}

module.exports = admin;