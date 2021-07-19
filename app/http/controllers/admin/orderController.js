const Order = require('../../../models/orders');
const moment = require('moment');

function orderController() { //order controller for admins 
    return {
        async index(req, res) {
            const orders = await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId').exec((err, orders) => {
                if (req.xhr) { //if the req is from xmlHttpRequest then just send json data
                    return res.json(orders);
                }
                // console.log(orders);
                return res.render('admin/orders');
            });
        },
    }
}

module.exports = orderController;