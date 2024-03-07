import JSZip from "jszip";

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

export default async function ziperPdf(dataTCU: ResponseTCU[]) {
    // Criar um novo arquivo zip e adicionar os PDFs
    const newZip = new JSZip();

    console.log(dataTCU)

    await dataTCU.forEach((empresa: ResponseTCU) => {
        if (empresa.certidaoPDF) {
            newZip.file(`${empresa.razaoSocial.split(" ", 2).join("_")}_${formatCnpj(empresa.cnpj)}.pdf`, empresa.certidaoPDF, { base64: true });
        }
    });
    
    return(newZip);
}