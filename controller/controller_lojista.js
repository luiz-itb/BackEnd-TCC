/************************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de LOJISTA
 * Autor: Luiz Gustavo
 * Data: 20/06/2023
 * Versão: 1.0
************************************************************************************************/

/**********************************************************
* Métodos com inicio 'ctl' são funcões do controller
* e
* Métodos com inicio 'mdl' são funcões do model
**********************************************************/

var message = require('./modulo/config.js')
var lojistaDao = require('../model/DAO/lojistaDAO.js')
var usuarioDAO = require('../model/DAO/usuarioDAO.js')

//Retorna todos os lojistas
const ctlGetLojistas = async () => {
    let dadosLojistasJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
    let dadosLojistas = await lojistaDao.mdlSelectAllLojista()

    if (dadosLojistas) {
        dadosLojistasJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosLojistas.length,
            lojistas: dadosLojistas
        }
        return dadosLojistasJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

const ctlGetLojistaID = async (id) => {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosLojistasJSON = {}

        //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
        let dadosLojista = await lojistaDao.mdlSelectLojistaId(id)

        if (dadosLojista) {
            dadosLojistasJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                lojistas: dadosLojista
            }
            return dadosLojistasJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlGetLojistaIdUsuario = async (idUsuario) => {
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosLojistasJSON = {}

        //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
        let dadosLojista = await lojistaDao.mdlSelectLojistaIdUsuario(idUsuario)

        if (dadosLojista) {
            dadosLojistasJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                lojistas: dadosLojista
            }
            return dadosLojistasJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlInserirLojistaUsuario = async (dadosLojistaUsuario) => {
    if (
        dadosLojistaUsuario.email_usuario == '' || dadosLojistaUsuario.email_usuario == undefined || dadosLojistaUsuario.email_usuario == null || dadosLojistaUsuario.email_usuario.length > 255 ||
        dadosLojistaUsuario.senha_usuario == '' || dadosLojistaUsuario.senha_usuario == undefined || dadosLojistaUsuario.senha_usuario == null || dadosLojistaUsuario.senha_usuario.length > 270 ||
        dadosLojistaUsuario.nome_lojista == '' || dadosLojistaUsuario.nome_lojista == undefined || dadosLojistaUsuario.nome_lojista == null || dadosLojistaUsuario.nome_lojista.length > 80 ||
        dadosLojistaUsuario.telefone_lojista == '' || dadosLojistaUsuario.telefone_lojista == undefined || dadosLojistaUsuario.telefone_lojista == null || dadosLojistaUsuario.telefone_lojista.length > 15
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificacaoEmail = await lojistaDao.mdlSelectLojistaByEmail(dadosLojistaUsuario.email_usuario)
        if (verificacaoEmail) {
            return message.ERROR_EXISTING_EMAIL
        } else {
            let resultStatus = await lojistaDao.mdlInsertLojistaUsuario(dadosLojistaUsuario)

            if (resultStatus) {
                let novoLojista = await lojistaDao.mdlSelectLastId()
                let novoUsuario = await usuarioDAO.mdlSelectLastByID()

                let dadosLojistaJSON = {
                    status: message.SUCCESS_CREATED_ITEM.status,
                    message: message.SUCCESS_CREATED_ITEM.message,
                    lojista: novoLojista,
                    usuario: novoUsuario
                }

                return dadosLojistaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const ctlAtualizarLojistaUsuario = async (dadosLojistaUsuario, idLojista) => {
    if (
        idLojista == '' || idLojista == undefined || idLojista == null || isNaN(idLojista) ||
        dadosLojistaUsuario.novo_email_usuario == '' || dadosLojistaUsuario.novo_email_usuario == undefined || dadosLojistaUsuario.novo_email_usuario == null || dadosLojistaUsuario.novo_email_usuario.length > 255 ||
        dadosLojistaUsuario.novo_senha_usuario == '' || dadosLojistaUsuario.novo_senha_usuario == undefined || dadosLojistaUsuario.novo_senha_usuario == null || dadosLojistaUsuario.novo_senha_usuario.length > 270 ||
        dadosLojistaUsuario.novo_nome_lojista == '' || dadosLojistaUsuario.novo_nome_lojista == undefined || dadosLojistaUsuario.novo_nome_lojista == null || dadosLojistaUsuario.novo_nome_lojista.length > 80 ||
        dadosLojistaUsuario.novo_telefone_lojista == '' || dadosLojistaUsuario.novo_telefone_lojista == undefined || dadosLojistaUsuario.novo_telefone_lojista == null || dadosLojistaUsuario.novo_telefone_lojista.length > 15
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        dadosLojistaUsuario.id_lojista = idLojista

        let verificacaoID = await lojistaDao.mdlSelectLojistaId(dadosLojistaUsuario.id_lojista)
        if (verificacaoID) {
            return message.ERROR_INVALID_ID
        } else {
            let resultStatus = await lojistaDao.mdlUpdateLojistaUsuario(dadosLojistaUsuario)

            if (resultStatus) {
                let novoLojista = await lojistaDao.mdlSelectLojistaId(dadosLojistaUsuario.id_lojista)

                let dadosLojistaJSON = {
                    status: message.SUCCESS_UPDATED_ITEM.status,
                    message: message.SUCCESS_UPDATED_ITEM.message,
                    lojista_antigo: verificacaoID,
                    lojista_novo: novoLojista
                }

                return dadosLojistaJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const ctlDeleteUsuario = async (idLojista) => {

    if (idLojista == null || idLojista == undefined || idLojista == '' || isNaN(idLojista)) {
        return message.ERROR_INVALID_ID
    }else{

        let checkIdLojista = lojistaDao.mdlSelectLojistaId(idLojista)

        if(!checkIdLojista){

        }else{

            let idUsuario = checkIdLojista.lojistas[0].id_usuario

            let dadosLojista = lojistaDao.mdlDesativarLojista(idLojista)

            if(dadosLojista){
                let excluirUsuario = usuarioDAO.mdlDeleteUsuario(idUsuario)



            }else{

            }
        }
    }
}

module.exports = {
    ctlGetLojistas,
    ctlGetLojistaID,
    ctlGetLojistaIdUsuario,
    ctlInserirLojistaUsuario,
    ctlAtualizarLojistaUsuario
}