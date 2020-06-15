const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({


    date: { type: String},
    approved:Boolean,
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    service:{ //spot
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }
});


module.exports = mongoose.model('Booking', BookingSchema);