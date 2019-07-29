var sql= require('../db');

var fabricanteModel={

}
fabricanteModel.getAllFabricante=function(result){
    sql.query("SELECT * FROM fabricante",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
fabricanteModel.insertFabricante=function(newFabricante,result)
{
    sql.query("INSERT INTO fabricante SET ?",newFabricante,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
fabricanteModel.findFabricanteById=function(fabricanteId,result){
    sql.query("SELECT * FROM fabricante WHERE fabricanteId ="+fabricanteId,function(err,rows){
        if(err)
            throw err;
      
        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }   
    })
}

fabricanteModel.updateFabricante=function(fabricanteId,fabricante,result){
    sql.query("UPDATE fabricante SET  ? WHERE fabricanteId="+fabricanteId,fabricante,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=fabricanteModel;