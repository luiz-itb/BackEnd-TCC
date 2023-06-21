/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de ALUNOS
 *  Autor: Luiz e Muryllo
 *  Data: 14/04/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo DAO para acessar dados do produto no BD
var produtosDAO = require('../model/DAO/produtoDAO.js')

var message = require('./modulo/config.js')

//Retorna a lista de todos os produtos
const getProdutos = async function () {

    let dadosProdutosJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosProduto = await produtosDAO.mdlSelectAllProdutos()

    if (dadosProduto) {
        let arrayResponse = []
        let jsonItem = []

        for (let index = 0; index < dadosProduto.length; index++) {
            let produto = {
                id: dadosProduto[index].id,
                nome: dadosProduto[index].nome_produto,
                descricao: dadosProduto[index].descricao_produto,
                peso: dadosProduto[index].peso_produto,
                cupom: dadosProduto[index].cupom_produto,
                url: dadosProduto[index].url_produto,
                status: dadosProduto[index].status_produto
            }

            let lojista = {
                id: dadosProduto[index].id_lojista,
                nome: dadosProduto[index].nome_lojista,
                email: dadosProduto[index].email_lojista
            }

            jsonItem = {
                produto: produto,
                lojista: lojista
            }
            arrayResponse.push(jsonItem)
        }

        //Criando um JSON com o atributo aluno, para encaminhar um array de alunos
        dadosProdutosJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosProduto.length,
            itens: arrayResponse
        }
        return dadosProdutosJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND;
    }

}

//Retorna o produto filtrando pelo ID
const getProdutoPeloId = async function (id) {

    //Validação do ID
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosProdutosJSON = {}

        let dadosProduto = await produtosDAO.mdlSelectProdutoById(id)

        if (dadosProduto) {
            let arrayResponse = []
            let jsonItem = []

            for (let index = 0; index < dadosProduto.length; index++) {
                let produto = {
                    id: dadosProduto[index].id,
                    nome: dadosProduto[index].nome_produto,
                    descricao: dadosProduto[index].descricao_produto,
                    peso: dadosProduto[index].peso_produto,
                    cupom: dadosProduto[index].cupom_produto,
                    url: dadosProduto[index].url_produto,
                    status: dadosProduto[index].status_produto
                }

                let lojista = {
                    id: dadosProduto[index].id_lojista,
                    nome: dadosProduto[index].nome_lojista,
                    email: dadosProduto[index].email_lojista
                }

                jsonItem = {
                    produto: produto,
                    lojista: lojista
                }
                arrayResponse.push(jsonItem)
            }

            //Criando um JSON com o atributo aluno, para encaminhar um array de produtos
            dadosProdutosJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                item: arrayResponse
            }

            return dadosProdutosJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}

module.exports = {
    getProdutos,
    getProdutoPeloId,
}