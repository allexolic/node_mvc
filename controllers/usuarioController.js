var usuarioModel= require('../models/usuarioModel');
var usuarioController=function(){}

usuarioController.index=function(req,res,next){
    usuarioModel.getAllUsuario(function(err,usuarios){
        if(err){
                throw err;
        }else{
            res.render('usuario/index',{title:'Lista de usuários',usuarios:usuarios});
        }
       
    });
}
usuarioController.add=function(req,res,next){
    res.render('usuario/add',{title:'Add Usuário'});
}
usuarioController.save=function(req,res){
    req.assert('nome', 'Nome é obrigatório.').notEmpty(); 
    req.assert('nmEmail', 'Email é obrigatório').notEmpty()      
 
    var errors = req.validationErrors();
    if( !errors ) {
        var newUsuario={
            nmUsuario:req.sanitize('nome').escape().trim(),
            nmEmail:req.sanitize('nmEmail').escape().trim(),
        }
        usuarioModel.insertUsuario(newUsuario,function(err){
            if(err){
                req.flash('error','Erro ao inserir usuário.');
        }else{
            req.flash('success','Usuário adicionado com sucesso!');
        }
        res.redirect('/usuario');
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.render('usuario/add',{title:'Add Usuário'});
    }
}
usuarioController.edit=function(req,res){
    var usuarioId=req.params.usuarioId;
    usuarioModel.findUsuarioById(usuarioId,function(result){
        if(result==null){
            req.flash('error','Usuário não existe!');
            res.redirect('/usuario');
        }else{
          res.render('usuario/edit',{title:'Edit Usuário',usuario:result});
        }
    })
}

usuarioController.update=function(req,res){
    var usuarioId=req.params.usuarioId;
    req.assert('nome', 'Nome é obrigatório!').notEmpty(); 
    req.assert('nmEmail', 'Email é obrigatório!').notEmpty()      
    var errors = req.validationErrors();
    if( !errors ) {
        var usuario={
            nmUsuario:req.sanitize('nome').escape().trim(),
            nmEmail:req.sanitize('nmEmail').escape().trim(),
        }
        usuarioModel.updateUsuario(usuarioId,usuario,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Usuário atualizado com sucesso.');
                    res.redirect('/usuario');
                }else{
                    req.flash('error', 'Erro ao atualizar usuário.');
                    res.redirect('/usuario/edit/'+usuarioId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/usuario/edit/'+usuarioId);
    }
}


module.exports=usuarioController;