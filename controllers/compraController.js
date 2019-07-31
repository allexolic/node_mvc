var compraModel = require('../models/compraModel');
var estabelecimentoModel= require('../models/estabelecimentoModel');
const dateFormat = require('dateformat');

var compraController = function(){}

compraController.index = function (req, res, next){
    compraModel.getAllCompra(function(err,compras){
        if(err){
            throw err;

        }else{
            res.render('compra/index', {title: 'Lista de compras realizadas', compras: compras});
        }
    });
}

compraController.add = function(req, res, next){
    estabelecimentoModel.getAllEstabelecimento(function(err, estabelecimentos){
        res.render('compra/add',{title: 'Adicionar Compra', estabelecimentos: estabelecimentos});
    });
}

compraController.save = function(req, res,next){
    req.assert('estabelecimento','Selecione o estabelecimento.').notEmpty();
    req.assert('dtCompra','Informe a data de compra').notEmpty();

    var errors = req.validationErrors();

    if (!errors){
        var newCompra = {

          estabelecimentoId: req.sanitize('estabelecimento').escape().trim(),
          dtCompra:  req.sanitize('dtCompra').trim() 
        }

        
        compraModel.insertCompra(newCompra, function(err){
            if(err){
                req.flash('error','Erro ao inserir compra');
               console.log(err)
                
            }else{
                req.flash('success','Compra registrada com sucesso');
            }
            res.redirect('/compra');
        });
    }else{
        var err_msg = "";
        errors.forEach(function(err){
            err_msg += err.msg + "<br/>";
            
        })
        estabelecimentoModel.getAllEstabelecimento(function(err,estabelecimentos){
            req.flash('error',err_msg);
            res.render('compra/add',{title: 'Cadastrar Compra', estabelecimentos: estabelecimentos});
        });
    }
}

compraController.compraDetail = function (req, res){
    var compra_id = req.body.compra_id;
    var response={};

    compraModel.getCompraById(compra_id, function(result){
        if (result == null){
            response.status=0;
            response.data={};
            response.message="Nenhum registro encontrado";
        }else{
            response.status = 1;
            response.data=result;
            response.message="Compras";
        }
        res.send(JSON.stringify(response));
    })
}

module.exports = compraController;