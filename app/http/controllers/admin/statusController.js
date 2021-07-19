const Order = require('../../../models/orders');

function statusController() {
    return {
        update(req, res) {
            Order.updateOne({ _id: req.body.orderId }, { status: req.body.status }, (err, data) => {
                if (err) {
                    return res.redirect('/admin/orders');
                }

                //Emit the event that is binded in the app
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status });
                return res.redirect('/admin/orders');
            });
        }
    }
}


module.exports = statusController;