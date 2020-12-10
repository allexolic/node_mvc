var estabelecimentoModel= require('../models/estabelecimentoModel');
var estabelecimentoController=function(){}

estabelecimentoController.index=function(req,res,next){
    estabelecimentoModel.getAllEstabelecimento(function(err,estabelecimentos){
        if(err){
                throw err;
        }else{
            res.render('estabelecimento/index',{title:'Lista estabelecimentos',estabelecimentos:estabelecimentos});
        }
       
    });
}
estabelecimentoController.add=function(req,res,next){
    res.render('estabelecimento/add',{title:'Add estabelecimento'});
}
estabelecimentoController.save=function(req,res){
    req.assert('nome', 'Name is required').notEmpty(); 
   
 
    var errors = req.validationErrors();
    if( !errors ) {
        var newTask={
            nmEstabelecimento:req.sanitize('nome').escape().trim(),
           
        }
        estabelecimentoModel.insertEstabelecimento(newTask,function(err){
            if(err){
                req.flash('error','Erro ao adicionar registro.');
        }else{
            req.flash('success','Estabelecimento adicionado com sucesso!');
        }
        res.redirect('/estabelecimento');
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.render('estabelecimento/add',{title:'Add estabelecimento'});
    }
}
estabelecimentoController.edit=function(req,res){
    var estabelecimentoId=req.params.estabelecimentoId;
    estabelecimentoModel.findEstabelecimentoById(estabelecimentoId,function(result){
        if(result==null){
            req.flash('error','Estabelecimento não existe!!');
            res.redirect('/estabelecimento');
        }else{
          res.render('estabelecimento/edit',{title:'Edit estabelecimento',estabelecimento:result});
        }
    })
}

estabelecimentoController.update=function(req,res){
    var estabelecimentoId=req.params.estabelecimentoId;
    req.assert('nome', 'Nome é obrigatório.').notEmpty(); 
        
    var errors = req.validationErrors();
    if( !errors ) {
        var estabelecimento={
            nmEstabelecimento:req.sanitize('nome').escape().trim(),
          
        }
        estabelecimentoModel.updateEstabelecimento(estabelecimentoId,estabelecimento,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Estabelecimento atualizado com sucesso.');
                    res.redirect('/estabelecimento');
                }else{
                    req.flash('error', 'Erro ao atualizar registro.');
                    res.redirect('/estabelecimento/edit/'+estabelecimentoId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/estabelecimento/edit/'+ estabelecimentoId);
    }
}


module.exports=estabelecimentoController;