var pessoaModel = require('../models/pessoaModel');
var usuarioModel = require('../models/usuarioModel');
const dateFormat = require('dateformat');

var pessoaController = function () {


}


pessoaController.index = function (req, res, next) {
    pessoaModel.getAllPessoas(function (err, pessoas) {
        if (err) {
            throw err;
        } else {
            res.render('pessoa/index', { title: 'Lista de pessoas', pessoas: pessoas });
        }
    });

}
pessoaController.add = function (req, res, next) {
    usuarioModel.getAllUsuario(function (err, usuarios) {
        res.render('pessoa/add', { title: 'Add Pessoa', usuarios: usuarios });
    });

}
pessoaController.save = function (req, res, next) {
    req.assert('nome', 'Nome é obrigatório.').notEmpty();
    req.assert('usuario', 'Usuário deve ser selecionado.').notEmpty();
    req.assert('dtNascimento', 'Data de nascimento deve ser informada.').notEmpty();
    req.assert('dtAdmissao', 'Data admissão deve ser informada.').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        var newPessoa = {
            nmPessoa: req.sanitize('nome').escape().trim(),
            dsImagem: 'dsImagem.png',            
            usuarioId: req.sanitize('usuario').escape().trim(),
            dtNascimento: dateFormat(req.sanitize('dtNascimento').trim(), 'yyyy-mm-dd'),
            dtAdmissao: dateFormat(req.sanitize('dtAdmissao').trim(), 'yyyy-mm-dd')
        }
        pessoaModel.insertPessoa(newPessoa, function (err) {
            if (err) {
                req.flash('error', 'Erro ao inserir pessoa.');
            } else {
                req.flash('success', 'Pessoa adicionada com sucesso!');
            }
            res.redirect('/pessoa');
        });
    } else {
        var err_msg = "";
        errors.forEach(function (err) {
            err_msg += err.msg + "<br/>";
        })
        usuarioModel.getAllUsuario(function (err, usuarios) {
            req.flash('error', err_msg);
            res.render('pessoa/add', { title: 'Add Pessoa', usuarios: usuarios });
        });
    }
}
pessoaController.pessoaDetail = function (req, res) {
    var pessoaId = req.body.pessoaId;
    var response={};
    pessoaModel.getPessoaById(pessoaId, function (result) {
        if (result == null) {
            response.status=0;
            response.data={};
            response.message="Nenhum detalhe para exibir";
        } else {
            response.status=1;
            response.data=result;
            response.message="Pessoa encontrada.";
        }
        res.send(JSON.stringify(response));
    })
}
pessoaController.edit = function(req,res){
    var pessoaId = req.params.pessoaId;
    pessoaModel.getPessoaById(pessoaId,function(result){
    if(result==null){
        req.flash('error','Pessoa não encontrada!!');
        res.redirect('/pessoa');
    }else{
        usuarioModel.getAllUsuario(function(err,usuarios){
            res.render('pessoa/edit',{title: 'Edit Pessoa',usuarios:usuarios,pessoa:result[0]});
        });
    }
   });
}

pessoaController.update=function(req,res){
    var pessoaId=req.params.pessoaId;
    req.assert('nome', 'Nome é obrigatório.').notEmpty();
    req.assert('usuario', 'Usuário deve ser selecionado.').notEmpty();
    req.assert('dtNascimento', 'Data de nascimento deve ser informada.').notEmpty();
    req.assert('dtAdmissao', 'Data admissão deve ser informada.').notEmpty();  
    var errors = req.validationErrors();
    if( !errors ) {
        var pessoa={
            nmPessoa: req.sanitize('nome').escape().trim(),
            dsImagem: 'dsImagem.png',            
            usuarioId: req.sanitize('usuario').escape().trim(),
            dtNascimento: dateFormat(req.sanitize('dtNascimento').trim(), 'yyyy-mm-dd'),
            dtAdmissao: dateFormat(req.sanitize('dtAdmissao').trim(), 'yyyy-mm-dd')
        }
        pessoaModel.updatePessoa(pessoaId,pessoa,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Pessoa atualizado com sucesso.');
                    res.redirect('/pessoa');
                }else{
                    req.flash('error', 'Erro ao atualizar pessoa.');
                    res.redirect('/pessoa/edit/'+pessoaId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/pessoa/edit/'+pessoaId);
    }
}

module.exports = pessoaController;