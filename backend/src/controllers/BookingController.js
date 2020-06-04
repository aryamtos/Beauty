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

        let exists;
        if (req.params.id) {
            exists = await Booking.
                findOne(
                    {
                        '_id': { '$ne': req.params.id },
                        'date': { '$eq': new Date(date) },
                        'user': { '$in': user_id }
                    });
        } else {
            if (isPast(new Date(date)))
                return res.status(400).json({ error: 'escolha uma data e hora futura' });
            exists = await Booking.
                findOne(
                    {
                        'date': { '$eq': new Date(date) },
                        'user': { '$in': user_id }
                    });
        }
        next;



        await booking.populate('service').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.category.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.json(booking);

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
    async today(req, res) {
        await Booking
            .find({
                'user': { '$in': req.params.user_id },
                'date': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
            })
            .sort('date')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },
    async week(req, res) {
        await Booking
            .find({
                'user': { '$in': req.params.user_id },
                'date': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) }
            })
            .sort('date')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },
    async  month(req, res) {
        await Booking
            .find({
                'user': { '$in': req.params.user_id },
                'date': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) }
            })
            .sort('date')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },
    async year(req, res) {
        await Booking
            .find({
                'user': { '$in': req.params.user_id },
                'date': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
            })
            .sort('date')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },
    async late(req, res) {
        await Booking
            .find({
                'when': { '$lt': current },
                'user': { '$in': req.params.user }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

};