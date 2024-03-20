import { Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { pesquisaCompra, pesquisaItens, pesquisaResultados, pesquisaCnetMobile } from '../fetcher';

import TabelaItens from './TabelaItens/TabelaItens';
import CompraDetalhes from './CompraDetalhes/CompraDetalhes';
import TabelaResultados from './TabelaResultados/TabelaResultados';
import TabelaResumo from './TabelaResumo/TabelaResumo';
import CnetMobileTable from './CnetMobile/CnetMobileTable';

interface OrgaoEntidade {
    cnpj: string;
    razaoSocial: string;
    poderId: string;
    esferaId: string;
}

interface UnidadeOrgao {
    ufNome: string;
    ufSigla: string;
    municipioNome: string;
    codigoUnidade: string;
    nomeUnidade: string;
    codigoIbge: string;
}

interface AmparoLegal {
    descricao: string;
    nome: string;
    codigo: number;
}

interface Compra {
    valorTotalEstimado: number;
    valorTotalHomologado: number;
    modalidadeId: number;
    srp: boolean;
    anoCompra: number;
    sequencialCompra: number;
    orgaoEntidade: OrgaoEntidade;
    numeroCompra: string;
    orgaoSubRogado: null | any; // Se não for null, substitua 'any' pelo tipo correto
    unidadeOrgao: UnidadeOrgao;
    unidadeSubRogada: null | any; // Se não for null, substitua 'any' pelo tipo correto
    dataAtualizacao: string;
    dataInclusao: string;
    dataPublicacaoPncp: string;
    amparoLegal: AmparoLegal;
    dataAberturaProposta: string;
    dataEncerramentoProposta: string;
    informacaoComplementar: string;
    processo: string;
    objetoCompra: string;
    linkSistemaOrigem: string;
    justificativaPresencial: null | any; // Se não for null, substitua 'any' pelo tipo correto
    existeResultado: boolean;
    numeroControlePNCP: string;
    modalidadeNome: string;
    orcamentoSigilosoCodigo: number;
    orcamentoSigilosoDescricao: string;
    situacaoCompraId: number;
    situacaoCompraNome: string;
    tipoInstrumentoConvocatorioCodigo: number;
    tipoInstrumentoConvocatorioNome: string;
    modoDisputaId: number;
    modoDisputaNome: string;
    usuarioNome: string;
}

interface CompraItem {
    codigoRegistroImobiliario: null;
    criterioJulgamentoId: number;
    criterioJulgamentoNome: string;
    dataAtualizacao: string;
    dataInclusao: string;
    descricao: string;
    imagem: number;
    incentivoProdutivoBasico: boolean;
    itemCategoriaId: number;
    itemCategoriaNome: string;
    materialOuServico: string;
    materialOuServicoNome: string;
    numeroItem: number;
    orcamentoSigiloso: boolean;
    patrimonio: null;
    quantidade: number;
    situacaoCompraItem: number;
    situacaoCompraItemNome: string;
    temResultado: boolean;
    tipoBeneficio: number;
    tipoBeneficioNome: string;
    unidadeMedida: string;
    valorTotal: number;
    valorUnitarioEstimado: number;
}

interface ResultadoCompraItem {
    codigoPais: string;
    dataAtualizacao: string;
    dataCancelamento: string | null;
    dataInclusao: string;
    dataResultado: string;
    indicadorSubcontratacao: boolean;
    motivoCancelamento: string | null;
    naturezaJuridicaId: string;
    naturezaJuridicaNome: string;
    niFornecedor: string;
    nomeRazaoSocialFornecedor: string;
    numeroControlePNCPCompra: string;
    numeroItem: number;
    ordemClassificacaoSrp: number | null;
    percentualDesconto: number;
    porteFornecedorId: number;
    porteFornecedorNome: string;
    quantidadeHomologada: number;
    sequencialResultado: number;
    situacaoCompraItemResultadoId: number;
    situacaoCompraItemResultadoNome: string;
    tipoPessoa: string;
    valorTotalHomologado: number;
    valorUnitarioHomologado: number;
}

function extrairNumeroDaCompra(url: string): string | null {
    const match = url.match(/compra=(\d+)/);
    return match ? match[1] : null;
    }

const dados = [
    {
      "numero": 2,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "2",
      "descricao": "\"Milho\"",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
      "participacaoExclusivaMeEppOuEquiparadas": "Não",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 1000,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 83.0,
      "valorEstimadoTotal": 83000.0,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 200000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 82900.0,
                "valorUnitario": 82.9
              },
              "valorInformado": 82.9
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 1000,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "NACIONAL",
          "modeloVersao": "MILHO EM GRÃOS",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 83000.0,
                "valorUnitario": 83.0
              },
              "valorInformado": 83.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 83000.0,
                "valorUnitario": 83.0
              },
              "valorInformado": 83.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 1000,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Bpg",
          "modeloVersao": "Milho\" Tipo: Grão , Aplicação: Alimento Para Anima",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 98000.0,
                "valorUnitario": 98.0
              },
              "valorInformado": 98.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 98000.0,
                "valorUnitario": 98.0
              },
              "valorInformado": 98.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 1000,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "RAÇÕES AGROMAIS ",
          "modeloVersao": "MILHO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 1,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "1",
      "descricao": "Farelo",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 500,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 160.0,
      "valorEstimadoTotal": 80000.0,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 150000.0,
                "valorUnitario": 300.0
              },
              "valorInformado": 300.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 72500.0,
                "valorUnitario": 145.0
              },
              "valorInformado": 145.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 500,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "BUNGE",
          "modeloVersao": "FARELO DE SOJA",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 80000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 73000.0,
                "valorUnitario": 146.0
              },
              "valorInformado": 146.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 500,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "ADM",
          "modeloVersao": "FARELO DE SOJA ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 125000.0,
                "valorUnitario": 250.0
              },
              "valorInformado": 250.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 76500.0,
                "valorUnitario": 153.0
              },
              "valorInformado": 153.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 500,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "CARGILL",
          "modeloVersao": "FARELO DE SOJA ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "32492168000158",
            "nome": "MEGAMAQ EQUIPAMENTOS, PRODUTOS E SERVICOS LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 80000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 80000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 500,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Bpg",
          "modeloVersao": "Alinento animal",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 3,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "3",
      "descricao": "Suplemento Alimentar Animal",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 24,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 253.89,
      "valorEstimadoTotal": 6093.36,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 6093.36,
                "valorUnitario": 253.89
              },
              "valorInformado": 253.89
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 6000.0,
                "valorUnitario": 250.0
              },
              "valorInformado": 250.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 24,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "AGROCERES",
          "modeloVersao": "NUCLEO OVINOS",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio do ctf prar o item 08",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T17:40:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 6072.0,
                "valorUnitario": 253.0
              },
              "valorInformado": 253.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 6072.0,
                "valorUnitario": 253.0
              },
              "valorInformado": 253.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 24,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Suplemento Alimentar Animal Tipo: Vitamínico E Min",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 5,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "5",
      "descricao": "Sal mineral",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 15,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 119.37,
      "valorEstimadoTotal": 1790.55,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 2700.0,
                "valorUnitario": 180.0
              },
              "valorInformado": 180.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 1747.5,
                "valorUnitario": 116.5
              },
              "valorInformado": 116.5
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "MASTER",
          "modeloVersao": "MASTERFOS 70 EQUINO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 1790.55,
                "valorUnitario": 119.37
              },
              "valorInformado": 119.37
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 1755.0,
                "valorUnitario": 117.0
              },
              "valorInformado": 117.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "RAÇÕES AGROMAIS /WGM",
          "modeloVersao": "SAL MINERAL ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 1785.0,
                "valorUnitario": 119.0
              },
              "valorInformado": 119.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 1785.0,
                "valorUnitario": 119.0
              },
              "valorInformado": 119.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Sal Mineral Ingredientes: Cálcio Mín. 135,00 G; Cá",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 4,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "4",
      "descricao": "Sal Mineral",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 20,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 150.02,
      "valorEstimadoTotal": 3000.4,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 4000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2890.0,
                "valorUnitario": 144.5
              },
              "valorInformado": 144.5
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 20,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "MASTER",
          "modeloVersao": "NC DESTAQUE BOVILAC",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio dos CTFs para os itens informado de acordo com o Termo de referência do Edital conforme informado em mensagem anterior.",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T17:40:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3000.4,
                "valorUnitario": 150.02
              },
              "valorInformado": 150.02
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2900.0,
                "valorUnitario": 145.0
              },
              "valorInformado": 145.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 20,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "PRODAP - LACTAMAX",
          "modeloVersao": "NUCLEO ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3000.0,
                "valorUnitario": 150.0
              },
              "valorInformado": 150.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 3000.0,
                "valorUnitario": 150.0
              },
              "valorInformado": 150.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 20,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Sal Mineral Ingredientes: Cálcio Mín. 135,00 G; Cá",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 6,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "6",
      "descricao": "Sal Mineral",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 30,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 115.0,
      "valorEstimadoTotal": 3450.0,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 6000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 3285.0,
                "valorUnitario": 109.5
              },
              "valorInformado": 109.5
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 30,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "MASTER",
          "modeloVersao": "MASTERFOS 80",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3450.0,
                "valorUnitario": 115.0
              },
              "valorInformado": 115.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 3300.0,
                "valorUnitario": 110.0
              },
              "valorInformado": 110.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 30,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "RAÇÕES AGROMAIS/WGM",
          "modeloVersao": "SAL MINERAL ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3420.0,
                "valorUnitario": 114.0
              },
              "valorInformado": 114.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 3330.0,
                "valorUnitario": 111.0
              },
              "valorInformado": 111.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 30,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Sal Mineral Ingredientes: Cálcio Mín. 135,00 G; Cá",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 8,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "8",
      "descricao": "Sal Mineral",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 15,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 98.0,
      "valorEstimadoTotal": 1470.0,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 1470.0,
                "valorUnitario": 98.0
              },
              "valorInformado": 98.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 1470.0,
                "valorUnitario": 98.0
              },
              "valorInformado": 98.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "RAÇÕES AGROMAIS/WGM",
          "modeloVersao": "SAL MINERAL ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2100.0,
                "valorUnitario": 140.0
              },
              "valorInformado": 140.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "MASTER",
          "modeloVersao": "MASTERFOS 65 CAP/OVINO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 7,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "7",
      "descricao": "Sal Mineral",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 20,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 158.63,
      "valorEstimadoTotal": 3172.6,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 4000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2100.0,
                "valorUnitario": 105.0
              },
              "valorInformado": 105.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 20,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "MASTER",
          "modeloVersao": "MASTERFOS 45",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3172.6,
                "valorUnitario": 158.63
              },
              "valorInformado": 158.63
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2200.0,
                "valorUnitario": 110.0
              },
              "valorInformado": 110.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 20,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "RAÇÕES AGROMAIS/WGM",
          "modeloVersao": "SAL MINERAL ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3160.0,
                "valorUnitario": 158.0
              },
              "valorInformado": 158.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 3160.0,
                "valorUnitario": 158.0
              },
              "valorInformado": 158.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 20,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Sal Mineral Ingredientes: Cálcio, Fósforo, Magnési",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 9,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "9",
      "descricao": "Sal Mineral",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 15,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 148.52,
      "valorEstimadoTotal": 2227.8,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 3000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2062.5,
                "valorUnitario": 137.5
              },
              "valorInformado": 137.5
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "MASTER",
          "modeloVersao": "MASTERFOS 65 CAP/OVINO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "27120416000108",
            "nome": "EDWINEY SEBASTIAO CUPERTINO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 2223.75,
                "valorUnitario": 148.25
              },
              "valorInformado": 148.25
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2070.0,
                "valorUnitario": 138.0
              },
              "valorInformado": 138.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "DE HEUS ",
          "modeloVersao": "SAL MINERAL ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 2220.0,
                "valorUnitario": 148.0
              },
              "valorInformado": 148.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 2220.0,
                "valorUnitario": 148.0
              },
              "valorInformado": 148.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 15,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Sal Mineral Aplicação: Caprinos , Dosagem Componen",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 10,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "10",
      "descricao": "Adubo químico",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 150,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 162.67,
      "valorEstimadoTotal": 24400.5,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 24000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 20250.0,
                "valorUnitario": 135.0
              },
              "valorInformado": 135.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "HERINGER",
          "modeloVersao": "KCL",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "12457041000190",
            "nome": "ATACADAO DAS RACOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "S",
          "justificativaUltimaSolicitacaoAnexos": "Prezados, não foi enviado CTF conforme solicitado no chat e edital - vamos abrir o anexo para envio com prazo final às 17:40 - item 10 ",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T17:40:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 24400.5,
                "valorUnitario": 162.67
              },
              "valorInformado": 162.67
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 20400.0,
                "valorUnitario": 136.0
              },
              "valorInformado": 136.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR ",
          "modeloVersao": "ADUBO QUIMICO ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 24400.5,
                "valorUnitario": 162.67
              },
              "valorInformado": 162.67
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 23526.0,
                "valorUnitario": 156.84
              },
              "valorInformado": 156.84
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": "Adubo químico - Adubo Químico Aspecto Físico: Pó , Cor: Rosa , Composição Básica: Cloreto De Potássio A 50%",
          "situacao": "None",
          "marcaFabricante": "heringer",
          "modeloVersao": "heringer",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "04576614000177",
            "nome": "M A M VIDAL LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 24300.0,
                "valorUnitario": 162.0
              },
              "valorInformado": 162.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 24300.0,
                "valorUnitario": 162.0
              },
              "valorInformado": 162.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Adubo Químico Aspecto Físico: Pó , Cor: Rosa , Com",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 24400.5,
                "valorUnitario": 162.67
              },
              "valorInformado": 162.67
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 24400.5,
                "valorUnitario": 162.67
              },
              "valorInformado": 162.67
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Industria Química",
          "modeloVersao": "saco 50 KG",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "42382002000132",
            "nome": "THUYA PLANTAS E JARDINS LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 30000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 29970.0,
                "valorUnitario": 199.8
              },
              "valorInformado": 199.8
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR",
          "modeloVersao": "SC DE 50KG",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "09590203000150",
            "nome": "PLANTIUN DISTRIBUIDORA LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 30000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 30000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR/FERTIPAR",
          "modeloVersao": "SACO 50 KG",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "11163447000106",
            "nome": "TECA TECNOLOGIA E COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 31900.5,
                "valorUnitario": 212.67
              },
              "valorInformado": 212.67
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 31900.5,
                "valorUnitario": 212.67
              },
              "valorInformado": 212.67
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 150,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Adubo Cloreto de Potasio",
          "modeloVersao": "Fertipar",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "43979792000109",
            "nome": "JS AZZURI COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 11,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "11",
      "descricao": "Fertilizante Ureia",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 300,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 160.0,
      "valorEstimadoTotal": 48000.0,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 47100.0,
                "valorUnitario": 157.0
              },
              "valorInformado": 157.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR ",
          "modeloVersao": "FERTILIZANTE UREIA ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 47400.0,
                "valorUnitario": 158.0
              },
              "valorInformado": 158.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Fertilizante Ureia Composição Química Nitrogênio: ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Heringe",
          "modeloVersao": "Uréia 46",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "12457041000190",
            "nome": "ATACADAO DAS RACOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "NitroBrás",
          "modeloVersao": "Fertilizante Ureia",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "48859538000182",
            "nome": "SG EMPREENDIMENTOS COMERCIAIS LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 48000.0,
                "valorUnitario": 160.0
              },
              "valorInformado": 160.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Indústria Química",
          "modeloVersao": "Saco de 50 kg",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "42382002000132",
            "nome": "THUYA PLANTAS E JARDINS LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 60000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 59940.0,
                "valorUnitario": 199.8
              },
              "valorInformado": 199.8
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR",
          "modeloVersao": "SC DE 50KG",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "09590203000150",
            "nome": "PLANTIUN DISTRIBUIDORA LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 60000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 60000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR/FERTIPAR",
          "modeloVersao": "SQACO 50 KG",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "11163447000106",
            "nome": "TECA TECNOLOGIA E COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 63000.0,
                "valorUnitario": 210.0
              },
              "valorInformado": 210.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 63000.0,
                "valorUnitario": 210.0
              },
              "valorInformado": 210.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 300,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Ureia 46% ",
          "modeloVersao": "Fertipar",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "43979792000109",
            "nome": "JS AZZURI COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 12,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "12",
      "descricao": "Adubo Químico",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 100,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 174.5,
      "valorEstimadoTotal": 17450.0,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 17450.0,
                "valorUnitario": 174.5
              },
              "valorInformado": 174.5
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 12900.0,
                "valorUnitario": 129.0
              },
              "valorInformado": 129.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR ",
          "modeloVersao": "ADUBO QUIMICO ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "44429540000160",
            "nome": "DISTRIBUIDORA ESPIRITO SANTO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 17450.0,
                "valorUnitario": 174.5
              },
              "valorInformado": 174.5
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 13087.0,
                "valorUnitario": 130.87
              },
              "valorInformado": 130.87
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": "Adubo Químico - Adubo Químico Aspecto Físico: Granulado , Composição Básica: Superfosfato Triplo, Mínimo 40% De P2 O3 , Aplicação: Agrícola",
          "situacao": "None",
          "marcaFabricante": "heringer",
          "modeloVersao": "heringer",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "04576614000177",
            "nome": "M A M VIDAL LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 20000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 14500.0,
                "valorUnitario": 145.0
              },
              "valorInformado": 145.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR",
          "modeloVersao": "SC DE 50KG",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "09590203000150",
            "nome": "PLANTIUN DISTRIBUIDORA LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 17000.0,
                "valorUnitario": 170.0
              },
              "valorInformado": 170.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 14700.0,
                "valorUnitario": 147.0
              },
              "valorInformado": 147.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "HERINGER",
          "modeloVersao": "SUPER FOSFATO SIMPLES",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "12457041000190",
            "nome": "ATACADAO DAS RACOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 20000.0,
                "valorUnitario": 200.0
              },
              "valorInformado": 200.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 16983.0,
                "valorUnitario": 169.83
              },
              "valorInformado": 169.83
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "FERTIPAR/FERTIPAR",
          "modeloVersao": "SACO 50 KG",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "11163447000106",
            "nome": "TECA TECNOLOGIA E COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 17450.0,
                "valorUnitario": 174.5
              },
              "valorInformado": 174.5
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 17450.0,
                "valorUnitario": 174.5
              },
              "valorInformado": 174.5
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "NitroBrás",
          "modeloVersao": "Adubo Químico Superfosfato Triplo",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "48859538000182",
            "nome": "SG EMPREENDIMENTOS COMERCIAIS LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 17450.0,
                "valorUnitario": 174.5
              },
              "valorInformado": 174.5
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 17450.0,
                "valorUnitario": 174.5
              },
              "valorInformado": 174.5
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Indústria Química",
          "modeloVersao": "Saco de 50 kg",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "42382002000132",
            "nome": "THUYA PLANTAS E JARDINS LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 22450.0,
                "valorUnitario": 224.5
              },
              "valorInformado": 224.5
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 22450.0,
                "valorUnitario": 224.5
              },
              "valorInformado": 224.5
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 100,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Super Simples",
          "modeloVersao": "Fertipar",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "43979792000109",
            "nome": "JS AZZURI COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 13,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "13",
      "descricao": "Glifosato",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 350,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 37.47,
      "valorEstimadoTotal": 13114.5,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 13114.5,
                "valorUnitario": 37.47
              },
              "valorInformado": 37.47
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 7350.0,
                "valorUnitario": 21.0
              },
              "valorInformado": 21.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 350,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "GLIFSATO IPA RAINBOWN ",
          "modeloVersao": "LITRO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "50630988000140",
            "nome": "AGRO ZAIDAN COMERCIAL LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Prezados, não foi enviado CTF conforme solicitado no chat e edital - vamos abrir o anexo para envio com prazo final às 17:40 - item 10 ",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T17:40:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 13114.5,
                "valorUnitario": 37.47
              },
              "valorInformado": 37.47
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 7487.375,
                "valorUnitario": 21.3925
              },
              "valorInformado": 21.3925
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 350,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Braddock SL",
          "modeloVersao": "Solus do brasil",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "43979792000109",
            "nome": "JS AZZURI COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 17500.0,
                "valorUnitario": 50.0
              },
              "valorInformado": 50.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 7521.22,
                "valorUnitario": 21.4892
              },
              "valorInformado": 21.4892
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 350,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "RIDOWN FULL / RAINBOW",
          "modeloVersao": "LITRO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "09590203000150",
            "nome": "PLANTIUN DISTRIBUIDORA LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 13090.0,
                "valorUnitario": 37.4
              },
              "valorInformado": 37.4
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 10486.0,
                "valorUnitario": 29.96
              },
              "valorInformado": 29.96
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 350,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Trop / Adama",
          "modeloVersao": "Balde 20L",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "15153524000190",
            "nome": "SANIGRAN LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 14000.0,
                "valorUnitario": 40.0
              },
              "valorInformado": 40.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 10522.75,
                "valorUnitario": 30.065
              },
              "valorInformado": 30.065
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 350,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "SUMÔ/PILARQUIM",
          "modeloVersao": "LITRO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "11163447000106",
            "nome": "TECA TECNOLOGIA E COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 13114.5,
                "valorUnitario": 37.47
              },
              "valorInformado": 37.47
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 13114.5,
                "valorUnitario": 37.47
              },
              "valorInformado": 37.47
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 350,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Glifosato Concentração: 64,8% P/V , Apresentação: ",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    },
    {
      "numero": 14,
      "tipo": "ItemPregao não agrupado",
      "disputaPorValorUnitario": "Sim",
      "possuiOrcamentoSigiloso": "Não",
      "identificador": "14",
      "descricao": "Picloram",
      "criterioJulgamento": "Menor Preço",
      "homologado": "Não",
      "situacaoEnvioResultado": "None",
      "numeroSessaoJulgHab": 1,
      "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
      "participacaoExclusivaMeEppOuEquiparadas": "Sim",
      "situacao": "Ativo",
      "fase": "Disputa Encerrada",
      "quantidadeSolicitada": 250,
      "criterioValor": "Valor estimado",
      "valorEstimado": null,
      "valorEstimadoUnitario": 51.3,
      "valorEstimadoTotal": 12825.0,
      "priorizarAbertura": "Não",
      "julgHabEncerrada": "Não",
      "qtdeItensDoGrupo": null,
      "qtdeAceitaSrp": null,
      "qtdeAdjudicadaSrp": null,
      "prazosFaseRecursal": null,
      "propostasItem": [
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 12825.0,
                "valorUnitario": 51.3
              },
              "valorInformado": 51.3
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 7000.0,
                "valorUnitario": 28.0
              },
              "valorInformado": 28.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 250,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "CAMP D / PRETISS",
          "modeloVersao": "LITRO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "50630988000140",
            "nome": "AGRO ZAIDAN COMERCIAL LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": "E",
          "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de proposta atualizadas e documentação necessária para análise, incluindo a prevista no item 4 e subitens do Anexo I  (Termo de referência) do Edital. Prazo para envio:\n",
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Sim",
          "dataHoraLimiteAtendimento": "2024-02-20T15:30:00",
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 15000.0,
                "valorUnitario": 60.0
              },
              "valorInformado": 60.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 7192.8,
                "valorUnitario": 28.7712
              },
              "valorInformado": 28.7712
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 250,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "GALOP M / ADAMA ",
          "modeloVersao": "LITRO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "09590203000150",
            "nome": "PLANTIUN DISTRIBUIDORA LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 12825.0,
                "valorUnitario": 51.3
              },
              "valorInformado": 51.3
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 7200.0,
                "valorUnitario": 28.8
              },
              "valorInformado": 28.8
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 250,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Norton ",
          "modeloVersao": "Nortox",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "43979792000109",
            "nome": "JS AZZURI COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 12800.0,
                "valorUnitario": 51.2
              },
              "valorInformado": 51.2
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 12725.0,
                "valorUnitario": 50.9
              },
              "valorInformado": 50.9
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 250,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Galop-M / Adama",
          "modeloVersao": "Balde 20L",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "15153524000190",
            "nome": "SANIGRAN LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 12750.0,
                "valorUnitario": 51.0
              },
              "valorInformado": 51.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 12750.0,
                "valorUnitario": 51.0
              },
              "valorInformado": 51.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 250,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "Veg",
          "modeloVersao": "Picloram Composição: Associado Ao Ácido 2,4-D , Sa",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "51394411000140",
            "nome": "BPG SOLUCOES LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        },
        {
          "valores": {
            "valorPropostaInicial": {
              "valorCalculado": {
                "valorTotal": 15000.0,
                "valorUnitario": 60.0
              },
              "valorInformado": 60.0
            },
            "valorPropostaInicialOuLances": {
              "valorCalculado": {
                "valorTotal": 15000.0,
                "valorUnitario": 60.0
              },
              "valorInformado": 60.0
            },
            "valorSugeridoNegociacao": null,
            "valorNegociado": null
          },
          "quantidadeOfertada": 250,
          "descricaoDetalhada": null,
          "situacao": "None",
          "marcaFabricante": "CAMP D/UPL",
          "modeloVersao": "LITRO",
          "situacaoUltimaNegociacao": null,
          "justificativaUltimaNegociacao": null,
          "situacaoNaFaseFechadaModoAbertoFechado": null,
          "participante": {
            "identificacao": "11163447000106",
            "nome": "TECA TECNOLOGIA E COMERCIO LTDA",
            "tipo": "Pessoa Jurídica"
          },
          "situacaoUltimaSolicitacaoAnexos": null,
          "justificativaUltimaSolicitacaoAnexos": null,
          "declaracaoMeEpp": "Sim",
          "canalChatAberto": "Não",
          "dataHoraLimiteAtendimento": null,
          "motivoDesclassificacao": null,
          "situacaoNaDisputaFinal": null,
          "situacaoNoDesempateMeEpp": null
        }
      ]
    }
  ]

export default function Compra( { orgao_cnpj, ano, numero_sequencial, swap } ) {
    const [compra, setCompra] = useState<Compra>();
    const [itens, setItens] = useState();
    const [resultados, setResultados] = useState<ResultadoCompraItem[]>([])
    const [existeResultado, setExisteResultado] = useState(false)
    const [compraNumero, setCompraNumero] = useState('')
    //const [dadosCnetMobile, setDadosCnetMobile] = useState([dados])
    const [dadosCnetMobile, setDadosCnetMobile] = useState([])
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isActivated, setIsActivated] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [compraResponse, itensResponse] = await Promise.all([
                    pesquisaCompra({ orgao_cnpj, ano, numero_sequencial }),
                    pesquisaItens({ orgao_cnpj, ano, numero_sequencial })
                ]);
        
                if (mountedRef.current) return;

                if (compraResponse.existeResultado) {
                    setExisteResultado(true)
                }

                
                setCompraNumero(extrairNumeroDaCompra(compraResponse.linkSistemaOrigem))
        
                setCompra(compraResponse);
                setItens(itensResponse);
            } catch (error) {
                console.error('Erro ao buscar compra ou itens:', error);
            }
        };
    
        const mountedRef = { current: false };
        
        fetchData();
    
        return () => {
            mountedRef.current = true;
        };
    
    }, [orgao_cnpj, ano, numero_sequencial]);

    // useEffect(() => {
    //     setCompraNumero(compra ? extrairNumeroDaCompra(compra.linkSistemaOrigem) : '')
    // }, [compra])

    useEffect(() => {
        const fazerRequisicao = async () => {
            try {
                // Verifica se 'compra' está preenchido
                if (compra && compra.existeResultado) {
                    const ArrayToFetch = itens.filter(item => item.temResultado).map(item => item.numeroItem);
                    const response: ResultadoCompraItem[] = await pesquisaResultados({ orgao_cnpj, ano, numero_sequencial, ArrayToFetch });
                    setResultados(response)
                    console.log(response) 
                } else {
                    console.log('Não existem RESULTADOS para a compra ou compra não está preenchido!');
                }
            } catch (error) {
                // Tratar erros relacionados à TCU, se necessário
                console.error(error);
            }
        };
    
        // Executa apenas se 'compra' estiver preenchido
        if (compra) {
            fazerRequisicao();
        }
    
    }, [compra, itens]);
    
    const startFetchingCnetMobile = () => {
        // console.log(compraNumero)
        pesquisaCnetMobile( { compraNumero } )
            .then((responseCnetMobile) => {
                if (responseCnetMobile !== undefined) {
                    setDadosCnetMobile(responseCnetMobile);
                    console.log('Bem sucedido')
                } else {
                    // Tratar o caso em que responseAPIBrasil é undefined, se necessário
                    console.error("Erro: responseCnetMobile é undefined");
                }
            })
                .catch((error) => {
                // Tratar erros relacionados à APIBrasil, se necessário
                console.error("Erro ao chamar o CnetMobile:", error);
            });
    }

    return (
        <div className='flex flex-col items-center bg-black bg-opacity-50 rounded-lg p-10 gap-5 lg:w-[95%]'>

            {compra && (
                <CompraDetalhes
                    compra={compra}
                    swap={swap}
                    />
                )
            }

            {compra && (
                <Tabs 
                    variant='solid'
                    color='danger'
                    aria-label="Tabs colors"
                    radius="lg"
                    onSelectionChange={(key: React.Key) =>    
                        {
                            if (key === 'Cnetmobile' && compraNumero) {
                                onOpen()
                            }
                        }
                    }
                    >

                    <Tab key="Itens" title="Itens" className='w-full'>
                        {(itens) && (
                            <TabelaItens
                                itens={itens}
                            />
                            )
                        }
                    </Tab>

                    <Tab key="Cnetmobile" title="Cnetmobile" className='w-full'>
                        {(dadosCnetMobile)
                            &&
                            <CnetMobileTable
                                dados={dadosCnetMobile}
                            />
                        }
                    </Tab>

                    <Tab isDisabled={!existeResultado ? true : false} key="Resultado" title="Resultado" className='w-full'>
                        {(resultados) && (
                            <TabelaResultados
                                resultados={resultados}
                                />
                            )
                        }
                    </Tab>

                    <Tab isDisabled={!existeResultado ? true : false} key="Resumo" title="Resumo" className='w-full'>
                        {(resultados) && (
                            <TabelaResumo
                                resultados={resultados}
                                />
                            )
                        }
                    </Tab>
                </Tabs>
            )}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Aviso</ModalHeader>
                            <ModalBody>
                                <p> 
                                    Será necessário aguardar uns minutos até que os dados sejam coletados.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={
                                    () => {
                                        onClose()
                                        startFetchingCnetMobile()
                                    }
                                }>
                                    Iniciar
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
        )
    }