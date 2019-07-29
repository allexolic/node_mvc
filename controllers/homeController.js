var homeController=function(){}

homeController.index=function(req,res){
    req.flash('success', 'Gestor Financeiro')
    res.render('home/index',{title:'Exibir gráficos'});
}

module.exports=homeController