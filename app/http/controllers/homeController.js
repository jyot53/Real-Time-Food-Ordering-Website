const menu = require("../../models/menu");

function homeController(){
    return{
       async index (req,res){

            const menuData = await menu.find();
            return res.render('home',{pizzas : menuData});

            // menu.find().then((pizzas)=>{
            //     // console.log(pizzas);
            //     res.render('home',{
            //         pizzas : pizzas
            //     });
            // }).catch((err)=>{
            //     console.log("Fetching Menu Data Error "+err);
            // });
           
        }
    }
}

module.exports = homeController;