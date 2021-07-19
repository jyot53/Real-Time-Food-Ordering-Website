const Order = require("../../../models/orders");
const moment = require('moment');

function orderController() {
    return {
        store(req, res) {

            const { phone, address } = req.body;
            if (!phone || !address) {
                req.flash('error', "All fields are compulsory");
                return res.redirect("/cart");
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            });
            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                    req.flash('success', 'Order Placed Successfully!!!');
                    delete req.session.cart; //delete the cart after placing the order

                    //Emit the event that is binded in the app
                    const eventEmitter = req.app.get('eventEmitter');
                    eventEmitter.emit('orderPlaced', placedOrder);

                    return res.redirect('/customer/orders');
                });

            }).catch(err => {
                req.flash('error', 'Something Went Wrong');
                return res.redirect("/cart");
            });
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id },
                null, { sort: { 'createdAt': -1 } }); //get the order in the reverse order (newest order on top)
            res.header('Cache-Control', 'no-cache,private,no-store,must-revalidate,max-stable=0,post-check=0,pre-check=0'); //no cache on back button
            res.render('customers/order', { orders: orders, moment: moment });
            // console.log(orders);
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id);
            //authorize user first only able to see your own orders not others 
            //check if the order is of the current user or not

            if (req.user._id.toString() == order.customerId.toString()) {
                return res.render('customers/singleOrder', { order: order });
            }

            return res.redirect('/');


        }
    }
}

module.exports = orderController;