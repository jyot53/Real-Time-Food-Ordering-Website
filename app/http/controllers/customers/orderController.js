const Order = require("../../../models/orders");
const moment = require('moment');
function orderController(){
    return {
        store(req,res){
            
            const {phone , address} = req.body;
            if(!phone || !address){
                req.flash('error',"All fields are compulsory");
                return res.redirect("/cart");
            }

            const order = new Order({
                customerId : req.user._id,
                items : req.session.cart.items,
                phone : phone,
                address : address
            });
            order.save().then(result =>{
                req.flash('success','Order Placed Successfully!!!');
               delete req.session.cart; //delete the cart after placing the order
                res.redirect('/customer/orders');

            }).catch(err => {
                req.flash('error','Something Went Wrong');
                return res.redirect("/cart");
            });
        },
        async index(req,res){
            const orders = await Order.find({customerId : req.user._id},
                null,
                {sort : {'createdAt' : -1}}); //get the order in the reverse order (newest order on top)
                res.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-stable=0,post-check=0,pre-check=0'); //no cache on back button
                res.render('customers/order',{orders : orders,moment : moment});
            // console.log(orders);
        }
    }
}

module.exports = orderController;