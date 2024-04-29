type Proposta = {
    valores: {
        valorPropostaInicial: {
        valorCalculado: {
            valorTotal: number;
            valorUnitario: number;
        };
        valorInformado: number;
        };
        valorPropostaInicialOuLances: {
        valorCalculado: {
            valorTotal: number;
            valorUnitario: number;
        };
        valorInformado: number;
        };
        valorSugeridoNegociacao: number | null;
        valorNegociado: number | null;
    };
    quantidadeOfertada: number;
    descricaoDetalhada: string;
    situacao: string;
    marcaFabricante: string;
    modeloVersao: string;
    situacaoUltimaNegociacao: string | null;
    justificativaUltimaNegociacao: string | null;
    situacaoNaFaseFechadaModoAbertoFechado: string | null;
    participante: {
        identificacao: string;
        nome: string;
        tipo: string;
    };
    situacaoUltimaSolicitacaoAnexos: string | null;
    justificativaUltimaSolicitacaoAnexos: string | null;
    declaracaoMeEpp: string;
    canalChatAberto: string;
    dataHoraLimiteAtendimento: Date | null;
    motivoDesclassificacao: string | null;
    situacaoNaDisputaFinal: string | null;
    situacaoNoDesempateMeEpp: string | null;
    empatadoComoMelhorClassificado: boolean;
};

type Item = {
    grupo: number | null;
    item: number;
    descricao: string;
    proposta: Proposta;
};

type Empresas = {
    [key: number]: Item[]
} 

export default function filterCnetMobile( dados ){
    const empresas: Empresas = {}

    //dados[0].map((item) => {
    dados.propostas.map((item) => {
        if (item.tipo != 'Grupo') {
            item.propostasItem.forEach(empresa => {
                if (empresa.situacao == 'Proposta adjudicada' || empresa.situacao == 'Fornecedor habilitado') {
                    let propostaVencedora: Item = {'grupo': null, 'item': item.numero, 'descricao': item.descricao, 'proposta': empresa};
                    if (!empresas[empresa.participante.identificacao]) {
                        empresas[empresa.participante.identificacao] = [];
                    }
                    empresas[empresa.participante.identificacao].push(propostaVencedora);
                }
            })
        } else {
            item.subItens.map((subItem) => {
                subItem.propostasItem.map((empresa) => {
                    if (empresa.situacao == 'Proposta adjudicada' || empresa.situacao == 'Fornecedor habilitado') {
                        let propostaVencedora: Item = {'grupo': item.identificador, 'item': subItem.numero, 'descricao': subItem.descricao, 'proposta': empresa};
                        if (!empresas[empresa.participante.identificacao]) {
                            empresas[empresa.participante.identificacao] = [];
                        }
                        empresas[empresa.participante.identificacao].push(propostaVencedora);
                    } 
                })
            })
        }
    })

    return empresas
}