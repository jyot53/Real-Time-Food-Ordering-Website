function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart');
        },
        update(req, res) {
            // let cart = {
            //     items : {
            //         pizzaId :{
            //             item : pizzaObj,
            //             qty : 0
            //         }
            //     },
            //     totalQty : 0,
            //     totalPrice : 0
            // }

            //for the first time creating cart
            if (!req.session.cart) {
                //creating an empty cart with the session variable name as cart.
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart;
                if(!cart.items[req.body._id]){ //req.body contianes the pizza object
                    cart.items[req.body._id] = {
                        item : req.body,
                        qty : 1
                    }

                    cart.totalQty = cart.totalQty + 1;
                    cart.totalPrice = (+cart.totalPrice) + (+req.body.price);
                    
                }else{
                    cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                    cart.totalQty = cart.totalQty + 1;
                    cart.totalPrice = (+cart.totalPrice) + (+req.body.price);
                }
            return res.json({ totalQty : req.session.cart.totalQty });
        }
    }
}

module.exports = cartController;
