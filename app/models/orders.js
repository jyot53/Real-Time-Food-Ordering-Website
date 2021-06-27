const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    customerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: {
        type: Object,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType : {
        type : String,
        default : "COD"
    },
    status : {
        type : String,
        default : "order_placed"
    }

}, { timestamps: true });


const order = mongoose.model("Order", orderSchema);

module.exports = order;