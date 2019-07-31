use node_express;


Create table fabricante
(
	fabricanteId int(11) NOT NULL auto_increment,
    nmFabricante varchar(175) Not Null,
    nuCnpj       varchar(20),
    dtCadastro   datetime not null default current_timestamp,
    
    primary key(fabricanteId)
);

Select * From fabricante;

Create table estabelecimento
(
	estabelecimentoId int(11) NOT NULL auto_increment,
    nmEstabelecimento varchar(175) Not Null,
    dtCadastro   datetime not null default current_timestamp,
    
    primary key(estabelecimentoId)
);

Select * From estabelecimento;
drop table compra;
Create table compra
(
	compraId          int(11) NOT NULL auto_increment,
    dtCompra          varchar(10),
    estabelecimentoId int,
    dtCadastro        datetime not null default current_timestamp,
    
    primary key(compraId)
);

Select * From compra;


Select a.*, b.nmEstabelecimento From compra a left Join estabelecimento b on a.estabelecimentoId = b.estabelecimentoId;

insert into compra (dtCompra,estabelecimentoId)
Values(current_date(),1);


Create or replace view ListarCompras
as
Select a.compraId, str_to_date(dtCompra, '%d/%m/%Y')  as dtCompra, a.estabelecimentoId,
       b.nmEstabelecimento
  From compra a 
  left Join estabelecimento b 
    on a.estabelecimentoId = b.estabelecimentoId;
  
Select * From ListarCompras;

Drop procedure  `InserirCompra`;

DELIMITER $$
 
CREATE PROCEDURE `InserirCompra`(IN dtCompra date, IN estabelecimentoId int(11))
BEGIN
    Insert into compra (dtCompra, estabelecimentoId)
    Values (dtCompra, estabelecimentoId);
END$$
 
DELIMITER ;

call InserirCompra (current_date(),1);


Select * From Compra;

Set @dtCompra = current_date() , @estabelecimentoId = 1 ;

call InserirCompra (@dtCompra,@estabelecimentoId);


insert into compra (dtCompra,estabelecimentoId)
Values('31/07/2019',1);

Delete From compra Where compraId = '5';

Select * From ListarCompras;
Select * From ListarComprasRealizadas;


Create or replace view ListarComprasRealizadas
as
Select a.compraId,   left(dtCompra,10)dtCompra, a.estabelecimentoId,
       b.nmEstabelecimento
  From compra a 
  left Join estabelecimento b 
    on a.estabelecimentoId = b.estabelecimentoId;
  
Select * From ListarComprasRealizadas;
