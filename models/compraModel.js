var sql= require('../db');

var compraModel = function(){}

compraModel.insertCompra= function(newCompra, result){
    sql.query("INSERT into compra SET  ?",  newCompra, function(err,res,field){
        if(err){
            return result(err,null);
            
        }else{
            return result(null,res);
                       
        }
    });
}

compraModel.getAllCompra=function(result){
    sql.query("Select * From ListarCompras", function(err,rows,fields){
        if(err){
            return result(err,null);
        }else{
            return result(null,rows);
        }
    });
}

compraModel.getCompraById=function(compra_id,result){
    sql.query("Select * From ListarComprasRealizadas Where compraId ="+compra_id,function(err,rows){
        if(err)
        return result (err,null);

        if (rows.length <= 0){
            return result(err);
        }else{
            return result(rows);
        }
    });
}

module.exports = compraModel;
