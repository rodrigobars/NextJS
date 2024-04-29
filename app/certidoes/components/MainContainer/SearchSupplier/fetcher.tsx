import { GET } from "@/app/certidoes/api/route";

// interface ResponseAPIBrasil {
//     razao_social: string;
//     nome_fantasia: string;
//     cnpj: string;
//     uf: string | null;
// }
  
interface ResponseTCU {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    uf: string | null;
    certidoes: Certidao[];
    certidaoPDF: string;
    seCnpjEncontradoNaBaseTcu: boolean,
    dataHoraGeracaoInMillis: number
}

interface Certidao {
    emissor: string;
    tipo: string;
    dataHoraEmissao: string;
    descricao: string;
    situacao: string;
    observacao: string | null;
    linkConsultaManual: string;
    tempoGeracao: number;
}

const formatCnpj = (cnpj: string): string => {
    return cnpj.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
};

// const APIBrasil = async (cnpjValues: string[]) => {

//     const formattedCnpjs: string[] = cnpjValues.map(formatCnpj); // Formata os CNPJs

//     try {
//         const requests: Promise<ResponseAPIBrasil>[] = formattedCnpjs.map(cnpj =>
//             fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }}).then(response => response.json())
//         );     

//         const results = await Promise.all(requests);

//         return(results)
//     } catch (error) {
//         console.error('Erro ao buscar dados para os CNPJs', error);
//     }
// };

const TCU = async (cnpjValues: string[]) => {

    const formattedCnpjs: string[] = cnpjValues.map(formatCnpj);

    try {
        const requests: Promise<ResponseTCU>[] = formattedCnpjs.map(cnpj => {
                    const myRequest = new Request(`/api/route?cnpj=${cnpj}`);
                    return GET(myRequest)
                }
            );     

        const results = await Promise.all(requests);

        console.log('fetcher: ', results)
        
        return (results)

    } catch (error) {
        console.error('Erro ao buscar dados para os CNPJs', error);
    }

};

export {TCU}