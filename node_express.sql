
use node_express;

Create table usuario
(
	usuarioId int(11) NOT NULL auto_increment,
    nmUsuario varchar(175) Not Null,
    nmEmail   varchar(50),
    dtCadastro   datetime not null default current_timestamp,
    
    primary key(usuarioId)
);

Create table fabricante
(
	fabricanteId int(11) NOT NULL auto_increment,
    nmFabricante varchar(175) Not Null,
    nuCnpj       varchar(20),
    dtCadastro   datetime not null default current_timestamp,
    
    primary key(fabricanteId)
);


Create table estabelecimento
(
	estabelecimentoId int(11) NOT NULL auto_increment,
    nmEstabelecimento varchar(175) Not Null,
    dtCadastro   datetime not null default current_timestamp,
    
    primary key(estabelecimentoId)
);



Create table compra
(
	compraId          int(11) NOT NULL auto_increment,
    dtCompra          datetime,
    estabelecimentoId int,
    dtCadastro        datetime not null default current_timestamp,
    
    primary key(compraId)
);

Create table pessoa
(
	pessoaId     int(11) NOT NULL auto_increment,
    nmPessoa     varchar(175) Not Null,
    dsImagem     varchar(100),
    usuarioId    int(11) not null,
    dtNascimento date default null,
    dtAdmissao   date default null,
    dtBaixa      date default null,
    dtCadastro   datetime not null default current_timestamp,
    
    primary key(pessoaId)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


