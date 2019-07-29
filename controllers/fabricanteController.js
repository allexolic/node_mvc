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
    var fabricanteId=req.params.id;
    fabricanteModel.findFabricanteById(fabricanteId,function(result){
        if(result==null){
            req.flash('error','Sorry the company doesnot exists!!');
            res.redirect('/company');
        }else{
          res.render('fabricante/edit',{title:'Edit Fabricante',fabricante:result});
        }
    })
}

fabricanteController.update=function(req,res){
    var fabricanteId=req.params.id;
    req.assert('name', 'Name is required').notEmpty(); 
    req.assert('location', 'Location is required').notEmpty()      
    var errors = req.validationErrors();
    if( !errors ) {
        var fabricante={
            name:req.sanitize('name').escape().trim(),
            location:req.sanitize('location').escape().trim(),
        }
        fabricanteModel.updateFabricante(fabricanteId,fabricante,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Company Information update successfully.');
                    res.redirect('/fabricante');
                }else{
                    req.flash('error', 'There was error in updating company.');
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