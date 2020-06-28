const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const auth = require('./middleware/authentification');


const SearchController = require('./controllers/SearchController');
const UserController = require('./controllers/UserRegisController');
const ServiceController = require('./controllers/ServiceControllers');

const ProdutosController = require('./controllers/ProdutosController');
const Service = require('./controllers/ListController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const routes = express.Router();
const upload = multer(uploadConfig);


let _user = new UserController();
let _product = new ServiceController();
let _partner = new PartnerController();
// let _user = new UserController();
// let _product = new ServiceController();


// de leo que não usa
// //ROTAS CLIENTES

// routes.post('/auth', _user.authentification);
// routes.post('/user/register', _user.post);
// routes.put('/user/register/:id',_user.put);
// routes.get('/user/showusers', _user.get);
// routes.get('/user/:id', _user.getById);
// routes.delete('/user/deleteuser/:id',_user.delete);


// =============ROTAS TESTE============================>

routes.post('/produtos', ProdutosController.store); //Cadastrar Serviços

routes.get('/listarServicos', ProdutosController.index);

routes.get('/list', ProdutosController.getAll); //Listar Serviços e Local dos serviços e categoria
//************************************************************ */

//DASHBOARD
routes.get('/dashboard', DashboardController.show);

routes.post('/user/list',upload.single('foto'), Service.store);
routes.get('/spots', Service.index);
routes.get('/all', Service.getAll);//Listagem de todos os serviços

routes.get('/list/depil',Service.indexDepil);
routes.get('/list/manicure',Service.indexManicure);
routes.get('/list/barba', Service.indexBarba);
routes.get('/list/cortes', Service.indexCorte);

routes.get('/listAll', Service.indexSobrancelha);
routes.delete('/delete/service/:id', Service.delete);
routes.put('/update/service/:id', Service.update);
routes.put('/done/:id', Service.done);

routes.get('/service/:id', Service.show);
//ROTA SERVIÇOS
routes.get('/spots/servicos', Service.listServico);



//ROTAS DE BUSCA

routes.post('/search',SearchController.store );


//ROTAS TIPOS DE SERVIÇOS
/*
routes.post('/tipos/servicos', TiposController.store);
routes.get('tipo/index', TiposController.index);
*/

//************************************************************ */

//ROTAS SERVIÇOS

routes.post('/service/register',upload.single('foto'), _product.post);

routes.put('/service/register/:id', _product.put);

routes.get('/service/showservices', _product.get);

routes.get('/service/:id', _product.getById);

routes.delete('/service/deleteservice/:id', _product.delete);

//ROTAS BOOKING

routes.post('/service/:id/bookings', BookingController.store);
routes.get('/bookings', BookingController.getAll);

//SOLICITAÇÃO DE RESERVA
routes.post('/bookings/:booking_id/rejections', RejectionController.store);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);


//ROTAS DO ADMIN
routes.get('/admin/showpartners',auth, _partner.get); //exibindo parceiros
routes.get('/admin/showusers',auth, _user.get); //exibindo clientes


//ROTAS DO PARCEIRO
routes.post('/authentification', _partner.authentification);
routes.post('/partner/register', _partner.post); //criando um usuário de Parceiro
routes.put('/partner/register/:id',auth, _partner.put); //atualizando informações
routes.get('/partner/:id',auth, _partner.getById);//pegando um único parceiro
routes.delete('/partner/deletepartner/:id',auth, _partner.delete);//deletando algum parceiro
//produtos parceiro
routes.post('/partner/service/registrationservice',auth, _product.post);
routes.get('/partner/service/index',auth, DashboardController.show);
routes.put('/partner/service/:id',auth, _product.put);
routes.delete('/partner/service/delete/:id', auth, _product.delete);
routes.get('/partner/service/showuservices', DashboardController.getAll);


module.exports = routes;