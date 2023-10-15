/*********************************************************************************************
* Objetivo: Responsável pela regra de negócios referente ao crud de endereco
* Data : 31/08/2023
* Autor: Felipe Graciano and Luiz Gustavo
* Versão : 1.0
*********************************************************************************************/

const message = require('./modulo/config.js')
const usuarioDAO = require('../model/DAO/usuarioDAO.js')
const crypto = require('crypto')
const mailer = require('./modulo/mailer')
const moment = require('moment')


const ctlEsqueciSenha = async (email) => {

    if (
        email == '' || email == null || email == undefined || email.length > 255
    ) {
        return message.ERROR_REQUIRE_FIELDS
    }else{
        const user = await usuarioDAO.selectByEmail(email)

        if(!user){
            return message.ERROR_INVALID_EMAIL_TOKEN
        }else{

            let id = user[0].id

            const token = crypto.randomInt(1000, 9999)

            const now = moment().add(10, 'minutes').format("YYYY-MM-DD HH:mm:ss")

            await usuarioDAO.mdlUpdateForgotPasswordUsuario(token, now, id)

            let returnFunction = mailer.transport.sendMail({
                to: email,
                from: 'aviculturasilsan@gmail.com',
                replyTo: 'aviculturasilsan@gmail.com',
                subject: 'Recuperação de conta',
                template: 'forgotPassword',
                context: { token }
            }).then(info => {
                info.status = 200;
                info.email = email 
                info.token = token
                info.id = id
            
                return info
            }).catch(error => {
                return error
            })

            return returnFunction
        }
    }
}

const ctlValidarToken = async (dados) => {
    let returnFunction;

    if (
        dados.email == null || dados.email == undefined || dados.email.lenth > 255 ||
        dados.token == null || dados.token == undefined || isNaN(dados.token)
    ) {
        returnFunction = message.ERROR_REQUIRE_FIELDS
    } else {
        let checkEmail = await usuarioDAO.selectByEmail(dados.email)

        if (checkEmail.length > 0) {
            const now = moment().format("HH:mm")
            const token_expiress = moment(checkEmail[0].senha_reset_expiracao).add(3, 'hours').format("HH:mm:ss")

            if (!checkEmail) {
                returnFunction = message.ERROR_INVALID_EMAIL
            } else if (checkEmail[0].senha_reset_token != dados.token) {
                returnFunction = message.ERROR_INVALID_TOKEN
            } else if (checkEmail[0].senha_reset_token == dados.token && now < token_expiress) {
                message.SUCCESS_VALID_TOKEN.id = checkEmail[0].id
                returnFunction = message.SUCCESS_VALID_TOKEN
            } else if (now > token_expiress) {
                returnFunction = message.ERROR_TOKEN_EXPIRADO
            } else {
                returnFunction = message.ERROR_INTERNAL_SERVER
            }
        }else{
            returnFunction = message.ERROR_REGISTER_NOT_FOUND
        }
    }

    await usuarioDAO.mdlUpdateForgotPasswordUsuario(null, null, id)
    return returnFunction
}

const ctlAterarSenha = async (dados) => {

    if (
        dados.id == null || dados.id == undefined || isNaN(dados.id) ||
        dados.password == null || dados.password == undefined || dados.password > 256
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultStatus = await usuarioDAO.mdlAlterPassword(dados.id, dados.password)

        if (resultStatus) {

            let dadosUsuario = await usuarioDAO.mdlSelectUsuarioByID(dados.id)

            let dadosEnderecoUsuarioJSON = {
                status: message.SUCCESS_UPDATED_ITEM.status,
                message: message.SUCCESS_UPDATED_ITEM.message,
                usuario: dadosUsuario
            }

            return dadosEnderecoUsuarioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }

}


module.exports = {
    ctlEsqueciSenha,
    ctlValidarToken,
    ctlAterarSenha
}