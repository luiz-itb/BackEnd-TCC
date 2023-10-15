/*********************************************************************************************************
 * Objetivo: Arquivo responsavel por padronizar as mensagens de ERRO, SUCESSO, FUNÇÕES, VARIAVEIS
 * Autor: Luiz Gustavo e Muryllo Vieira
 * Data: 22/05/2023
 * Versão: 1.0
*********************************************************************************************************/

/*************************************** MENSAGENS DE ERRO ***************************************/
const ERROR_REQUIRE_FIELDS = {status: 400, message: 'NÃO FOI PREENCHIDO TODOS OS CAMPOS OBRIGATÓRIOS'}

const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O TIPO DE MÍDIA CONTENT-TYPE DA SOLICITAÇÃO NÃO É COMPATÍVEL COM O SERVIDOR. TIPO ACEITÁVEL: [application/json]'}

const ERROR_INVALID_ID = {status: 400, message: 'O ID INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_PARAMS = {status: 400, message: 'O PARAMETRO INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_EMAIL = {status: 400, message: 'O EMAIL INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_EMAIL_TOKEN = {status: 404, message: 'O EMAIL INFORMADO NA REQUISIÇÃO NÃO ESTÁ CADASTRADO NO SISTEMA'}

const ERROR_INVALID_EMAIL_SENHA = {status: 400, message: 'O EMAIL OU SENHA INFORMADO NA REQUISIÇÃO NÃO É VALIDADO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_SENHA = {status: 400, message: 'A SENHA INFORMADA NA REQUISIÇÃO NÃO É VALIDADO'}

const ERROR_INVALID_NOME = {status: 400, message: 'O NOME INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_VALORES = {status: 404, message: 'O PRECO ORIGINAL ESTÁ MENOR DO QUE COM DESCONTO'}

const ERROR_INVALID_TELEFONE = {status: 400, message: 'O TELEFONE INFORMADO NA REQUISIÇÃO NÃO É VALIDO'}

const ERROR_REGISTER_NOT_FOUND= {status: 404, message: 'O SERVIDOR NÃO ENCONTROU O RECURSO SOLICITADO.'}

const ERROR_INTERNAL_SERVER = {status: 500, message: 'DEVIDO A UM ERRO INTERNO NO SERVIDOR, NÃO FOI POSSIVEL PROCESSAR A REQUISIÇÃO'}

const ERROR_EXISTING_EMAIL = {status: 400, message: 'O EMAIL INFORMADO JÁ EXISTE NO SISTEMA'}

const ERROR_INVALID_TOKEN = {status: 400, message: 'O TOKEN É INVÁLIDO, OU SEJA, NÃO É COMPÁTIVEL'}

const ERROR_TOKEN_EXPIRADO = {status: 400, message: 'INTERVALO DE TEMPO ACABOU, TOKEN EXPIRADO'}

/*************************************** MENSAGENS DE SUCESSO ***************************************/
const SUCCESS_CREATED_ITEM = {status: 201, message: 'ITEM CRIADO COM SUCESSO'}

const SUCCESS_UPDATED_ITEM = {status: 200, message: 'ITEM ATUALIZADO COM SUCESSO'}

const SUCCESS_DELETED_ITEM = {status: 200, message: 'ITEM DELETADO COM SUCESSO'}

const SUCCESS_REQUEST = {status: 200, message: 'REQUISIÇÃO BEM SUCEDIDA'}

const SUCCESS_VALID_TOKEN = {status: 200, message: 'TOKEN VÁLIDO'}


module.exports = {
    //Exportes de erro
    ERROR_REGISTER_NOT_FOUND,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_ID,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_REQUIRE_FIELDS,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_NOME,
    ERROR_INVALID_VALORES,
    ERROR_INVALID_EMAIL_SENHA,
    ERROR_EXISTING_EMAIL,
    ERROR_INVALID_SENHA,
    ERROR_INVALID_TOKEN,
    ERROR_TOKEN_EXPIRADO,
    ERROR_INVALID_EMAIL_TOKEN,

    //Exportes de sucesso
    SUCCESS_CREATED_ITEM,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_REQUEST,
    SUCCESS_VALID_TOKEN
}