const Booking  = require ('../models/Booking');
module.exports ={
    async store(req,res){
        const { booking_id} = req.params;
        //booking é uma categoria ou serviço escolhido
        const booking  = await Booking.findById(booking_id).populate('category'); //dados do meu spot
        booking.approved = true;
        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];
        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response',booking);
        }
        return res.json(booking);
    }
};