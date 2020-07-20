const Booking = require("../models/Booking");
const Service = require("../models/Service");
const UserPartner = require("../models/UserPartner");
const User = require("../models/UserAcess");
const { isPast } = require("date-fns");

const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");

const current = new Date();
module.exports = {
  async index(req, res) {
    const { partner_id } = req.headers;
    const { user_id } = req.headers;
    let servicos = [];

    if (partner_id) {
      bookings = await Booking.find({ partner: partner_id }).sort("date"); //encontrar vários tipos
    } else if (user_id) {
      bookings = await Booking.find({ user: user_id }).sort("date"); //encontrar vários tipos
    }

    return res.json({ bookings });
  },
  async store(req, res, next) {
    const { user_id } = req.headers;
    const service_id = req.params.id; //spot_id
    const { date } = req.body;

    const service = await Service.findById(service_id);
    const user = await User.findById(user_id);
    const partner = await UserPartner.findById(service.user);

    const booking = await Booking.create({
      user: user_id,
      partner: service.user,
      service: service_id,
      nameService: service.nomeService,
      nameCustomer: user.nome,
      date,
    });

    /**
     * ------------------------------------------------
     *  Armazenando o booking no parceiro e no user
     * ------------------------------------------------
     *
     *  Populate não serve para linkar as tabelas, ele
     *  só busca por uma referência para que você
     *  possa ver as informações ao invés de um ID
     */
    user.bookings.push(booking);
    partner.bookings.push(booking);
    await user.save();
    await partner.save();

    await booking.populate("partner").populate("user").execPopulate();

    const ownerSocket = req.connectedUsers[booking.service.user_id];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  },

  async getAll(req, res) {
    const { categoria } = req.query;
    const servicos = await Booking.find();
    return res.json(servicos);
  },
  async show(req, res) {
    await Booking.findById(req.params.id)
      .then((response) => {
        if (response) return res.status(200).json(response);
        else
          return res.status(404).json({ error: "Agendamento não encontrado" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },
};
