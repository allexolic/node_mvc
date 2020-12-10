var fabricanteModel= require('../models/fabricanteModel');
var fabricanteController=function(){}

fabricanteController.index=function(req,res,next){
    fabricanteModel.getAllFabricante(function(err,fabricantes){
        if(err){
                throw err;
        }else{
            res.render('fabricante/index',{title:'Listar Fabricantes',fabricantes:fabricantes});
        }
       
    });
}
fabricanteController.add=function(req,res,next){
    res.render('fabricante/add',{title:'Fabricante'});
}
fabricanteController.save=function(req,res){
    req.assert('nomefab', 'Informe o nome do fabricante!').notEmpty(); 
     
    var errors = req.validationErrors();
    if( !errors ) {
        var newTask={
            nmFabricante:req.sanitize('nomefab').escape().trim(),
            nuCnpj:req.sanitize('nucnpj').escape().trim(),
        }
        fabricanteModel.insertFabricante(newTask,function(err){
            if(err){
                req.flash('error','There was error in inserting data');
        }else{
            req.flash('success','Fabricante adicionado com sucesso');
        }
        res.redirect('/fabricante');
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.render('fabricante/add',{title:'Add Fabricante'});
    }
}
fabricanteController.edit=function(req,res){
    var fabricanteId=req.params.fabricanteId;
    fabricanteModel.findFabricanteById(fabricanteId,function(result){
        if(result==null){
            req.flash('error','Fabricante não existe!!');
            res.redirect('/fabricante');
        }else{
          res.render('fabricante/edit',{title:'Edit Fabricante',fabricante:result});
        }
    })
}

fabricanteController.update=function(req,res){
    var fabricanteId=req.params.fabricanteId;
    req.assert('nomefab', 'Nome é obrigatório').notEmpty(); 
    req.assert('nucnpj', 'CNPJ é obrigatório').notEmpty()      
    var errors = req.validationErrors();
    if( !errors ) {
        var fabricante={
            nmFabricante:req.sanitize('nomefab').escape().trim(),
            nuCnpj:req.sanitize('nucnpj').escape().trim(),
        }
        fabricanteModel.updateFabricante(fabricanteId,fabricante,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Fabricante atualizado com sucesso.');
                    res.redirect('/fabricante');
                }else{
                    req.flash('error', 'Erro ao atualizar fabricante.');
                    res.redirect('/fabricante/edit/'+fabricanteId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/fabricante/edit/'+fabricanteId);
    }
}


module.exports=fabricanteController;