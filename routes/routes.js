var express=require('express');
var routes= express.Router();
var controllers= require('../controllers');



//home page routes
routes.get('/',controllers.homeController.index);

//company routes
routes.get('/company',controllers.companyController.index);
routes.get('/company/add',controllers.companyController.add);
routes.post('/company/add',controllers.companyController.save);
routes.get('/company/edit/(:id)',controllers.companyController.edit);
routes.post('/company/edit/(:id)',controllers.companyController.update);

//employee routes
routes.get('/employee',controllers.employeeController.index);
routes.get('/employee/add',controllers.employeeController.add);
routes.post('/employee/add',controllers.employeeController.save);
routes.post('/employee/view',controllers.employeeController.employeeDetail);
routes.get('/employee/edit/(:employee_id)',controllers.employeeController.edit);

//Fabricante routes
routes.get('/fabricante',controllers.fabricanteController.index);
routes.get('/fabricante/add',controllers.fabricanteController.add);
routes.post('/fabricante/add',controllers.fabricanteController.save);

//Estabelecimento routes
routes.get('/estabelecimento',controllers.estabelecimentoController.index);
routes.get('/estabelecimento/add',controllers.estabelecimentoController.add);
routes.post('/estabelecimento/add', controllers.estabelecimentoController.save);
//routes.post('/estabelecimento/view', controllers.estabelecimentoController.estabelecimentoDetail);

//Compra routes
routes.get('/compra',controllers.compraController.index);
routes.get('/compra/add', controllers.compraController.add);
routes.post('/compra/save',controllers.compraController.save);
//routes.post('/compra/view',controlles.compraController.compraDetail);

module.exports=routes;