const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({


    date: { type: Date},
    approved:Boolean,
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'UserAcess'
    },
    category:{ //spot
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoriaModel'
    }
});


module.exports = mongoose.model('Booking', BookingSchema);