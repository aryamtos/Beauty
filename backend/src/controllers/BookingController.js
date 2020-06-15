const Booking = require('../models/Booking');
const { isPast } = require('date-fns');

const {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
} = require('date-fns');

const current = new Date();
module.exports = {

    async index(req, res) {

        const { service_id } = req.query;
        const servicos = await Booking.find({ service: service_id }).sort('date'); //encontrar vários tipos

        return res.json(servicos);
    },
    async store(req, res, next) {

        const { user_id } = req.headers;
        const { service_id } = req.params;//spot_id
        const { date } = req.body;

        const booking = await Booking.create({

            user: user_id,
            service: service_id,
            date,

        });
        await booking.populate('service').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.service.user_id];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking)
        }
        
        return res.json(booking);

    },
    
    async getAll(req, res){
        const { categoria } = req.query;
        const servicos = await Booking.find();
        return res.json(servicos);
    },
    async show(req, res) {
        await Booking.findById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response);
                else
                    return res.status(404).json({ error: 'Agendamento não encontrado' });
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    },
    

};