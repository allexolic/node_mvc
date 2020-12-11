var express=require('express');
var routes= express.Router();
var controllers= require('../controllers');



//home page routes
routes.get('/',controllers.homeController.index);

//usuario routes
routes.get('/usuario',controllers.usuarioController.index);
routes.get('/usuario/add',controllers.usuarioController.add);
routes.post('/usuario/add',controllers.usuarioController.save);
routes.get('/usuario/edit/(:usuarioId)',controllers.usuarioController.edit);
routes.post('/usuario/edit/(:usuarioId)',controllers.usuarioController.update);

//pessoa routes
routes.get('/pessoa',controllers.pessoaController.index);
routes.get('/pessoa/add',controllers.pessoaController.add);
routes.post('/pessoa/add',controllers.pessoaController.save);
routes.post('/pessoa/view',controllers.pessoaController.pessoaDetail);
routes.get('/pessoa/edit/(:pessoaId)',controllers.pessoaController.edit);
routes.post('/pessoa/edit/(:pessoaId)', controllers.pessoaController.update);

//Fabricante routes
routes.get('/fabricante',controllers.fabricanteController.index);
routes.get('/fabricante/add',controllers.fabricanteController.add);
routes.post('/fabricante/add',controllers.fabricanteController.save);
routes.get('/fabricante/edit/(:fabricanteId)', controllers.fabricanteController.edit);
routes.post('/fabricante/edit/(:fabricanteId)', controllers.fabricanteController.update);

//Estabelecimento routes
routes.get('/estabelecimento',controllers.estabelecimentoController.index);
routes.get('/estabelecimento/add',controllers.estabelecimentoController.add);
routes.post('/estabelecimento/add', controllers.estabelecimentoController.save);
routes.get('/estabelecimento/edit/(:estabelecimentoId)', controllers.estabelecimentoController.edit);
routes.post('/estabelecimento/edit/(:estabelecimentoId)', controllers.estabelecimentoController.update);
//routes.post('/estabelecimento/view', controllers.estabelecimentoController.estabelecimentoDetail);

//Compra routes
routes.get('/compra',controllers.compraController.index);
routes.get('/compra/add', controllers.compraController.add);
routes.post('/compra/add',controllers.compraController.save);
routes.post('/compra/view',controllers.compraController.compraDetail);
routes.get('/compra/edit/(:compraId)', controllers.compraController.edit);

module.exports=routes;