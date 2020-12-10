var sql= require('../db');

var usuarioModel={

}
usuarioModel.getAllUsuario=function(result){
    sql.query("SELECT * FROM usuario",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
usuarioModel.insertUsuario=function(newUsuario,result)
{
    sql.query("INSERT INTO usuario SET ?",newUsuario,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
usuarioModel.findUsuarioById=function(usuarioId,result){
    sql.query("SELECT * FROM usuario WHERE usuarioId ="+usuarioId,function(err,rows){
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

usuarioModel.updateUsuario=function(usuarioId,usuario,result){
    sql.query("UPDATE usuario SET  ? WHERE usuarioId="+usuarioId,usuario,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=usuarioModel;