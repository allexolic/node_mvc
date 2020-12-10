var sql= require('../db');

var pessoaModel=function(){}

pessoaModel.insertPessoa=function(newPessoa,result){
    sql.query("INSERT into pessoa SET  ?",newPessoa,function(err,res,field){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
   
}
pessoaModel.getAllPessoas=function(result){
    sql.query("SELECT * FROM  `pessoa`",function(err, rows, fields){
        if(err){
            return result(err,null);
        }else{
            return result(null,rows);
        }
    });
}
pessoaModel.getPessoaById=function(pessoaId,result){
    sql.query("SELECT pessoa.*,usuario.nmUsuario as usuario FROM pessoa LEFT JOIN usuario ON usuario.usuarioId=pessoa.usuarioId WHERE pessoa.pessoaId="+pessoaId,function(err,rows){
        if(err)
            return result(err);

        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }  
    });
}

pessoaModel.updatePessoa=function(pessoaId,pessoa,result){
    sql.query("UPDATE pessoa SET  ? WHERE pessoaId="+pessoaId,pessoa,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=pessoaModel;