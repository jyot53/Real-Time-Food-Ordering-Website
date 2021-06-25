const user = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },
        register(req, res) {
            res.render('auth/register');
        },
        async postregister(req, res) {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                req.flash('error', 'All Fields are compulsory');
                req.flash('name', name)
                req.flash('email', email);
                return res.redirect('/register');               
            }
            user.exists({ email: email }, (err, data) => {
                if (data) {
                    req.flash('error', 'User Already Exists. Kindly Login');
                    req.flash('name', name)
                    req.flash('email', email);
                  
                }
            });

            //hashing the password
            const hashpass = await bcrypt.hash(password,10);
            //create new user
            const newUser = new user({
                name:name,
                email:email,
                password:hashpass
            });
            newUser.save().then((user)=>{
                return res.redirect("/");
            }).catch((err)=>{
                req.flash('error', 'Something Went Wrong');
                req.flash('name', name)
                req.flash('email', email);
                return res.redirect("/register");
            });
        },
        postlogin(req, res,next) {

            const { email, password } = req.body;
            if (!email || !password) {
                req.flash('error', 'All Fields are compulsory');
                req.flash('email', email);
                return res.redirect('/login');               
            }

            passport.authenticate('local',(err,user,info)=>{
               if(err){
                req.flash('error', info.message);
                return next(err);
               }
               if(!user){
                   return res.redirect("/login");
               }
               req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message);
                        return next(err);
                    }

                    return res.redirect('/');
               });
            })(req,res,next);

        },
        logout(req,res){
            req.logout();
            res.redirect("/login"); //we can even redirect to the home page
        }
    }
}

module.exports = authController;