/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos USUARIO no Banco de Dados
 * Autor: Luiz Gustavo
 * Data: 20/06/2023
 * Versão: 1.0
************************************************************************************************/

/**
    //$queryRawUnsafe( ) -> Permite interpretar uma variavel como sendo um scriptSQL
    //$queryRaw( ) -> Esse executa o comando dentro de aspas e não podendo interpretar uma variavel
 */

/**
 * Métodos com inicio 'ctl' são funções da controller
 * e
 * Métodos com inicio 'mdl' são funções da model
 */

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllUsuarios = async () => {
    let sql = `
    select usuario.id,
        usuario.email, 
        usuario.senha,
        usuario.id_status_usuario, 
        status_usuario.nivel 
    from tbl_usuario as usuario 
        inner join tbl_status_usuario as status_usuario 
            on usuario.id_status_usuario = status_usuario.id order by usuario.id asc;`

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0){
        return rsUsuario
    }else{
        return false
    }
}

const selectByEmail = async function (email_usuario) {
    let sqlEmail = `SELECT 
        tbl_usuario.id, 
        tbl_usuario.email, 
        tbl_usuario.senha_reset_token, 
        tbl_usuario.senha_reset_expiracao
    FROM tbl_usuario WHERE tbl_usuario.email = '${email_usuario}'`

    let resultCheck = await prisma.$queryRawUnsafe(sqlEmail)

    if (resultCheck.length > 0) {
        return resultCheck
    } else {
        return false
    }
}

const mdlSelectUsuarioByID = async (id) => {
    let sql = `select usuario.id,
        usuario.email, 
        usuario.senha,
        usuario.id_status_usuario, 
        status_usuario.nivel 
    from tbl_usuario as usuario 
        inner join tbl_status_usuario as status_usuario 
            on usuario.id_status_usuario = status_usuario.id where usuario.id = ${id};`

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0){
        return rsUsuario
    }else{
        return false
    }
}

const mdlSelectUsuarioByEmail = async (email) => {
    let sql = `select usuario.id,
    usuario.email, 
    usuario.senha,
    usuario.id_status_usuario, 
    status_usuario.nivel 
from tbl_usuario as usuario 
    inner join tbl_status_usuario as status_usuario 
        on usuario.id_status_usuario = status_usuario.id where usuario.email = '${email}';
    `

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0){
        return rsUsuario
    }else{
        return false
    }
}

const mdlSelectAllEmailUsuario = async () => {
    let sql = `select usuario.id,
        usuario.email, 
        usuario.id_status_usuario, 
        status_usuario.nivel 
    from tbl_usuario as usuario 
        inner join tbl_status_usuario as status_usuario 
            on usuario.id_status_usuario = status_usuario.id;
    `

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0){
        return rsUsuario
    }else{
        return false
    }
}

const mdlSelectUsuarioByEmailAndSenha = async (email, senha) => {
    let sql = `select usuario.id,
        usuario.email, 
        usuario.senha,
        usuario.status_usuario,
        usuario.id_status_usuario, 
        status_usuario.nivel 
    from tbl_usuario as usuario 
        inner join tbl_status_usuario as status_usuario 
            on usuario.id_status_usuario = status_usuario.id where usuario.email = '${email}' and usuario.senha = '${senha}';
    `

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0){
        return rsUsuario
    }else{
        return false
    }
}

const mdlSelectUsuarioByIdStatusUsuario = async (idStatusUsuario) => {
    let sql = `select usuario.id,
        usuario.email, 
        usuario.senha,
        usuario.id_status_usuario, 
        status_usuario.nivel 
    from tbl_usuario as usuario 
        inner join tbl_status_usuario as status_usuario 
            on usuario.id_status_usuario = status_usuario.id where usuario.id_status_usuario = ${idStatusUsuario};
    `

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0){
        return rsUsuario
    }else{
        return false
    }
}

const mdlSelectUsuarioByNivel = async (nivel) => {
    let sql = `select usuario.id,
        usuario.email, 
        usuario.senha,
        usuario.id_status_usuario, 
        status_usuario.nivel 
    from tbl_usuario as usuario 
        inner join tbl_status_usuario as status_usuario 
            on usuario.id_status_usuario = status_usuario.id where status_usuario.nivel = ${nivel};'
    `

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if(rsUsuario.length > 0){
        return rsUsuario
    }else{
        return false
    }
}

//Retorno o ultimo id inserido no banco de dados
const mdlSelectLastByID = async () => {
    let sql = `select usuario.id,
        usuario.email, 
        usuario.senha,
        usuario.id_status_usuario, 
        status_usuario.nivel 
    from tbl_usuario as usuario 
        inner join tbl_status_usuario as status_usuario 
            on usuario.id_status_usuario = status_usuario.id order by id desc limit 1;
    `

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0){
        return rsAluno
    }else{
        return false
    }
}


const mdlInsertUsuario = async (dadosUsuario) => {
    let sql = `insert into tbl_usuario(
        email,
        senha,
        id_status_usuario
        ) values (
            '${dadosUsuario.email}', 
            '${dadosUsuario.senha}', 
            ${dadosUsuario.id_status_usuario}
        );`

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)        

    if(resultStatus){
        return true
    }else{
        return false
    }
}

const mdlUpdateUsuario = async (dadosUsuario) => {
    let sql = `update tbl_usuario 
    set email = '${dadosUsuario.email}',
        senha = '${dadosUsuario.senha}',
        id_status_usuario = ${dadosUsuario.id_status_usuario}
    where id = ${dadosUsuario.id};
    `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)
    
    if(resultStatus){
        return true
    }else{
        return false
    }
}

const mdlTrocarSenhaUsuario = async (id, senha) => {
    let sql = `update tbl_usuario 
        set senha = '${senha}'
    where id = ${id};
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }

}

const mdlDesativarUsuario = async (id) => {
    let sql = `update tbl_usuario set 
            tbl_usuario.status_usuario = 0
        where tbl_usuario.id = ${id}
        `

    let resultStatus = await prisma.$queryRawUnsafe(sql)
    
    if(resultStatus){
        return true
    }else{
        return false
    }
}

const mdlUpdateForgotPasswordUsuario = async (passwordResetToken, passwordResetExpiress, id) => {
    let sql = `update tbl_usuario set 
            tbl_usuario.senha_reset_token = ${passwordResetToken},
            tbl_usuario.senha_reset_expiracao = '${passwordResetExpiress}'
        where tbl_usuario.id = ${id}
        `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}

const mdlAlterPassword = async (id, password) => {
    let sql = `update tbl_usuario set 
            tbl_usuario.senha = '${password}'
        where tbl_usuario.id = ${id}
        `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}



module.exports = {
    mdlSelectAllUsuarios,
    mdlSelectUsuarioByID,
    mdlSelectUsuarioByEmail,
    mdlSelectUsuarioByEmailAndSenha,
    mdlSelectUsuarioByNivel,
    mdlSelectLastByID,
    mdlSelectUsuarioByIdStatusUsuario,
    mdlSelectAllEmailUsuario,
    mdlInsertUsuario,
    mdlUpdateUsuario,
    mdlTrocarSenhaUsuario,
    mdlDesativarUsuario,

    selectByEmail,
    mdlUpdateForgotPasswordUsuario,
    mdlAlterPassword
}
