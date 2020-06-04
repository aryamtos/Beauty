const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const auth = require('./middleware/authentification');


const UserController = require('./controllers/UserRegisController');
const ServiceController = require('./controllers/ServiceControllers');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const routes = express.Router();
const upload = multer(uploadConfig);


let _user = new UserController();
let _product = new ServiceController();


//ROTAS CLIENTES

routes.post('/auth', _user.authentification);
routes.post('/user/register', _user.post);
routes.put('/user/register/:id',_user.put);
routes.get('/user/showusers', _user.get);
routes.get('/user/:id', _user.getById);
routes.delete('/user/deleteuser/:id',_user.delete);

//DASHBOARD
routes.get('/dashboard', DashboardController.show);

//ROTAS SERVIÇOS

routes.post('/service/register',upload.single('foto'), _product.post);

routes.put('/service/register/:id',_product.put);

routes.get('/service/showservices',_product.get);

routes.get('/service/:id', _product.getById);

routes.delete('/service/deleteservice/:id', _product.delete);

//ROTAS BOOKING

routes.post('/service/:id/bookings', BookingController.store);
routes.get('/bookings', BookingController.show);

//SOLICITAÇÃO DE RESERVA
routes.post('/bookings/:booking_id/rejections', RejectionController.store);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);

module.exports = routes;