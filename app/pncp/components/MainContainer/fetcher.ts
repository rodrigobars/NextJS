import axios from 'axios';
import { GET, GET_cnetmobile } from "@/app/pncp/api/route";

const urlApiBase: string = 'https://pncp.gov.br/api'

enum ModalidadeContratacao {
    LEILAO_ELETRONICO = 1,
    DIALOGO_COMPETITIVO = 2,
    CONCURSO = 3,
    CONCORRENCIA_ELETRONICA = 4,
    CONCORRENCIA_PRESENCIAL = 5,
    PREGAO_ELETRONICO = 6,
    PREGAO_PRESENCIAL = 7,
    DISPENSA_DE_LICITACAO = 8,
    INEXIGIBILIDADE = 9,
    MANIFESTACAO_DE_INTERESSE = 10,
    PRE_QUALIFICACAO = 11,
    CREDENCIAMENTO = 12,
    LEILAO_PRESENCIAL = 13,
}

enum Status {
    RECEBENDO_PROPOSTA = "recebendo_proposta",
    PROPOSTAS_ENCERRADAS = "propostas_encerradas",
    ENCERRADAS = "encerradas",
}

function extrairNumeroCompra(url: string): string | null {
    // Expressão regular para extrair o número da compra
    const regex: RegExp = /compra=(\d+)/;
    
    // Executa a expressão regular na URL
    const match: RegExpMatchArray | null = url.match(regex);
    
    // Retorna o número da compra se encontrado, caso contrário, retorna null
    return match ? match[1] : null;
}

export default async function pesquisaEditaisEContratacoes( { Uasg, Status, ModalidadeContratacao } ) {
    try {
        const response = await axios.get(`${urlApiBase}/search/?q=${Uasg}&tipos_documento=edital&ordenacao=-data&pagina=1&tam_pagina=10000&status=${Status}&modalidades=${ModalidadeContratacao}`);
        return response
    } catch (error) {
        // Lide com erros aqui, se necessário
        console.error(error);
    }
}

export async function pesquisaCompra( { orgao_cnpj, ano, numero_sequencial } ) {
    const urlCompra = `/pncp/v1/orgaos/${orgao_cnpj}/compras/${ano}/${numero_sequencial}`
    try {
        const response = await axios.get( urlApiBase + urlCompra )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function pesquisaItens( { orgao_cnpj, ano, numero_sequencial } ) {
    const urlItens = `/pncp/v1/orgaos/${orgao_cnpj}/compras/${ano}/${numero_sequencial}/itens?pagina=1&tamanhoPagina=10000`
    try {
        const response = await axios.get( urlApiBase + urlItens )
        console.log('Itens: ', response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// export async function pesquisaCnetMobile( { compraNumero } ) {
//     const urlCompraNumero = `http://127.0.0.1:8000/cnetmobile?compra_numero=${compraNumero}`
//     console.log('requisitando => ', urlCompraNumero)
//     try {
//         const response = await axios.get( urlCompraNumero )
//         console.log('dataCnetMobile: ', response)
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }

export const pesquisaResultados = async ( { orgao_cnpj, ano, numero_sequencial, ArrayToFetch } ) => {

    try {
        const requests: Promise<T>[] = ArrayToFetch.map(item => {
                    if (item) {
                        const myRequest = new Request(`/api/route?orgao_cnpj=${orgao_cnpj}&ano=${ano}&numero_sequencial=${numero_sequencial}&numeroItem=${item}`);
                        return GET(myRequest)
                    } else {
                        return false
                    }
                }   
            );     

        const results = await Promise.all(requests);
        
        return (results)

    } catch (error) {
        console.error('Erro ao buscar dados para os CNPJs', error);
    }

};

export const pesquisaCnetMobile = async ({ compraNumero }: { compraNumero: string }): Promise<any> => {
    try {
        const myRequest = new Request(`/api/route?compra_numero=${compraNumero}`);
        const results = await GET_cnetmobile(myRequest);
        return results;
    } catch (error) {
        console.error('Erro ao buscar dados para os CNPJs', error);
    }
};