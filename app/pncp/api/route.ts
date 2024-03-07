import axios from 'axios';

const urlApiBase: string = 'https://pncp.gov.br/api'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const orgao_cnpj = searchParams.get('orgao_cnpj')
    const ano = searchParams.get('ano')
    const numero_sequencial = searchParams.get('numero_sequencial')
    const numeroItem = searchParams.get('numeroItem')
    
    const urlResultados = `/pncp/v1/orgaos/${orgao_cnpj}/compras/${ano}/${numero_sequencial}/itens/${numeroItem}/resultados/1`

    let tentativas = 0;
    const maxTentativas = 2; // Defina o número máximo de tentativas desejado

    while (tentativas < maxTentativas) {
        try {
            const res = await fetch(urlResultados)
            
            if (res.status === 200) {
                const data = await res.json();
                return data
            } else {
                tentativas++;
                console.warn(`Tentativa ${tentativas} - Erro. Tentando novamente...`);
            }

        } catch (error) {
            console.error('Erro na requisição:', error);
            return ('ERROR')
        }
    }

    if (tentativas === maxTentativas) {
        console.error(`Número máximo de tentativas (${maxTentativas}) atingido. A requisição não pôde ser concluída.`);
    }
}

export async function GET_cnetmobile(request: Request) {

    const { searchParams } = new URL(request.url)
    const compraNumero = searchParams.get('compra_numero')
    
    const urlCompraNumero = `/cnetmobile?compra_numero=${compraNumero}`

    try {
        const res = await axios.get(urlCompraNumero)
        console.log('response => ', res.data)
        
        if (res.status === 200) {
            return await res.data
        } else {
            console.warn(`Erro...`);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
    }

}