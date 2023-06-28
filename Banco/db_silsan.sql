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
    peso double not null,
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
insert into tbl_usuario (email, senha, id_status_usuario) values ('root@adm.com', 'silsan1234', 1); -- Usuario de adm --
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

#TipoProduto
insert into tbl_tipo_produto(nome) values ('Cachorros'), ('Gatos'), ('Aves');

#Produto
insert into tbl_produto(
	nome,
    descricao,
    peso,
    cupom,
    url,
    preco_original,
    preco_desconto,
    id_tipo_produto
)values(
	'Ração Golden Special para Cães Adultos Frango e Carne',
    'Preparada com nobres ingredientes, a Ração Golden Special para Cães Adultos Frango e Carne é o alimento ideal para manter o seu cão saudável. Além de render mais por quilograma, ela é livre de corantes e aromatizantes artificiais, proporcionando uma dieta mais balanceada.',
    15,
    'BDGC15',
    'https://cobasi.vteximg.com.br/arquivos/ids/939251-400-400/racao-golden-special-para-caes-adultos-frango-e-carne-3310549-15kg-Lado.jpg?v=638122446361370000',
    149.99,
    129.99,
    1
);
insert into tbl_produto(
	nome,
    descricao,
    peso,
    cupom,
    url,
    preco_original,
    preco_desconto,
    id_tipo_produto
)values(
	'Ração GranPlus Choice Gatos Adultos Frango e Carne',
    'A Ração GranPlus Choice Gatos Adultos Frango e Carne é o alimento ideal para o seu pet. Produzido com ingredientes nobres e ricos em vitaminas, essa é a sugestão perfeita para estimular o seu animal de estimação a ter uma rotina mais ativa e saudável.',
    10.1,
    'GATO24',
    'https://cobasi.vteximg.com.br/arquivos/ids/1038013-400-400/Choice-Gatos-Adultos-Frango-e-Carne-Frente.jpg?v=638066453440670000',
    139.99,
    109.99,
    2
);
insert into tbl_produto(
	nome,
    descricao,
    peso,
    cupom,
    url,
    preco_original,
    preco_desconto,
    id_tipo_produto
)values(
	'Ração Pedigree Nutrição Essencial Carne para Cães Adultos',
    'Para garantir que nossos peludinhos tenham uma vida longa e saudável, é necessário oferecer alimentos com os nutrientes essenciais para o organismo deles. Por este motivo, foi desenvolvida a ração Pedigree Nutrição Essencial, uma refeição balanceada e completa.',
    15,
    'CAHC15',
    'https://images.petz.com.br/fotos/1663617053912.jpg',
    155.99,
    125.99,
    1
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
            
#TipoProduto
select tipo_produto.id, tipo_produto.nome as tipo from tbl_tipo_produto as tipo_produto;

#Produto
select * from tbl_produto;
select 
	    produto.id, 
        produto.nome as nome_produto, 
        produto.descricao as descricao_produto, 
        produto.peso as peso_produto,
        produto.cupom as cupom_produto,
        produto.url as url_produto,
        produto.status_produto,
        produto.id_tipo_produto,
        tipo_produto.nome as tipo_produto
    from tbl_produto as produto
	    inner join tbl_tipo_produto as tipo_produto
    		on produto.id_tipo_produto = tipo_produto.id;
            

########## PROCEDURE PARA INSERT ##########

# PROCEDURE USUARIO_CLIENTE
DELIMITER //
create procedure sp_inserir_cliente_usuario(
    in email_usuario varchar(255),
    in senha_usuario varchar(270),
    in nome_cliente varchar(80),
	in telefone_cliente varchar(15),
    in data_nascimento_cliente date
)
begin
    declare id_usuario_cliente int;

    -- Inserir dados na tabela tbl_usuario
    insert into tbl_usuario (email, senha, status_usuario)
    values (email_usuario, senha_usuario, 3);
    
    -- Obter o ID do usuario inserido
    set id_usuario_cliente = LAST_INSERT_ID();

    -- Inserir dados na tabela tbl_cliente
    insert into tbl_usuario (nome, telefone, data_nascimento, id_usuario)
    values (nome_cliente, telefone_cliente, data_nascimento_cliente, id_usuario_cliente);
end //
DELIMITER ;

# PROCEDURE USUARIO_LOJISTA
DELIMITER //
create procedure sp_inserir_lojista_usuario(
    in email_usuario varchar(255),
    in senha_usuario varchar(270),
    in nome_lojista varchar(80),
	in telefone_lojista varchar(15)
)
begin
    declare id_usuario_lojista int;

    -- Inserir dados na tabela tbl_usuario
    insert into tbl_usuario (email, senha, status_usuario)
    values (email_usuario, senha_usuario, 3);
    
    -- Obter o ID do usuario inserido
    set id_usuario_lojista = LAST_INSERT_ID();

    -- Inserir dados na tabela tbl_cliente
    insert into tbl_lojista (nome, telefone, id_usuario)
    values (nome_lojista, telefone_lojista, id_usuario_lojista );
end //
DELIMITER ;













