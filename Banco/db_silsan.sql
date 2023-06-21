create database db_avicultura_silsan;

use db_avicultura_silsan;

-- ----------------------------- CREATES ----------------------------- --

# TBL_STATUS_USUARIO
create table tbl_status_usuario(
	id int not null auto_increment primary key,
    nivel varchar(20) not null
);

# TBL_USUARIO
create table tbl_usuario(
	id int not null auto_increment primary key,
    email varchar(255) not null,
    senha varchar(270) not null,
    id_status_usuario int not null,
    
    constraint FK_StatusUsuario_Usuario
    foreign key (id_status_usuario)
    references tbl_status_usuario(id),
    
    unique index (id)
);

# TBL_CLIENTE
create table tbl_cliente(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
	telefone varchar(15) not null,
    data_nascimento date not null,
    status_cliente bit not null default 1,
    id_usuario int not null,
    
    constraint FK_Usuario_Cliente
    foreign key (id_usuario)
    references tbl_usuario(id),
    
    unique index (id)
);

# TBL_LOJISTA
create table tbl_lojista(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
	telefone varchar(15) not null,
    status_lojista bit not null default 1,
    id_usuario int not null,
    
    constraint FK_Usuario_Lojista
    foreign key (id_usuario)
    references tbl_usuario(id),
    
    unique index (id)
);

# TBL_TIPO_PRODUTO
create table tbl_tipo_produto(
	id int not null auto_increment primary key,
    nome varchar(60) not null
);

# TBL_PRODUTO
create table tbl_produto(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    descricao text not null,
    peso int not null,
    cupom varchar(15) not null,
    url text not null,
    preco_original decimal(7,2) not null,
    preco_desconto decimal(7,2) not null,
    status_produto bit not null default 1,
    id_tipo_produto int not null,
    
    constraint FK_TipoProduto_Produto
    foreign key (id_tipo_produto)
    references tbl_tipo_produto(id),
    
    unique index(id)
);

-- ----------------------------- INSERTS ----------------------------- --
#Status Usuario
insert into tbl_status_usuario(nivel)values('Administrador'), ('Lojista'), ('Cliente'); -- Insert dos tipos de usuario do sistema--

#Usuario
insert into tbl_usuario (email, senha, id_status_usuario) values ('root', 'silsan1234', 1); -- Usuario de adm --
insert into tbl_usuario (email, senha, id_status_usuario) values ('vitor@lojista.com', 'lojista1234', 2); -- Usuario do Lojista Vitor --
insert into tbl_usuario (email, senha, id_status_usuario) values ('bernardo@lojista.com', 'lojista1234', 2); -- Usuario do Lojista Bernardo --
insert into tbl_usuario (email, senha, id_status_usuario) values ('gabriel@cliente.com', 'cliente1234', 3); -- Usuario do Cliente Gabriel --
insert into tbl_usuario (email, senha, id_status_usuario) values ('renan@cliente.com', 'cliente1234', 3); -- Usuario do Cliente Renan --

#Cliente
insert into tbl_cliente(
	nome, 
    telefone, 
    data_nascimento, 
    id_usuario
) values (
	'Gabriel Straioto',
    '11940028922',
    '2005-11-13',
    4
);
insert into tbl_cliente(
	nome, 
    telefone, 
    data_nascimento, 
    id_usuario
) values (
	'Renan Yuuji',
    '11989224002',
    '2005-11-18',
    5
);

#Lojista
insert into tbl_lojista(
	nome, 
    telefone, 
    id_usuario
) values (
	'Vitor Straioto',
    '11912345678',
    2
);
insert into tbl_lojista(
	nome, 
    telefone, 
    id_usuario
) values (
	'Bernardo Santos',
    '11987654321',
    3
);

-- ----------------------------- SELECTS ----------------------------- --
#StatusUsuario
select * from tbl_status_usuario;

#Usuario
select * from tbl_usuario;
select usuario.id,
	   usuario.email, 
       usuario.senha,
       usuario.id_status_usuario, 
       status_usuario.nivel 
from tbl_usuario as usuario 
	   inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id order by usuario.id asc; -- Usuario x StatusUsuario --
            
#Cliente
select * from tbl_cliente;
select 
	cliente.id as id_cliente,
    cliente.nome,
    cliente.telefone,
    date_format(cliente.data_nascimento, '%Y-%m-%d') as data_nascimento, 
    cliente.id_usuario,
    usuario.email,
    status_usuario.nivel
from tbl_cliente as cliente
	inner join tbl_usuario as usuario 
		on cliente.id_usuario = usuario.id
	inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id;
            
#Lojista
select *from tbl_lojista;
select 
	lojista.id as id_lojista,
    lojista.nome,
    lojista.telefone,
    lojista.id_usuario,
    usuario.email,
    status_usuario.nivel
from tbl_lojista as lojista
	inner join tbl_usuario as usuario 
		on lojista.id_usuario = usuario.id
	inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id;
            
            
            
            
            




