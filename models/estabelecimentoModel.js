var sql=require('../db');

var estabelecimentoModel ={}

estabelecimentoModel.getAllEstabelecimento=function(result){
    sql.query("Select * from estabelecimento",function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

estabelecimentoModel.insertEstabelecimento=function(newEstabelecimento,result){
    sql.query("insert into estabelecimento set ?",newEstabelecimento,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}

estabelecimentoModel.findEstabelecimentoById=function(estabelecimentoId, result){
    sql.query("Select * from estabelecimento where estabelecimentoId ="+estabelecimentoId,function(err,rows){
        if(err)
            throw err;
        
        if (rows.length <= 0){
            return result(err);
        }
        else{
            return result(rows);
        }    
    })
}


estabelecimentoModel.updateEstabelecimento=function(estabelecimentoId,estabelecimento,result){
    sql.query("Update estabelecimento set ? where estabelecimentoId="+estabelecimentoId,estabelecimento,function(err,rows){
        if(err)
        result(err);

        return result(rows);
    });
}

module.exports = estabelecimentoModel;
