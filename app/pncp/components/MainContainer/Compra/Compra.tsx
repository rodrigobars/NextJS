import { Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { pesquisaCompra, pesquisaItens, pesquisaResultados, pesquisaCnetMobile } from '../fetcher';

import TabelaItens from './TabelaItens/TabelaItens';
import CompraDetalhes from './CompraDetalhes/CompraDetalhes';
import TabelaResultados from './TabelaResultados/TabelaResultados';
import TabelaResumo from './TabelaResumo/TabelaResumo';
import CnetMobileTable from './CnetMobile/CnetMobileTable';
//import CnetMobileAta from './CnetMobile/CnetMobileAta';

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

const dadosNaoAgrupados = [
  {
    "numero": 3,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "3",
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 2,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Habilitação encerrada",
    "quantidadeSolicitada": 2190,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 15.45,
    "valorEstimadoTotal": 33835.5,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 33835.5,
              "valorUnitario": 15.45
            },
            "valorInformado": 15.45
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 19622.4,
              "valorUnitario": 8.96
            },
            "valorInformado": 8.96
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2190,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "Q PÃO/ PLUS VITA",
        "modeloVersao": "CARACTERISTICO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "09031962000182",
          "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada, ressaltando a previsão do edital de que a proposta deve conter somente uma marca, sob pena de recusa da proposta.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-02-29T15:00:00",
        "motivoDesclassificacao": "Necessidade de revisão de decisão na fase de julgamento. ",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 33726.0,
              "valorUnitario": 15.4
            },
            "valorInformado": 15.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 19710.0,
              "valorUnitario": 9.0
            },
            "valorInformado": 9.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2190,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "QPÃO",
        "modeloVersao": "PACOTE",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "10910334000156",
          "nome": "GUARAILHA DISTRIBUIDORA DE ALIMENTOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": "A proposta será desclassificada sem necessidade de envio de proposta atualizada pelo licitante, seguindo o princípio da economicidade, já que a marca ofertada já foi recusada pela área técnica por não atender aos requisitos do edital, a saber, o fornecimento em embalagens de gramatura de 500g.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 33835.5,
              "valorUnitario": 15.45
            },
            "valorInformado": 15.45
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 23783.4,
              "valorUnitario": 10.86
            },
            "valorInformado": 10.86
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2190,
        "descricaoDetalhada": "Pão - Pão Base: De Farinha De Trigo Integral , Tipo: De Forma , Apresentação: Fatiado , Tipo Embalagem: Embalagem Individual",
        "situacao": "Fornecedor habilitado",
        "marcaFabricante": "PANCO",
        "modeloVersao": "caracteristico",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "74116898000102",
          "nome": "COMAX COMERCIO DE ALIMENTOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da documentação necessária para habilitação da empresa, por gentileza. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-15T14:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 33835.5,
              "valorUnitario": 15.45
            },
            "valorInformado": 15.45
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 33835.5,
              "valorUnitario": 15.45
            },
            "valorInformado": 15.45
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2190,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "propria",
        "modeloVersao": "pao integral",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
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
              "valorTotal": 33835.5,
              "valorUnitario": 15.45
            },
            "valorInformado": 15.45
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 33835.5,
              "valorUnitario": 15.45
            },
            "valorInformado": 15.45
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2190,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "panco",
        "modeloVersao": "pao de forma panco",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "28007449000109",
          "nome": "BAR ESPETINHO TROPICAL LTDA.",
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
    "numero": 2,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "2",
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 2,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Habilitação encerrada",
    "quantidadeSolicitada": 3890,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 12.46,
    "valorEstimadoTotal": 48469.4,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 48469.4,
              "valorUnitario": 12.46
            },
            "valorInformado": 12.46
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 27035.5,
              "valorUnitario": 6.95
            },
            "valorInformado": 6.95
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 3890,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "Q PÃO",
        "modeloVersao": "CARACTERISTICO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "09031962000182",
          "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-02-29T14:30:00",
        "motivoDesclassificacao": "Necessidade de revisão de decisão na fase de julgamento. ",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 48236.0,
              "valorUnitario": 12.4
            },
            "valorInformado": 12.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 27230.0,
              "valorUnitario": 7.0
            },
            "valorInformado": 7.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 3890,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "QPÃO",
        "modeloVersao": "PACOTE ",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "10910334000156",
          "nome": "GUARAILHA DISTRIBUIDORA DE ALIMENTOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": "A proposta será desclassificada sem necessidade de envio de proposta atualizada pelo licitante, seguindo o princípio da economicidade, já que a marca ofertada já foi recusada pela área técnica por não atender aos requisitos do edital, a saber, o fornecimento em embalagens de gramatura de 500g.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 48469.4,
              "valorUnitario": 12.46
            },
            "valorInformado": 12.46
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 30380.9,
              "valorUnitario": 7.81
            },
            "valorInformado": 7.81
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 3890,
        "descricaoDetalhada": "Pão - Pão Base: De Farinha De Trigo Refinada , Tipo: De Forma , Tipo Adicional: Tradicional , Apresentação: Fatiado , Tipo Embalagem: Embalagem Individual",
        "situacao": "Fornecedor habilitado",
        "marcaFabricante": "PANCO",
        "modeloVersao": "caracteristico",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "74116898000102",
          "nome": "COMAX COMERCIO DE ALIMENTOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da documentação necessária para habilitação da empresa, por gentileza. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-15T14:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 48236.0,
              "valorUnitario": 12.4
            },
            "valorInformado": 12.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 48236.0,
              "valorUnitario": 12.4
            },
            "valorInformado": 12.4
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 3890,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "Visconti/Wickbold",
        "modeloVersao": "pão Base: De Farinha De Trigo Refinada , Tipo: De ",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
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
              "valorTotal": 48469.4,
              "valorUnitario": 12.46
            },
            "valorInformado": 12.46
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 48469.4,
              "valorUnitario": 12.46
            },
            "valorInformado": 12.46
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 3890,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "panco",
        "modeloVersao": "por de forma panco",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "28007449000109",
          "nome": "BAR ESPETINHO TROPICAL LTDA.",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 1000,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 33.3,
    "valorEstimadoTotal": 33300.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 33100.0,
              "valorUnitario": 33.1
            },
            "valorInformado": 33.1
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 33100.0,
              "valorUnitario": 33.1
            },
            "valorInformado": 33.1
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 32110.0,
              "valorUnitario": 32.11
            },
            "valorInformado": 32.11
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 32110.0,
              "valorUnitario": 32.11
            },
            "valorInformado": 32.11
          }
        },
        "quantidadeOfertada": 1000,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "propria",
        "modeloVersao": "pao de creme",
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Conforme valor registrado em sua proposta enviada",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada. Se possível, gostaríamos de pedir negociação para a diminuição dos valores ofertados, já que a empresa foi a única participante dos itens e não ofereceu a redução de valores no decorrer da fase de lances.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-02-29T16:30:00",
        "motivoDesclassificacao": "A licitante não enviou documentos válidos para atender aos seguintes subitens do Termo de Referência : 8.19; 8.23; 8.24.2; 8.28 e 8.28.1.1. ",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 1600,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 34.85,
    "valorEstimadoTotal": 55760.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 55680.0,
              "valorUnitario": 34.8
            },
            "valorInformado": 34.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 55680.0,
              "valorUnitario": 34.8
            },
            "valorInformado": 34.8
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 53424.0,
              "valorUnitario": 33.39
            },
            "valorInformado": 33.39
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 53424.0,
              "valorUnitario": 33.39
            },
            "valorInformado": 33.39
          }
        },
        "quantidadeOfertada": 1600,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "propria",
        "modeloVersao": "pao de coco",
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Conforme valor registrado em sua proposta enviada",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Abertura de prazo para envio da documentação pendente, conforme explicação no \"chat\" com a empresa no presente item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-04T15:15:00",
        "motivoDesclassificacao": "A licitante não enviou documentos válidos para atender aos seguintes subitens do Termo de Referência : 8.19; 8.23; 8.24.2; 8.28 e 8.28.1.1. ",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": 2250,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 27.0,
    "valorEstimadoTotal": 60750.0,
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
              "valorTotal": 60750.0,
              "valorUnitario": 27.0
            },
            "valorInformado": 27.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 56137.5,
              "valorUnitario": 24.95
            },
            "valorInformado": 24.95
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2250,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "Q PÃO",
        "modeloVersao": "CARACTERISTICO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "09031962000182",
          "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, enviar, por gentileza, o contrato social da empresa.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-01T16:00:00",
        "motivoDesclassificacao": "A licitante não apresentou amostra do item dentro do prazo determinado, o que, de acordo com o item 4.5 do Termo de Referência, motiva a recusa de sua proposta. ",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 58500.0,
              "valorUnitario": 26.0
            },
            "valorInformado": 26.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 56250.0,
              "valorUnitario": 25.0
            },
            "valorInformado": 25.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2250,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "PADARIA NOVA LISBOA",
        "modeloVersao": "KG",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "10910334000156",
          "nome": "GUARAILHA DISTRIBUIDORA DE ALIMENTOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio do balanço patrimonial referente aos dois últimos exercícios sociais, por gentileza. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-18T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60750.0,
              "valorUnitario": 27.0
            },
            "valorInformado": 27.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 60750.0,
              "valorUnitario": 27.0
            },
            "valorInformado": 27.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2250,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "propria",
        "modeloVersao": "pao careca",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 400,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 34.31,
    "valorEstimadoTotal": 13724.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 13720.0,
              "valorUnitario": 34.3
            },
            "valorInformado": 34.3
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 13720.0,
              "valorUnitario": 34.3
            },
            "valorInformado": 34.3
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 13208.0,
              "valorUnitario": 33.02
            },
            "valorInformado": 33.02
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 13208.0,
              "valorUnitario": 33.02
            },
            "valorInformado": 33.02
          }
        },
        "quantidadeOfertada": 400,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "propria",
        "modeloVersao": "pao brioche",
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Conforme valor registrado em sua proposta enviada",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada. Se possível, gostaríamos de pedir negociação para a diminuição do valor ofertado, já que a empresa foi a única participante do item e não ofereceu a redução de valores no decorrer da fase de lances.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-02-29T16:30:00",
        "motivoDesclassificacao": "A licitante não enviou documentos válidos para atender aos seguintes subitens do Termo de Referência : 8.19; 8.23; 8.24.2; 8.28 e 8.28.1.1. ",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Habilitação encerrada",
    "quantidadeSolicitada": 1740,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 30.88,
    "valorEstimadoTotal": 53731.2,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 53731.2,
              "valorUnitario": 30.88
            },
            "valorInformado": 30.88
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 24273.0,
              "valorUnitario": 13.95
            },
            "valorInformado": 13.95
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 1740,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor habilitado",
        "marcaFabricante": "Q PÃO",
        "modeloVersao": "CARACTERISTICO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "09031962000182",
          "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-02-29T14:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 53592.0,
              "valorUnitario": 30.8
            },
            "valorInformado": 30.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 24360.0,
              "valorUnitario": 14.0
            },
            "valorInformado": 14.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 1740,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "PADARIA NOVA LISBOA",
        "modeloVersao": "KG",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "10910334000156",
          "nome": "GUARAILHA DISTRIBUIDORA DE ALIMENTOS LTDA",
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
              "valorTotal": 53679.0,
              "valorUnitario": 30.85
            },
            "valorInformado": 30.85
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 53679.0,
              "valorUnitario": 30.85
            },
            "valorInformado": 30.85
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 1740,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "propria",
        "modeloVersao": "bisnaga",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 1600,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 32.21,
    "valorEstimadoTotal": 51536.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 51520.0,
              "valorUnitario": 32.2
            },
            "valorInformado": 32.2
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 51520.0,
              "valorUnitario": 32.2
            },
            "valorInformado": 32.2
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 49696.0,
              "valorUnitario": 31.06
            },
            "valorInformado": 31.06
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 49696.0,
              "valorUnitario": 31.06
            },
            "valorInformado": 31.06
          }
        },
        "quantidadeOfertada": 1600,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "propria",
        "modeloVersao": "pao françes",
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Conforme valor registrado em sua proposta enviada",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada. Se possível, gostaríamos de pedir negociação para a diminuição do valor ofertado, já que a empresa foi a única participante do item e não ofereceu a redução de valores no decorrer da fase de lances.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-02-29T16:30:00",
        "motivoDesclassificacao": "A licitante não enviou documentos válidos para atender aos seguintes subitens do Termo de Referência : 8.19; 8.23; 8.24.2; 8.28 e 8.28.1.1. ",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 200,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 35.0,
    "valorEstimadoTotal": 7000.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 7000.0,
              "valorUnitario": 35.0
            },
            "valorInformado": 35.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7000.0,
              "valorUnitario": 35.0
            },
            "valorInformado": 35.0
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 6726.0,
              "valorUnitario": 33.63
            },
            "valorInformado": 33.63
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 6726.0,
              "valorUnitario": 33.63
            },
            "valorInformado": 33.63
          }
        },
        "quantidadeOfertada": 200,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "propria",
        "modeloVersao": "pao de milho",
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Conforme valor registrado em sua proposta enviada",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada. Se possível, gostaríamos de pedir negociação para a diminuição do valor ofertado, já que a empresa foi a única participante do item e não ofereceu a redução de valores no decorrer da fase de lances.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-02-29T16:30:00",
        "motivoDesclassificacao": "A licitante não enviou documentos válidos para atender aos seguintes subitens do Termo de Referência : 8.19; 8.23; 8.24.2; 8.28 e 8.28.1.1. ",
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
    "descricao": "Pão",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 200,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 29.5,
    "valorEstimadoTotal": 5900.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5880.0,
              "valorUnitario": 29.4
            },
            "valorInformado": 29.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5880.0,
              "valorUnitario": 29.4
            },
            "valorInformado": 29.4
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 5634.0,
              "valorUnitario": 28.17
            },
            "valorInformado": 28.17
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 5634.0,
              "valorUnitario": 28.17
            },
            "valorInformado": 28.17
          }
        },
        "quantidadeOfertada": 200,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "propria",
        "modeloVersao": "pao brioche",
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Conforme valor registrado em sua proposta enviada",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada. Se possível, gostaríamos de pedir negociação para a diminuição do valor ofertado, já que a empresa foi a única participante do item e não ofereceu a redução de valores no decorrer da fase de lances.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-02-29T16:30:00",
        "motivoDesclassificacao": "A licitante não enviou documentos válidos para atender aos seguintes subitens do Termo de Referência : 8.19; 8.23; 8.24.2; 8.28 e 8.28.1.1. ",
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
    "descricao": "Broa De Fubá",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 1700,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 34.22,
    "valorEstimadoTotal": 58174.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 58140.0,
              "valorUnitario": 34.2
            },
            "valorInformado": 34.2
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 58140.0,
              "valorUnitario": 34.2
            },
            "valorInformado": 34.2
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 56304.0,
              "valorUnitario": 33.12
            },
            "valorInformado": 33.12
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 56304.0,
              "valorUnitario": 33.12
            },
            "valorInformado": 33.12
          }
        },
        "quantidadeOfertada": 1700,
        "descricaoDetalhada": null,
        "situacao": "Fornecedor inabilitado",
        "marcaFabricante": "propria",
        "modeloVersao": "broa de fuba",
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Conforme valor registrado em sua proposta enviada",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "51960596000102",
          "nome": "51.960.596 RUAN PABLO FERNANDES MARQUES",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Prezado licitante, solicitamos o envio da proposta atualizada. Se possível, gostaríamos de pedir negociação para a diminuição do valor ofertado, já que a empresa foi a única participante do item e não ofereceu a redução de valores no decorrer da fase de lances.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-02-29T16:30:00",
        "motivoDesclassificacao": "A licitante não enviou documentos válidos para atender aos seguintes subitens do Termo de Referência : 8.19; 8.23; 8.24.2; 8.28 e 8.28.1.1. ",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ]
  }
]

const dadosAgrupados = [
  {
    "numero": -21,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G5",
    "descricao": "Grupo 5",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 2038.74,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2032.8,
              "valorUnitario": null
            },
            "valorInformado": 2032.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1088.01,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para atender ao especificado em Edital, reiteramos a solicitação do encaminhamento do anexo II (preposto), no prazo determinado.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-22T18:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2038.74,
              "valorUnitario": null
            },
            "valorInformado": 2038.74
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1088.12,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2038.74,
              "valorUnitario": null
            },
            "valorInformado": 2038.74
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1093.4,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1428.57,
              "valorUnitario": null
            },
            "valorInformado": 1428.57
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1109.46,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "26395502000152",
          "nome": "DENTAL UNIVERSO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 25,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "25",
        "descricao": "Cone Endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 11,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 37.0,
        "valorEstimadoTotal": 407.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 405.9,
                  "valorUnitario": 36.9
                },
                "valorInformado": 36.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 339.13,
                  "valorUnitario": 30.83
                },
                "valorInformado": 30.83
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 407.0,
                  "valorUnitario": 37.0
                },
                "valorInformado": 37.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 369.82,
                  "valorUnitario": 33.62
                },
                "valorInformado": 33.62
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 407.0,
                  "valorUnitario": 37.0
                },
                "valorInformado": 37.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 372.9,
                  "valorUnitario": 33.9
                },
                "valorInformado": 33.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 406.89,
                  "valorUnitario": 36.99
                },
                "valorInformado": 36.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 369.82,
                  "valorUnitario": 33.62
                },
                "valorInformado": 33.62
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": "Cone Endodôntico - Cone Endodôntico Tipo: Acessório , Material: Guta-Percha , Calibre: Mf , Comprimento: 28 MM, Apresentação: Estojo 120 Pontas",
            "situacao": "None",
            "marcaFabricante": "DENTSPLY",
            "modeloVersao": "DENTSPLY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 26,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "26",
        "descricao": "Cone Endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 11,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 39.52,
        "valorEstimadoTotal": 434.72,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 433.4,
                  "valorUnitario": 39.4
                },
                "valorInformado": 39.4
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 341.11,
                  "valorUnitario": 31.01
                },
                "valorInformado": 31.01
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 434.72,
                  "valorUnitario": 39.52
                },
                "valorInformado": 39.52
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 346.72,
                  "valorUnitario": 31.52
                },
                "valorInformado": 31.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 434.72,
                  "valorUnitario": 39.52
                },
                "valorInformado": 39.52
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 347.6,
                  "valorUnitario": 31.6
                },
                "valorInformado": 31.6
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 434.61,
                  "valorUnitario": 39.51
                },
                "valorInformado": 39.51
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 369.82,
                  "valorUnitario": 33.62
                },
                "valorInformado": 33.62
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": "Cone Endodôntico - Cone Endodôntico Tipo: Calibrado , Material: Guta-Percha , Calibre: 2ª Série , Comprimento: 28 MM, Apresentação: Estojo 120 Pontas , Característica Adicional: Sortida",
            "situacao": "None",
            "marcaFabricante": "DENTSPLY",
            "modeloVersao": "DENTSPLY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 27,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "27",
        "descricao": "Cone endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 11,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 108.82,
        "valorEstimadoTotal": 1197.02,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1193.5,
                  "valorUnitario": 108.5
                },
                "valorInformado": 108.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 407.77,
                  "valorUnitario": 37.07
                },
                "valorInformado": 37.07
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1197.02,
                  "valorUnitario": 108.82
                },
                "valorInformado": 108.82
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 371.58,
                  "valorUnitario": 33.78
                },
                "valorInformado": 33.78
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1197.02,
                  "valorUnitario": 108.82
                },
                "valorInformado": 108.82
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 372.9,
                  "valorUnitario": 33.9
                },
                "valorInformado": 33.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 587.07,
                  "valorUnitario": 53.37
                },
                "valorInformado": 53.37
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 369.82,
                  "valorUnitario": 33.62
                },
                "valorInformado": 33.62
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 11,
            "descricaoDetalhada": "Cone endodôntico - Cone Endodôntico Tipo: Principal , Material: Guta-Percha , Calibre: Específico P/ Técnica Instrumentação Rotátoria , Comprimento: 28 MM, Apresentação: Estojo C/ 60 Pontas",
            "situacao": "None",
            "marcaFabricante": "DENTSPLY",
            "modeloVersao": "DENTSPLY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -24,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G2",
    "descricao": "Grupo 2",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 26212.5,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 26212.5,
              "valorUnitario": null
            },
            "valorInformado": 26212.5
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 15525.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta atualizada, com catálogo detalhado, anexos e demais documentos referidos em Edital e Termo de Referência deste certame, relativo a este item, no prazo determinado e publicado neste sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-19T17:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 26212.5,
              "valorUnitario": null
            },
            "valorInformado": 26212.5
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 16537.5,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 26212.5,
              "valorUnitario": null
            },
            "valorInformado": 26212.5
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 16650.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 26212.5,
              "valorUnitario": null
            },
            "valorInformado": 26212.5
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 19012.5,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "07010532000159",
          "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 23850.0,
              "valorUnitario": null
            },
            "valorInformado": 23850.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 23850.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 8,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "8",
        "descricao": "Alginato",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 123750,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 0.13,
        "valorEstimadoTotal": 16087.5,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 16087.5,
                  "valorUnitario": 0.13
                },
                "valorInformado": 0.13
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 9900.0,
                  "valorUnitario": 0.08
                },
                "valorInformado": 0.08
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 123750,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "JELTRATE PLUS / DENTSPLY",
            "modeloVersao": "TIPO I",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 16087.5,
                  "valorUnitario": 0.13
                },
                "valorInformado": 0.13
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 8662.5,
                  "valorUnitario": 0.07
                },
                "valorInformado": 0.07
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 123750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "VIGODENT",
            "modeloVersao": "VIGODENT",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 16087.5,
                  "valorUnitario": 0.13
                },
                "valorInformado": 0.13
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 9900.0,
                  "valorUnitario": 0.08
                },
                "valorInformado": 0.08
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 123750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "HYDROPRINT GRAMA / COLTENE / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 16087.5,
                  "valorUnitario": 0.13
                },
                "valorInformado": 0.13
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 11137.5,
                  "valorUnitario": 0.09
                },
                "valorInformado": 0.09
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 123750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "JELTRATE PLUS \t/\tDENTSPLY ",
            "modeloVersao": "tipo I",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14850.0,
                  "valorUnitario": 0.12
                },
                "valorInformado": 0.12
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 14850.0,
                  "valorUnitario": 0.12
                },
                "valorInformado": 0.12
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 123750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "JELTRATE PLUS DENTSPLY",
            "modeloVersao": "JELTRATE PLUS DENTSPLY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 9,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "9",
        "descricao": "Alginato",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 112500,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 0.09,
        "valorEstimadoTotal": 10125.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 10125.0,
                  "valorUnitario": 0.09
                },
                "valorInformado": 0.09
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 5625.0,
                  "valorUnitario": 0.05
                },
                "valorInformado": 0.05
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 112500,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "AVA GEL REFIL / DENTSPLY",
            "modeloVersao": "COM 410GR",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 10125.0,
                  "valorUnitario": 0.09
                },
                "valorInformado": 0.09
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 7875.0,
                  "valorUnitario": 0.07
                },
                "valorInformado": 0.07
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 112500,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MAQUIRA",
            "modeloVersao": "MAQUIRA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 10125.0,
                  "valorUnitario": 0.09
                },
                "valorInformado": 0.09
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 6750.0,
                  "valorUnitario": 0.06
                },
                "valorInformado": 0.06
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 112500,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ALGI GEL GRAMA / MAQUIRA / NAC",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 10125.0,
                  "valorUnitario": 0.09
                },
                "valorInformado": 0.09
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 7875.0,
                  "valorUnitario": 0.07
                },
                "valorInformado": 0.07
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 112500,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "AVAGEL \t/\tDENTSPLY ",
            "modeloVersao": "tipo II",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 9000.0,
                  "valorUnitario": 0.08
                },
                "valorInformado": 0.08
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 9000.0,
                  "valorUnitario": 0.08
                },
                "valorInformado": 0.08
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 112500,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "AVAGEL DENTSPLY",
            "modeloVersao": "AVAGEL DENTSPLY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -22,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G4",
    "descricao": "Grupo 4",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 4100.24,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4100.24,
              "valorUnitario": null
            },
            "valorInformado": 4100.24
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2227.25,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "50345269000188",
          "nome": "DENTAL PORTO IMPORTACAO E EXPORTACAO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta atualizada, com catálogo detalhado, anexos e demais documentos referidos em Edital e Termo de Referência deste certame, relativo a este item, no prazo determinado e publicado neste sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-19T17:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4100.24,
              "valorUnitario": null
            },
            "valorInformado": 4100.24
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2234.8,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "07010532000159",
          "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4100.24,
              "valorUnitario": null
            },
            "valorInformado": 4100.24
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2456.39,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4100.24,
              "valorUnitario": null
            },
            "valorInformado": 4100.24
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2609.28,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4100.24,
              "valorUnitario": null
            },
            "valorInformado": 4100.24
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2650.05,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4090.8,
              "valorUnitario": null
            },
            "valorInformado": 4090.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3193.09,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4100.24,
              "valorUnitario": null
            },
            "valorInformado": 4100.24
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4100.24,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "33992679000100",
          "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 21,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "21",
        "descricao": "Cera odontológica",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 63,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 31.28,
        "valorEstimadoTotal": 1970.64,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1970.64,
                  "valorUnitario": 31.28
                },
                "valorInformado": 31.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 929.25,
                  "valorUnitario": 14.75
                },
                "valorInformado": 14.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": "Cera odontológica - Cera Odontológica Tipo: 7 , Apresentação: Caixa 18 Lâminas , Peso: Cerca De 220 G, Cor: Vermelha/Rosa",
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "PROTETC",
            "modeloVersao": "PROTETC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50345269000188",
              "nome": "DENTAL PORTO IMPORTACAO E EXPORTACAO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1970.64,
                  "valorUnitario": 31.28
                },
                "valorInformado": 31.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 932.4,
                  "valorUnitario": 14.8
                },
                "valorInformado": 14.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MDR\t/\tMDR",
            "modeloVersao": " nº7",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1970.64,
                  "valorUnitario": 31.28
                },
                "valorInformado": 31.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1023.75,
                  "valorUnitario": 16.25
                },
                "valorInformado": 16.25
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER / ASFER",
            "modeloVersao": "NR 7",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1970.64,
                  "valorUnitario": 31.28
                },
                "valorInformado": 31.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1088.64,
                  "valorUnitario": 17.28
                },
                "valorInformado": 17.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "LYSANDA / LYSANDA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1970.64,
                  "valorUnitario": 31.28
                },
                "valorInformado": 31.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1105.65,
                  "valorUnitario": 17.55
                },
                "valorInformado": 17.55
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER",
            "modeloVersao": "ASFER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1965.6,
                  "valorUnitario": 31.2
                },
                "valorInformado": 31.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1418.13,
                  "valorUnitario": 22.51
                },
                "valorInformado": 22.51
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MDR",
            "modeloVersao": "MDR",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1970.64,
                  "valorUnitario": 31.28
                },
                "valorInformado": 31.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1970.64,
                  "valorUnitario": 31.28
                },
                "valorInformado": 31.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL ",
            "modeloVersao": "CAIXA C/ 18 UNIDADES ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 22,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "22",
        "descricao": "Cera odontológica",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 88,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 24.2,
        "valorEstimadoTotal": 2129.6,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2129.6,
                  "valorUnitario": 24.2
                },
                "valorInformado": 24.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1298.0,
                  "valorUnitario": 14.75
                },
                "valorInformado": 14.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 88,
            "descricaoDetalhada": "Cera odontológica - Cera Odontológica Tipo: Utilidade , Apresentação: Caixa 5 Lâminas , Peso: Cerca De 220 G, Cor: Vermelha/Branca",
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "PROTETC",
            "modeloVersao": "PROTETC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50345269000188",
              "nome": "DENTAL PORTO IMPORTACAO E EXPORTACAO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2129.6,
                  "valorUnitario": 24.2
                },
                "valorInformado": 24.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1302.4,
                  "valorUnitario": 14.8
                },
                "valorInformado": 14.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 88,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MDR\t/\tMDR",
            "modeloVersao": "UTILIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2129.6,
                  "valorUnitario": 24.2
                },
                "valorInformado": 24.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1432.64,
                  "valorUnitario": 16.28
                },
                "valorInformado": 16.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 88,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER / ASFER",
            "modeloVersao": "UTILIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2129.6,
                  "valorUnitario": 24.2
                },
                "valorInformado": 24.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1520.64,
                  "valorUnitario": 17.28
                },
                "valorInformado": 17.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 88,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TECHNEW / TECHNEW / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2129.6,
                  "valorUnitario": 24.2
                },
                "valorInformado": 24.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1544.4,
                  "valorUnitario": 17.55
                },
                "valorInformado": 17.55
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 88,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER",
            "modeloVersao": "ASFER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2125.2,
                  "valorUnitario": 24.15
                },
                "valorInformado": 24.15
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1774.96,
                  "valorUnitario": 20.17
                },
                "valorInformado": 20.17
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 88,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MDR",
            "modeloVersao": "MDR",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2129.6,
                  "valorUnitario": 24.2
                },
                "valorInformado": 24.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2129.6,
                  "valorUnitario": 24.2
                },
                "valorInformado": 24.2
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 88,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "CAIXA C/ 5 LÂMINAS ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -23,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G3",
    "descricao": "Grupo 3",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
    "participacaoExclusivaMeEppOuEquiparadas": "Não",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 186619.6,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 6,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 186619.6,
              "valorUnitario": null
            },
            "valorInformado": 186619.6
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 113025.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "25386019000149",
          "nome": "FARMODONTO PRODUTOS HOSPITALARES LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta com as unidades de medida corrigidas (porte de 12g para o(s) item(ns) 16), no prazo determinado em sistema..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 186619.6,
              "valorUnitario": null
            },
            "valorInformado": 186619.6
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 116650.15,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "10696932000174",
          "nome": "T.D. & V. COMERCIO DE PRODUTOS ODONTOLOGICOS E HOSPITALARES LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Não",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 185822.95,
              "valorUnitario": null
            },
            "valorInformado": 185822.95
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 117836.9,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "26395502000152",
          "nome": "DENTAL UNIVERSO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 186619.6,
              "valorUnitario": null
            },
            "valorInformado": 186619.6
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 132101.1,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "07010532000159",
          "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 197038.6,
              "valorUnitario": null
            },
            "valorInformado": 197038.6
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 155240.1,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 186619.6,
              "valorUnitario": null
            },
            "valorInformado": 186619.6
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 186619.6,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02477571000147",
          "nome": "DENTAL MED SUL ARTIGOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Não",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 199131.1,
              "valorUnitario": null
            },
            "valorInformado": 199131.1
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 198051.1,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "91828244000112",
          "nome": "DENTARIA KLYMUS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Não",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 11,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "11",
        "descricao": "Articaína",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
        "participacaoExclusivaMeEppOuEquiparadas": "Não",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 8000,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 4.19,
        "valorEstimadoTotal": 33520.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 33520.0,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 20800.0,
                  "valorUnitario": 2.6
                },
                "valorInformado": 2.6
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8000,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DFL",
            "modeloVersao": "DFL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "25386019000149",
              "nome": "FARMODONTO PRODUTOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 33520.0,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 22000.0,
                  "valorUnitario": 2.75
                },
                "valorInformado": 2.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "ARTICAINE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "10696932000174",
              "nome": "T.D. & V. COMERCIO DE PRODUTOS ODONTOLOGICOS E HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 33440.0,
                  "valorUnitario": 4.18
                },
                "valorInformado": 4.18
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 22000.0,
                  "valorUnitario": 2.75
                },
                "valorInformado": 2.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8000,
            "descricaoDetalhada": "Articaína - Articaína Composição: Associada Com Epinefrina , Concentração: 4% + 1/100.000 , Forma Farmacêutica: Solução Injetável",
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "ARTICAINE 1:100.000",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 33520.0,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 24000.0,
                  "valorUnitario": 3.0
                },
                "valorInformado": 3.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ARTICAINE\t/\tDFL",
            "modeloVersao": " 4%, COM EPINEFRINA 1:100.000",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 33520.0,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 33520.0,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ARTICAINE / DFL / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 33520.0,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 33520.0,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL ",
            "modeloVersao": "DFL ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02477571000147",
              "nome": "DENTAL MED SUL ARTIGOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 36960.0,
                  "valorUnitario": 4.62
                },
                "valorInformado": 4.62
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 36960.0,
                  "valorUnitario": 4.62
                },
                "valorInformado": 4.62
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ARTICAINA / DFL",
            "modeloVersao": "Tubete 1,80 ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "91828244000112",
              "nome": "DENTARIA KLYMUS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 12,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "12",
        "descricao": "Lidocaína Cloridrato",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
        "participacaoExclusivaMeEppOuEquiparadas": "Não",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 27000,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 3.18,
        "valorEstimadoTotal": 85860.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 85860.0,
                  "valorUnitario": 3.18
                },
                "valorInformado": 3.18
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 48600.0,
                  "valorUnitario": 1.8
                },
                "valorInformado": 1.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 27000,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DFL",
            "modeloVersao": "DFL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "25386019000149",
              "nome": "FARMODONTO PRODUTOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 85860.0,
                  "valorUnitario": 3.18
                },
                "valorInformado": 3.18
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 49950.0,
                  "valorUnitario": 1.85
                },
                "valorInformado": 1.85
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 27000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "ALPHACAINE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "10696932000174",
              "nome": "T.D. & V. COMERCIO DE PRODUTOS ODONTOLOGICOS E HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 85590.0,
                  "valorUnitario": 3.17
                },
                "valorInformado": 3.17
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 50220.0,
                  "valorUnitario": 1.86
                },
                "valorInformado": 1.86
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 27000,
            "descricaoDetalhada": "Lidocaína Cloridrato - Lidocaína Cloridrato Composição: Associada Com Epinefrina , Dosagem: 2% + 1:100.000 , Apresentação: Injetável",
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "ALPHACAINE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 85860.0,
                  "valorUnitario": 3.18
                },
                "valorInformado": 3.18
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 58050.0,
                  "valorUnitario": 2.15
                },
                "valorInformado": 2.15
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 27000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ALPHACAINE\t/\tDFL",
            "modeloVersao": "2%, COM EPINEFRINA 1:100.000",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 85860.0,
                  "valorUnitario": 3.18
                },
                "valorInformado": 3.18
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 62370.0,
                  "valorUnitario": 2.31
                },
                "valorInformado": 2.31
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 27000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "LIDOSTESIN AD / DLA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 85860.0,
                  "valorUnitario": 3.18
                },
                "valorInformado": 3.18
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 85860.0,
                  "valorUnitario": 3.18
                },
                "valorInformado": 3.18
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 27000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL ALPHACAINE ",
            "modeloVersao": "DFL ALPHACAINE ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02477571000147",
              "nome": "DENTAL MED SUL ARTIGOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 85860.0,
                  "valorUnitario": 3.18
                },
                "valorInformado": 3.18
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 84780.0,
                  "valorUnitario": 3.14
                },
                "valorInformado": 3.14
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 27000,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ALPHACAINA / DFL",
            "modeloVersao": "Tubete 1,80 ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "91828244000112",
              "nome": "DENTARIA KLYMUS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 13,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "13",
        "descricao": "Mepivacaína Cloridrato",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
        "participacaoExclusivaMeEppOuEquiparadas": "Não",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 8750,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 3.9,
        "valorEstimadoTotal": 34125.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 34125.0,
                  "valorUnitario": 3.9
                },
                "valorInformado": 3.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 21000.0,
                  "valorUnitario": 2.4
                },
                "valorInformado": 2.4
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8750,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DFL",
            "modeloVersao": "DFL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "25386019000149",
              "nome": "FARMODONTO PRODUTOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 34125.0,
                  "valorUnitario": 3.9
                },
                "valorInformado": 3.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 21612.5,
                  "valorUnitario": 2.47
                },
                "valorInformado": 2.47
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "MEPIADRE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "10696932000174",
              "nome": "T.D. & V. COMERCIO DE PRODUTOS ODONTOLOGICOS E HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 34037.5,
                  "valorUnitario": 3.89
                },
                "valorInformado": 3.89
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 21700.0,
                  "valorUnitario": 2.48
                },
                "valorInformado": 2.48
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8750,
            "descricaoDetalhada": "Mepivacaína Cloridrato - Mepivacaína Cloridrato Apresentação: Associada Com Epinefrina , Dosagem: 2% + 1:100.000",
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "MEPIADRE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 34125.0,
                  "valorUnitario": 3.9
                },
                "valorInformado": 3.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 23625.0,
                  "valorUnitario": 2.7
                },
                "valorInformado": 2.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEPIADRE\t/\tDFL",
            "modeloVersao": "2% COM EPINEFRINA 1:100.000",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 34125.0,
                  "valorUnitario": 3.9
                },
                "valorInformado": 3.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 26862.5,
                  "valorUnitario": 3.07
                },
                "valorInformado": 3.07
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEPIVALEN AD / DLA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 34125.0,
                  "valorUnitario": 3.9
                },
                "valorInformado": 3.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 34125.0,
                  "valorUnitario": 3.9
                },
                "valorInformado": 3.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL MEPIADRE",
            "modeloVersao": "DFL MEPIADRE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02477571000147",
              "nome": "DENTAL MED SUL ARTIGOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 36662.5,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 36662.5,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 8750,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEPIVACAINA / DFL",
            "modeloVersao": "Tubete 1,80 ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "91828244000112",
              "nome": "DENTARIA KLYMUS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 14,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "14",
        "descricao": "Mepivacaína Cloridrato",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
        "participacaoExclusivaMeEppOuEquiparadas": "Não",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 1650,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 3.45,
        "valorEstimadoTotal": 5692.5,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 5692.5,
                  "valorUnitario": 3.45
                },
                "valorInformado": 3.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3960.0,
                  "valorUnitario": 2.4
                },
                "valorInformado": 2.4
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 1650,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DFL",
            "modeloVersao": "DFL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "25386019000149",
              "nome": "FARMODONTO PRODUTOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 5692.5,
                  "valorUnitario": 3.45
                },
                "valorInformado": 3.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4075.5,
                  "valorUnitario": 2.47
                },
                "valorInformado": 2.47
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 1650,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "MEPISV",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "10696932000174",
              "nome": "T.D. & V. COMERCIO DE PRODUTOS ODONTOLOGICOS E HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 5676.0,
                  "valorUnitario": 3.44
                },
                "valorInformado": 3.44
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4092.0,
                  "valorUnitario": 2.48
                },
                "valorInformado": 2.48
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 1650,
            "descricaoDetalhada": "Mepivacaína Cloridrato - Mepivacaína Cloridrato Concentração: 3% , Forma Farmacêutica: Solução Injetável",
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "MEPISV",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 5692.5,
                  "valorUnitario": 3.45
                },
                "valorInformado": 3.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4455.0,
                  "valorUnitario": 2.7
                },
                "valorInformado": 2.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 1650,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEPISV\t/\tDFL",
            "modeloVersao": "3% sem vasoconstritor ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 5692.5,
                  "valorUnitario": 3.45
                },
                "valorInformado": 3.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 5065.5,
                  "valorUnitario": 3.07
                },
                "valorInformado": 3.07
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 1650,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEPIVALEN  / DLA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 5692.5,
                  "valorUnitario": 3.45
                },
                "valorInformado": 3.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 5692.5,
                  "valorUnitario": 3.45
                },
                "valorInformado": 3.45
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 1650,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL MEPISV",
            "modeloVersao": "DFL MEPISV",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02477571000147",
              "nome": "DENTAL MED SUL ARTIGOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6913.5,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 6913.5,
                  "valorUnitario": 4.19
                },
                "valorInformado": 4.19
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 1650,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEPIVACAINA / DFL",
            "modeloVersao": "Tubete 1,80 ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "91828244000112",
              "nome": "DENTARIA KLYMUS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 15,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "15",
        "descricao": "Prilocaína",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
        "participacaoExclusivaMeEppOuEquiparadas": "Não",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 6900,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 3.49,
        "valorEstimadoTotal": 24081.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24081.0,
                  "valorUnitario": 3.49
                },
                "valorInformado": 3.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 15870.0,
                  "valorUnitario": 2.3
                },
                "valorInformado": 2.3
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 6900,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DFL",
            "modeloVersao": "DFL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "25386019000149",
              "nome": "FARMODONTO PRODUTOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24081.0,
                  "valorUnitario": 3.49
                },
                "valorInformado": 3.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 16215.0,
                  "valorUnitario": 2.35
                },
                "valorInformado": 2.35
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 6900,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "PRILONEST",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "10696932000174",
              "nome": "T.D. & V. COMERCIO DE PRODUTOS ODONTOLOGICOS E HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 23805.0,
                  "valorUnitario": 3.45
                },
                "valorInformado": 3.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 16974.0,
                  "valorUnitario": 2.46
                },
                "valorInformado": 2.46
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 6900,
            "descricaoDetalhada": "Prilocaína - Prilocaína Composição: Associada Com Felipressina , Dosagem: 3% + 0,03ui/Ml , Apresentação: Injetável",
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "PRILONEST",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24081.0,
                  "valorUnitario": 3.49
                },
                "valorInformado": 3.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 18630.0,
                  "valorUnitario": 2.7
                },
                "valorInformado": 2.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 6900,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PRILONEST\t/\tDFL",
            "modeloVersao": "3%, COM FELIPRESSINA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 34500.0,
                  "valorUnitario": 5.0
                },
                "valorInformado": 5.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 24081.0,
                  "valorUnitario": 3.49
                },
                "valorInformado": 3.49
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 6900,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PRILONEST / DFL / NAC",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24081.0,
                  "valorUnitario": 3.49
                },
                "valorInformado": 3.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 24081.0,
                  "valorUnitario": 3.49
                },
                "valorInformado": 3.49
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 6900,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL - PRILONEST",
            "modeloVersao": "DFL - PRILONEST",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02477571000147",
              "nome": "DENTAL MED SUL ARTIGOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 29394.0,
                  "valorUnitario": 4.26
                },
                "valorInformado": 4.26
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 29394.0,
                  "valorUnitario": 4.26
                },
                "valorInformado": 4.26
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 6900,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PRILONEST / DFL",
            "modeloVersao": "Tubete 1,80 ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "91828244000112",
              "nome": "DENTARIA KLYMUS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 16,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "16",
        "descricao": "Benzocaína",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Nenhum",
        "participacaoExclusivaMeEppOuEquiparadas": "Não",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 215,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 15.54,
        "valorEstimadoTotal": 3341.1,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2795.0,
                  "valorUnitario": 13.0
                },
                "valorInformado": 13.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 215,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DFL",
            "modeloVersao": "DFL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "25386019000149",
              "nome": "FARMODONTO PRODUTOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2797.15,
                  "valorUnitario": 13.01
                },
                "valorInformado": 13.01
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 215,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "BENZOTOP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "10696932000174",
              "nome": "T.D. & V. COMERCIO DE PRODUTOS ODONTOLOGICOS E HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3274.45,
                  "valorUnitario": 15.23
                },
                "valorInformado": 15.23
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2850.9,
                  "valorUnitario": 13.26
                },
                "valorInformado": 13.26
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 215,
            "descricaoDetalhada": "Benzocaína - Benzocaína Concentração: 20% , Uso: Gel Tópico",
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "BENZOTOP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 215,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BENZOTOP\t/\tDFL",
            "modeloVersao": "TÓPICO",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 215,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BENZOTOP / DFL / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 215,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DENZOTOP - DFL",
            "modeloVersao": "DENZOTOP - DFL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02477571000147",
              "nome": "DENTAL MED SUL ARTIGOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3341.1,
                  "valorUnitario": 15.54
                },
                "valorInformado": 15.54
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 215,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BENZOTOP / DFL",
            "modeloVersao": "Tubete 1,80 ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "91828244000112",
              "nome": "DENTARIA KLYMUS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Não",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -25,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G1",
    "descricao": "Grupo 1",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 5881.23,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5881.23,
              "valorUnitario": null
            },
            "valorInformado": 5881.23
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3880.8,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "07010532000159",
          "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta atualizada, com catálogo detalhado, anexos e demais documentos referidos em Edital e Termo de Referência deste certame, relativo a este item, no prazo determinado e publicado neste sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-19T17:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5881.23,
              "valorUnitario": null
            },
            "valorInformado": 5881.23
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3920.4,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 274339.53,
              "valorUnitario": null
            },
            "valorInformado": 274339.53
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4378.44,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "37630133000151",
          "nome": "EXCLUSIVA MEDIC PRODUTOS MEDICOS HOSPITALARES LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5881.23,
              "valorUnitario": null
            },
            "valorInformado": 5881.23
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4379.76,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5881.23,
              "valorUnitario": null
            },
            "valorInformado": 5881.23
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4582.47,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5859.9,
              "valorUnitario": null
            },
            "valorInformado": 5859.9
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5859.9,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "50541407000102",
          "nome": "THIAGO ALMEIDA DA SILVA LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5879.91,
              "valorUnitario": null
            },
            "valorInformado": 5879.91
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5879.91,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "22077847000107",
          "nome": "JOSE DANTAS DINIZ FILHO",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 6,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "6",
        "descricao": "Agulha Odontológica",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 63,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 50.31,
        "valorEstimadoTotal": 3169.53,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3169.53,
                  "valorUnitario": 50.31
                },
                "valorInformado": 50.31
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1852.2,
                  "valorUnitario": 29.4
                },
                "valorInformado": 29.4
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DENCOJET \t/\tDFL",
            "modeloVersao": " 27G longa",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3169.53,
                  "valorUnitario": 50.31
                },
                "valorInformado": 50.31
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1871.1,
                  "valorUnitario": 29.7
                },
                "valorInformado": 29.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE",
            "modeloVersao": "PROCARE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3169.53,
                  "valorUnitario": 50.31
                },
                "valorInformado": 50.31
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2089.71,
                  "valorUnitario": 33.17
                },
                "valorInformado": 33.17
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE",
            "modeloVersao": "27G LONGA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "37630133000151",
              "nome": "EXCLUSIVA MEDIC PRODUTOS MEDICOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3169.53,
                  "valorUnitario": 50.31
                },
                "valorInformado": 50.31
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2090.34,
                  "valorUnitario": 33.18
                },
                "valorInformado": 33.18
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE / LABOR IMPORT / IMP ",
            "modeloVersao": "IMP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3169.53,
                  "valorUnitario": 50.31
                },
                "valorInformado": 50.31
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2186.1,
                  "valorUnitario": 34.7
                },
                "valorInformado": 34.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE / PROCARE",
            "modeloVersao": "27G LONGA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3168.9,
                  "valorUnitario": 50.3
                },
                "valorInformado": 50.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3168.9,
                  "valorUnitario": 50.3
                },
                "valorInformado": 50.3
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "DFL",
            "modeloVersao": "AGULHA LONGA 27G",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3168.9,
                  "valorUnitario": 50.3
                },
                "valorInformado": 50.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3168.9,
                  "valorUnitario": 50.3
                },
                "valorInformado": 50.3
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": "Agulha Odontológica - Agulha Odontológica Material: Aço Inoxidável Siliconizado , Aplicação: Gengival / Anestesia , Dimensão: 27 G Longa , Tipo Ponta*: Com Bisel Trifacetado , Tipo Conexão: Conector P/ Seringa Carpule , Tipo Uso: Estéril, Descartável , Apresentação: C/ Protetor Plástico E Lacre",
            "situacao": "None",
            "marcaFabricante": "PROCARE",
            "modeloVersao": "PROCARE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "22077847000107",
              "nome": "JOSE DANTAS DINIZ FILHO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 7,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "7",
        "descricao": "Agulha odontológica",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 69,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 39.3,
        "valorEstimadoTotal": 2711.7,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2711.7,
                  "valorUnitario": 39.3
                },
                "valorInformado": 39.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2028.6,
                  "valorUnitario": 29.4
                },
                "valorInformado": 29.4
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 69,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "DENCOJET \t/\tDFL",
            "modeloVersao": "30G curta",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2711.7,
                  "valorUnitario": 39.3
                },
                "valorInformado": 39.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2049.3,
                  "valorUnitario": 29.7
                },
                "valorInformado": 29.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 69,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE",
            "modeloVersao": "PROCARE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 271170.0,
                  "valorUnitario": 3930.0
                },
                "valorInformado": 3930.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2288.73,
                  "valorUnitario": 33.17
                },
                "valorInformado": 33.17
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 69,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE",
            "modeloVersao": "30G CURTA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "37630133000151",
              "nome": "EXCLUSIVA MEDIC PRODUTOS MEDICOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2711.7,
                  "valorUnitario": 39.3
                },
                "valorInformado": 39.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2289.42,
                  "valorUnitario": 33.18
                },
                "valorInformado": 33.18
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 69,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE / LABOR IMPORT / IMP ",
            "modeloVersao": "IMP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2711.7,
                  "valorUnitario": 39.3
                },
                "valorInformado": 39.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2396.37,
                  "valorUnitario": 34.73
                },
                "valorInformado": 34.73
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 69,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PROCARE / PROCARE",
            "modeloVersao": "30G CURTAQ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2691.0,
                  "valorUnitario": 39.0
                },
                "valorInformado": 39.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2691.0,
                  "valorUnitario": 39.0
                },
                "valorInformado": 39.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 69,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BESTCARE",
            "modeloVersao": "AGULHA CURTA 30G",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2711.01,
                  "valorUnitario": 39.29
                },
                "valorInformado": 39.29
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2711.01,
                  "valorUnitario": 39.29
                },
                "valorInformado": 39.29
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 69,
            "descricaoDetalhada": "Agulha odontológica - Agulha Odontológica Material: Aço Inoxidável Siliconizado , Aplicação: Gengival / Anestesia , Dimensão: 30 G Curta , Tipo Ponta*: Com Bisel Trifacetado , Tipo Conexão: Conector P/ Seringa Carpule , Tipo Uso: Estéril, Descartável , Apresentação: C/ Protetor Plástico E Lacre",
            "situacao": "None",
            "marcaFabricante": "PROCARE",
            "modeloVersao": "PROCARE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "22077847000107",
              "nome": "JOSE DANTAS DINIZ FILHO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -20,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G6",
    "descricao": "Grupo 6",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 2256.78,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2256.78,
              "valorUnitario": null
            },
            "valorInformado": 2256.78
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2154.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante.  Para o devido andamento do processo, conforme preconizado no Edital e Termo de Referência, solicito que anexe o contrato social atualizado da empresa, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2256.78,
              "valorUnitario": null
            },
            "valorInformado": 2256.78
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2181.88,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 31,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "31",
        "descricao": "Edta",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 26,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 20.28,
        "valorEstimadoTotal": 527.28,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 527.28,
                  "valorUnitario": 20.28
                },
                "valorInformado": 20.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 494.0,
                  "valorUnitario": 19.0
                },
                "valorInformado": 19.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 26,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "EDTA GEL SERINGA / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 527.28,
                  "valorUnitario": 20.28
                },
                "valorInformado": 20.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 527.28,
                  "valorUnitario": 20.28
                },
                "valorInformado": 20.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 26,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 32,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "32",
        "descricao": "Edta",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 250,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 6.19,
        "valorEstimadoTotal": 1547.5,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1547.5,
                  "valorUnitario": 6.19
                },
                "valorInformado": 6.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1500.0,
                  "valorUnitario": 6.0
                },
                "valorInformado": 6.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 250,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "BIODINAMICA / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1547.5,
                  "valorUnitario": 6.19
                },
                "valorInformado": 6.19
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1495.0,
                  "valorUnitario": 5.98
                },
                "valorInformado": 5.98
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 250,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 33,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "33",
        "descricao": "Edta",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 20,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 9.1,
        "valorEstimadoTotal": 182.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 182.0,
                  "valorUnitario": 9.1
                },
                "valorInformado": 9.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 160.0,
                  "valorUnitario": 8.0
                },
                "valorInformado": 8.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 20,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "BIODINAMICA / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 182.0,
                  "valorUnitario": 9.1
                },
                "valorInformado": 9.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 159.6,
                  "valorUnitario": 7.98
                },
                "valorInformado": 7.98
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 20,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -19,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G7",
    "descricao": "Grupo 7",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 60191.28,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60191.28,
              "valorUnitario": null
            },
            "valorInformado": 60191.28
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 41294.43,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "27205945000104",
          "nome": "ODONTOMED T/A LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para atender ao especificado em Edital, solicitamos o encaminhamento do anexo V (preposto), no prazo determinado.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60191.28,
              "valorUnitario": null
            },
            "valorInformado": 60191.28
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 41300.1,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "37630133000151",
          "nome": "EXCLUSIVA MEDIC PRODUTOS MEDICOS HOSPITALARES LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60177.0,
              "valorUnitario": null
            },
            "valorInformado": 60177.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 47880.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60191.28,
              "valorUnitario": null
            },
            "valorInformado": 60191.28
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 48274.35,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60183.54,
              "valorUnitario": null
            },
            "valorInformado": 60183.54
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 50805.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "50541407000102",
          "nome": "THIAGO ALMEIDA DA SILVA LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60191.28,
              "valorUnitario": null
            },
            "valorInformado": 60191.28
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 52615.86,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 60191.28,
              "valorUnitario": null
            },
            "valorInformado": 60191.28
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 53864.49,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 38,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "38",
        "descricao": "Filme Radiológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 57,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 426.93,
        "valorEstimadoTotal": 24335.01,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24335.01,
                  "valorUnitario": 426.93
                },
                "valorInformado": 426.93
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 15919.53,
                  "valorUnitario": 279.29
                },
                "valorInformado": 279.29
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 57,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "OCLUSAL IO-41 ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "27205945000104",
              "nome": "ODONTOMED T/A LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24335.01,
                  "valorUnitario": 426.93
                },
                "valorInformado": 426.93
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 15914.4,
                  "valorUnitario": 279.2
                },
                "valorInformado": 279.2
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 57,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "OCLUSAL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "37630133000151",
              "nome": "EXCLUSIVA MEDIC PRODUTOS MEDICOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24327.6,
                  "valorUnitario": 426.8
                },
                "valorInformado": 426.8
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 19152.0,
                  "valorUnitario": 336.0
                },
                "valorInformado": 336.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 57,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAN",
            "modeloVersao": "CARESTREAN",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24335.01,
                  "valorUnitario": 426.93
                },
                "valorInformado": 426.93
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 19700.91,
                  "valorUnitario": 345.63
                },
                "valorInformado": 345.63
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 57,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "KODAK / CARESTREAM",
            "modeloVersao": "EMBALAGEM C/25 UNIDADES",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24333.3,
                  "valorUnitario": 426.9
                },
                "valorInformado": 426.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 20235.0,
                  "valorUnitario": 355.0
                },
                "valorInformado": 355.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 57,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "FILME OCLUSAL IO-41 F-SPEDD",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24335.01,
                  "valorUnitario": 426.93
                },
                "valorInformado": 426.93
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 21276.96,
                  "valorUnitario": 373.28
                },
                "valorInformado": 373.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 57,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "CARESTREAM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 24335.01,
                  "valorUnitario": 426.93
                },
                "valorInformado": 426.93
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 21384.12,
                  "valorUnitario": 375.16
                },
                "valorInformado": 375.16
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 57,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM / CARESTREAM / IMP ",
            "modeloVersao": "IMP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 39,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "39",
        "descricao": "Filme Radiológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 63,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 338.89,
        "valorEstimadoTotal": 21350.07,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 21350.07,
                  "valorUnitario": 338.89
                },
                "valorInformado": 338.89
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 14496.3,
                  "valorUnitario": 230.1
                },
                "valorInformado": 230.1
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "INFANTIL IP-01 ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "27205945000104",
              "nome": "ODONTOMED T/A LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 21350.07,
                  "valorUnitario": 338.89
                },
                "valorInformado": 338.89
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 14231.7,
                  "valorUnitario": 225.9
                },
                "valorInformado": 225.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "INFANTIL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "37630133000151",
              "nome": "EXCLUSIVA MEDIC PRODUTOS MEDICOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 21344.4,
                  "valorUnitario": 338.8
                },
                "valorInformado": 338.8
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 17388.0,
                  "valorUnitario": 276.0
                },
                "valorInformado": 276.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAN",
            "modeloVersao": "CARESTREAN",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 21350.07,
                  "valorUnitario": 338.89
                },
                "valorInformado": 338.89
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 18073.44,
                  "valorUnitario": 286.88
                },
                "valorInformado": 286.88
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "KODAK / CARESTREAM",
            "modeloVersao": "CAIXA C/100 UNIDADES",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 21349.44,
                  "valorUnitario": 338.88
                },
                "valorInformado": 338.88
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 18270.0,
                  "valorUnitario": 290.0
                },
                "valorInformado": 290.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "FILME RADIOGRÁFICO INSIGHT INFA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 21350.07,
                  "valorUnitario": 338.89
                },
                "valorInformado": 338.89
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 18540.9,
                  "valorUnitario": 294.3
                },
                "valorInformado": 294.3
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "CARESTREAM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 21350.07,
                  "valorUnitario": 338.89
                },
                "valorInformado": 338.89
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 19617.57,
                  "valorUnitario": 311.39
                },
                "valorInformado": 311.39
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM / CARESTREAM / IMP ",
            "modeloVersao": "IMP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 40,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "40",
        "descricao": "Filme Radiológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 60,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 241.77,
        "valorEstimadoTotal": 14506.2,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14506.2,
                  "valorUnitario": 241.77
                },
                "valorInformado": 241.77
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 10878.6,
                  "valorUnitario": 181.31
                },
                "valorInformado": 181.31
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 60,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "E-SPEED",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "27205945000104",
              "nome": "ODONTOMED T/A LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14506.2,
                  "valorUnitario": 241.77
                },
                "valorInformado": 241.77
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 11154.0,
                  "valorUnitario": 185.9
                },
                "valorInformado": 185.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 60,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "ADULTO",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "37630133000151",
              "nome": "EXCLUSIVA MEDIC PRODUTOS MEDICOS HOSPITALARES LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14505.0,
                  "valorUnitario": 241.75
                },
                "valorInformado": 241.75
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 11340.0,
                  "valorUnitario": 189.0
                },
                "valorInformado": 189.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 60,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAN",
            "modeloVersao": "CARESTREAN",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14506.2,
                  "valorUnitario": 241.77
                },
                "valorInformado": 241.77
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 10500.0,
                  "valorUnitario": 175.0
                },
                "valorInformado": 175.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 60,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "KODAK / CARERSTREam",
            "modeloVersao": "embalagem c/150 unidades",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14500.8,
                  "valorUnitario": 241.68
                },
                "valorInformado": 241.68
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 12300.0,
                  "valorUnitario": 205.0
                },
                "valorInformado": 205.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 60,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "FILME E-SPEED ADULTO",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14506.2,
                  "valorUnitario": 241.77
                },
                "valorInformado": 241.77
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 12798.0,
                  "valorUnitario": 213.3
                },
                "valorInformado": 213.3
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 60,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM",
            "modeloVersao": "CARESTREAM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 14506.2,
                  "valorUnitario": 241.77
                },
                "valorInformado": 241.77
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 12862.8,
                  "valorUnitario": 214.38
                },
                "valorInformado": 214.38
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 60,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CARESTREAM / CARESTREAM / IMP ",
            "modeloVersao": "IMP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -18,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G8",
    "descricao": "Grupo 8",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 14246.79,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 6,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14246.79,
              "valorUnitario": null
            },
            "valorInformado": 14246.79
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7450.4,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe a proposta, com definição da marca a ser fornecida em cada produto, com seus demais anexos, conforme descrito no Edital e Termo de Referência, e demais documentos correlatos, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T18:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14226.5,
              "valorUnitario": null
            },
            "valorInformado": 14226.5
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7561.94,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14240.91,
              "valorUnitario": null
            },
            "valorInformado": 14240.91
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8068.8,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "50541407000102",
          "nome": "THIAGO ALMEIDA DA SILVA LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14246.79,
              "valorUnitario": null
            },
            "valorInformado": 14246.79
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 9003.25,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14653.0,
              "valorUnitario": null
            },
            "valorInformado": 14653.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12043.21,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "04541813000140",
          "nome": "MB MARTINS SERVICOS, PRODUTOS E EQUIPAMENTOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14230.05,
              "valorUnitario": null
            },
            "valorInformado": 14230.05
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12043.9,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "05136679000164",
          "nome": "RJD HOSPITALAR LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14653.0,
              "valorUnitario": null
            },
            "valorInformado": 14653.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 14653.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "28738385000108",
          "nome": "NEW LIFE COMERCIO DE MATERIAIS E EQUIPAMENTOS CIRURGICOS E PRESTACOES DE SERVICO",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 41,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "41",
        "descricao": "Fio de sutura agulhado",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 75,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 64.17,
        "valorEstimadoTotal": 4812.75,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4812.75,
                  "valorUnitario": 64.17
                },
                "valorInformado": 64.17
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2531.25,
                  "valorUnitario": 33.75
                },
                "valorInformado": 33.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "MEDIX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4800.0,
                  "valorUnitario": 64.0
                },
                "valorInformado": 64.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2681.25,
                  "valorUnitario": 35.75
                },
                "valorInformado": 35.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WILCOS MASTER",
            "modeloVersao": "WILCOS MASTER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4807.5,
                  "valorUnitario": 64.1
                },
                "valorInformado": 64.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2992.5,
                  "valorUnitario": 39.9
                },
                "valorInformado": 39.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "TOP QUALITY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4812.75,
                  "valorUnitario": 64.17
                },
                "valorInformado": 64.17
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3300.0,
                  "valorUnitario": 44.0
                },
                "valorInformado": 44.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / TECHNOFIO / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4950.0,
                  "valorUnitario": 66.0
                },
                "valorInformado": 66.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4725.0,
                  "valorUnitario": 63.0
                },
                "valorInformado": 63.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "technofio ",
            "modeloVersao": "technofio ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "04541813000140",
              "nome": "MB MARTINS SERVICOS, PRODUTOS E EQUIPAMENTOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4950.0,
                  "valorUnitario": 66.0
                },
                "valorInformado": 66.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4950.0,
                  "valorUnitario": 66.0
                },
                "valorInformado": 66.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": "Fio de sutura agulhado - Fio De Sutura Agulhado Material Fio: Seda Preto , Modelo Fio: Multifilamentar , Diâmetro Fio: 3-0 , Comprimento Fio: Cerca De 45 CM, Tipo Agulha: Agulha 1/2 Círculo , Modelo Agulha: Cortante Reversa / Invertida , Comprimento Agulha: Cerca De 18 MM, Esterilidade: Estéril , Apresentação: Embalagem Individual",
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / ACE INDUSTRIA E COMERCIO",
            "modeloVersao": "SO34MT17",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "28738385000108",
              "nome": "NEW LIFE COMERCIO DE MATERIAIS E EQUIPAMENTOS CIRURGICOS E PRESTACOES DE SERVICO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4812.75,
                  "valorUnitario": 64.17
                },
                "valorInformado": 64.17
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4435.5,
                  "valorUnitario": 59.14
                },
                "valorInformado": 59.14
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOLINE FIOS CIRÚRGICOS",
            "modeloVersao": "SBC30MT17",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "05136679000164",
              "nome": "RJD HOSPITALAR LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 42,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "42",
        "descricao": "Fio De Sutura Agulhado",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 63,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 51.36,
        "valorEstimadoTotal": 3235.68,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3235.68,
                  "valorUnitario": 51.36
                },
                "valorInformado": 51.36
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2126.25,
                  "valorUnitario": 33.75
                },
                "valorInformado": 33.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "MEDIX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3231.9,
                  "valorUnitario": 51.3
                },
                "valorInformado": 51.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2248.47,
                  "valorUnitario": 35.69
                },
                "valorInformado": 35.69
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WILCOS MASTER",
            "modeloVersao": "WILCOS MASTER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3235.05,
                  "valorUnitario": 51.35
                },
                "valorInformado": 51.35
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2513.7,
                  "valorUnitario": 39.9
                },
                "valorInformado": 39.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "TOP QUALITY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3235.68,
                  "valorUnitario": 51.36
                },
                "valorInformado": 51.36
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2772.0,
                  "valorUnitario": 44.0
                },
                "valorInformado": 44.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / TECHNOFIO / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3339.0,
                  "valorUnitario": 53.0
                },
                "valorInformado": 53.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3218.04,
                  "valorUnitario": 51.08
                },
                "valorInformado": 51.08
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "technofio ",
            "modeloVersao": "technofio ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "04541813000140",
              "nome": "MB MARTINS SERVICOS, PRODUTOS E EQUIPAMENTOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3339.0,
                  "valorUnitario": 53.0
                },
                "valorInformado": 53.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3339.0,
                  "valorUnitario": 53.0
                },
                "valorInformado": 53.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": "Fio De Sutura Agulhado - Fio De Sutura Agulhado Material Fio: Seda Preto , Modelo Fio: Multifilamentar , Diâmetro Fio: 4-0 , Comprimento Fio: Cerca De 45 CM, Tipo Agulha: Agulha 1/2 Círculo , Modelo Agulha: Cortante Reversa / Invertida , Comprimento Agulha: Cerca De 16 MM, Esterilidade: Estéril , Apresentação: Embalagem Individual",
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / ACE INDUSTRIA E COMERCIO",
            "modeloVersao": "SO44MT17",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "28738385000108",
              "nome": "NEW LIFE COMERCIO DE MATERIAIS E EQUIPAMENTOS CIRURGICOS E PRESTACOES DE SERVICO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3725.82,
                  "valorUnitario": 59.14
                },
                "valorInformado": 59.14
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3725.82,
                  "valorUnitario": 59.14
                },
                "valorInformado": 59.14
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOLINE FIOS CIRÚRGICOS",
            "modeloVersao": "SBC40MT17",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "05136679000164",
              "nome": "RJD HOSPITALAR LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 43,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "43",
        "descricao": "Fio De Sutura Agulhado",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 57.5,
        "valorEstimadoTotal": 747.5,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 747.5,
                  "valorUnitario": 57.5
                },
                "valorInformado": 57.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 742.3,
                  "valorUnitario": 57.1
                },
                "valorInformado": 57.1
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "BIOLLINE",
            "modeloVersao": "BIOLLINE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 746.85,
                  "valorUnitario": 57.45
                },
                "valorInformado": 57.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 463.58,
                  "valorUnitario": 35.66
                },
                "valorInformado": 35.66
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WILCOS MASTER",
            "modeloVersao": "WILCOS MASTER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 747.5,
                  "valorUnitario": 57.5
                },
                "valorInformado": 57.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 518.7,
                  "valorUnitario": 39.9
                },
                "valorInformado": 39.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "TOP QUALITY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 747.5,
                  "valorUnitario": 57.5
                },
                "valorInformado": 57.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 637.0,
                  "valorUnitario": 49.0
                },
                "valorInformado": 49.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOLINE / BIOLINE / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 780.0,
                  "valorUnitario": 60.0
                },
                "valorInformado": 60.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 747.5,
                  "valorUnitario": 57.5
                },
                "valorInformado": 57.5
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "shalon ",
            "modeloVersao": "shalon ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "04541813000140",
              "nome": "MB MARTINS SERVICOS, PRODUTOS E EQUIPAMENTOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 780.0,
                  "valorUnitario": 60.0
                },
                "valorInformado": 60.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 780.0,
                  "valorUnitario": 60.0
                },
                "valorInformado": 60.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Fio De Sutura Agulhado - Fio De Sutura Agulhado Material Fio: Seda Preto , Modelo Fio: Multifilamentar , Diâmetro Fio: 5-0 , Comprimento Fio: Cerca De 45 CM, Tipo Agulha: Agulha 1/2 Círculo , Modelo Agulha: Cortante Reversa / Invertida , Comprimento Agulha: Cerca De 16 MM, Esterilidade: Estéril , Apresentação: Embalagem Individual",
            "situacao": "None",
            "marcaFabricante": "BIOLINE / BIOLINE FIOS CIRURGICOS",
            "modeloVersao": "SD30MT17S3",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "28738385000108",
              "nome": "NEW LIFE COMERCIO DE MATERIAIS E EQUIPAMENTOS CIRURGICOS E PRESTACOES DE SERVICO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 768.82,
                  "valorUnitario": 59.14
                },
                "valorInformado": 59.14
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 768.82,
                  "valorUnitario": 59.14
                },
                "valorInformado": 59.14
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOLINE FIOS CIRÚRGICOS",
            "modeloVersao": "SBC50MT17",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "05136679000164",
              "nome": "RJD HOSPITALAR LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 44,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "44",
        "descricao": "Fio De Sutura Agulhado",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 7,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 70.28,
        "valorEstimadoTotal": 491.96,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 491.96,
                  "valorUnitario": 70.28
                },
                "valorInformado": 70.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 248.92,
                  "valorUnitario": 35.56
                },
                "valorInformado": 35.56
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "TECNOFIO",
            "modeloVersao": "TECNOFIO",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 491.4,
                  "valorUnitario": 70.2
                },
                "valorInformado": 70.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 249.62,
                  "valorUnitario": 35.66
                },
                "valorInformado": 35.66
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WILCOS MASTER",
            "modeloVersao": "WILCOS MASTER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 491.96,
                  "valorUnitario": 70.28
                },
                "valorInformado": 70.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 279.3,
                  "valorUnitario": 39.9
                },
                "valorInformado": 39.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "TOP QUALITY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 491.96,
                  "valorUnitario": 70.28
                },
                "valorInformado": 70.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 275.45,
                  "valorUnitario": 39.35
                },
                "valorInformado": 39.35
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / TECHNOFIO / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 504.0,
                  "valorUnitario": 72.0
                },
                "valorInformado": 72.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 369.95,
                  "valorUnitario": 52.85
                },
                "valorInformado": 52.85
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "technofio ",
            "modeloVersao": "technofio ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "04541813000140",
              "nome": "MB MARTINS SERVICOS, PRODUTOS E EQUIPAMENTOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 504.0,
                  "valorUnitario": 72.0
                },
                "valorInformado": 72.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 504.0,
                  "valorUnitario": 72.0
                },
                "valorInformado": 72.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": "Fio De Sutura Agulhado - Fio De Sutura Agulhado Material Fio: Nylon / Poliamida Preto , Modelo Fio: Monofilamentar , Diâmetro Fio: 4-0 , Comprimento Fio: Cerca De 45 CM, Tipo Agulha: Agulha 1/2 Círculo , Modelo Agulha: Cortante Reversa / Invertida , Comprimento Agulha: Cerca De 24 MM, Esterilidade: Estéril , Apresentação: Embalagem Individual",
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / ACE INDUSTRIA E COMERCIO",
            "modeloVersao": "NY44MT15",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "28738385000108",
              "nome": "NEW LIFE COMERCIO DE MATERIAIS E EQUIPAMENTOS CIRURGICOS E PRESTACOES DE SERVICO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 491.96,
                  "valorUnitario": 70.28
                },
                "valorInformado": 70.28
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 327.04,
                  "valorUnitario": 46.72
                },
                "valorInformado": 46.72
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOLINE FIOS CIRÚRGICOS",
            "modeloVersao": "BC40MT17",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "05136679000164",
              "nome": "RJD HOSPITALAR LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 45,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "45",
        "descricao": "Fio de sutura agulhado",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 38,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 105.9,
        "valorEstimadoTotal": 4024.2,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4024.2,
                  "valorUnitario": 105.9
                },
                "valorInformado": 105.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1353.18,
                  "valorUnitario": 35.61
                },
                "valorInformado": 35.61
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "TECNOFIO",
            "modeloVersao": "TECNOFIO",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4022.3,
                  "valorUnitario": 105.85
                },
                "valorInformado": 105.85
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1355.08,
                  "valorUnitario": 35.66
                },
                "valorInformado": 35.66
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WILCOS MASTER",
            "modeloVersao": "WILCOS MASTER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4024.2,
                  "valorUnitario": 105.9
                },
                "valorInformado": 105.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1314.8,
                  "valorUnitario": 34.6
                },
                "valorInformado": 34.6
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "TOP QUALITY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4024.2,
                  "valorUnitario": 105.9
                },
                "valorInformado": 105.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1485.8,
                  "valorUnitario": 39.1
                },
                "valorInformado": 39.1
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / TECHNOFIO / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4066.0,
                  "valorUnitario": 107.0
                },
                "valorInformado": 107.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2272.4,
                  "valorUnitario": 59.8
                },
                "valorInformado": 59.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "technofio ",
            "modeloVersao": "technofio ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "04541813000140",
              "nome": "MB MARTINS SERVICOS, PRODUTOS E EQUIPAMENTOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4066.0,
                  "valorUnitario": 107.0
                },
                "valorInformado": 107.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4066.0,
                  "valorUnitario": 107.0
                },
                "valorInformado": 107.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": "Fio de sutura agulhado - Fio De Sutura Agulhado Material Fio: Nylon / Poliamida Preto , Modelo Fio: Monofilamentar , Diâmetro Fio: 5-0 , Comprimento Fio: Cerca De 45 CM, Tipo Agulha: Agulha 1/2 Círculo , Modelo Agulha: Cortante Reversa / Invertida , Comprimento Agulha: Cerca De 24 MM, Esterilidade: Estéril , Apresentação: Embalagem Individual",
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / ACE INDUSTRIA E COMERCIO",
            "modeloVersao": "NY54MT15",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "28738385000108",
              "nome": "NEW LIFE COMERCIO DE MATERIAIS E EQUIPAMENTOS CIRURGICOS E PRESTACOES DE SERVICO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3496.0,
                  "valorUnitario": 92.0
                },
                "valorInformado": 92.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1910.26,
                  "valorUnitario": 50.27
                },
                "valorInformado": 50.27
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOLINE FIOS CIRÚRGICOS",
            "modeloVersao": "BC50MT17",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "05136679000164",
              "nome": "RJD HOSPITALAR LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 46,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "46",
        "descricao": "Fio De Sutura Agulhado",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 71.9,
        "valorEstimadoTotal": 934.7,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 934.7,
                  "valorUnitario": 71.9
                },
                "valorInformado": 71.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 448.5,
                  "valorUnitario": 34.5
                },
                "valorInformado": 34.5
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "MEDIX",
            "modeloVersao": "MEDIX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 934.05,
                  "valorUnitario": 71.85
                },
                "valorInformado": 71.85
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 563.94,
                  "valorUnitario": 43.38
                },
                "valorInformado": 43.38
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WILCOS MASTER",
            "modeloVersao": "WILCOS MASTER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 934.7,
                  "valorUnitario": 71.9
                },
                "valorInformado": 71.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 449.8,
                  "valorUnitario": 34.6
                },
                "valorInformado": 34.6
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TOP QUALITY",
            "modeloVersao": "MEDIX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 934.7,
                  "valorUnitario": 71.9
                },
                "valorInformado": 71.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 533.0,
                  "valorUnitario": 41.0
                },
                "valorInformado": 41.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / TECHNOFIO / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1014.0,
                  "valorUnitario": 78.0
                },
                "valorInformado": 78.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 710.32,
                  "valorUnitario": 54.64
                },
                "valorInformado": 54.64
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "technofio ",
            "modeloVersao": "technofio ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "04541813000140",
              "nome": "MB MARTINS SERVICOS, PRODUTOS E EQUIPAMENTOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1014.0,
                  "valorUnitario": 78.0
                },
                "valorInformado": 78.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1014.0,
                  "valorUnitario": 78.0
                },
                "valorInformado": 78.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Fio De Sutura Agulhado - Fio De Sutura Agulhado Material Fio: Nylon / Poliamida Preto , Modelo Fio: Monofilamentar , Diâmetro Fio: 5-0 , Comprimento Fio: Cerca De 45 CM, Tipo Agulha: Agulha 3/8 Círculo , Modelo Agulha: Cortante Reversa / Invertida , Comprimento Agulha: Cerca De 24 MM, Esterilidade: Estéril , Apresentação: Embalagem Individual",
            "situacao": "None",
            "marcaFabricante": "TECHNOFIO / ACE INDUSTRIA E COMERCIO",
            "modeloVersao": "NY54CT16",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "28738385000108",
              "nome": "NEW LIFE COMERCIO DE MATERIAIS E EQUIPAMENTOS CIRURGICOS E PRESTACOES DE SERVICO",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 934.7,
                  "valorUnitario": 71.9
                },
                "valorInformado": 71.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 876.46,
                  "valorUnitario": 67.42
                },
                "valorInformado": 67.42
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOLINE FIOS CIRÚRGICOS",
            "modeloVersao": "NL50CT19S3",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "05136679000164",
              "nome": "RJD HOSPITALAR LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -16,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G10",
    "descricao": "Grupo 10",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 914.4,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 914.4,
              "valorUnitario": null
            },
            "valorInformado": 914.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 513.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante.  Para o devido andamento do processo, conforme preconizado no Edital e Termo de Referência, solicito que anexe o contrato social atualizado da empresa, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 914.4,
              "valorUnitario": null
            },
            "valorInformado": 914.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 523.26,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 912.45,
              "valorUnitario": null
            },
            "valorInformado": 912.45
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 542.64,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 914.4,
              "valorUnitario": null
            },
            "valorInformado": 914.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 705.66,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 914.4,
              "valorUnitario": null
            },
            "valorInformado": 914.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 914.4,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "33992679000100",
          "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 53,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "53",
        "descricao": "Fluoreto De Sódio",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 39,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 7.1,
        "valorEstimadoTotal": 276.9,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 276.9,
                  "valorUnitario": 7.1
                },
                "valorInformado": 7.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 175.5,
                  "valorUnitario": 4.5
                },
                "valorInformado": 4.5
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 39,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ALLPLAN / ALLPLAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 276.9,
                  "valorUnitario": 7.1
                },
                "valorInformado": 7.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 179.01,
                  "valorUnitario": 4.59
                },
                "valorInformado": 4.59
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 39,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 274.95,
                  "valorUnitario": 7.05
                },
                "valorInformado": 7.05
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 185.64,
                  "valorUnitario": 4.76
                },
                "valorInformado": 4.76
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 39,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL S/SABOR",
            "modeloVersao": "IODONTOSUL S/SABOR",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 276.9,
                  "valorUnitario": 7.1
                },
                "valorInformado": 7.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 241.41,
                  "valorUnitario": 6.19
                },
                "valorInformado": 6.19
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 39,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MAQUIRA / MAQUIRA",
            "modeloVersao": "EMBALAGEM C/200ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 276.9,
                  "valorUnitario": 7.1
                },
                "valorInformado": 7.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 276.9,
                  "valorUnitario": 7.1
                },
                "valorInformado": 7.1
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 39,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "CAIXA C/ 20 ML ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 54,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "54",
        "descricao": "Fluoreto De Sódio",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 75,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 8.5,
        "valorEstimadoTotal": 637.5,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 637.5,
                  "valorUnitario": 8.5
                },
                "valorInformado": 8.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 337.5,
                  "valorUnitario": 4.5
                },
                "valorInformado": 4.5
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ALLPLAN / ALLPLAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 637.5,
                  "valorUnitario": 8.5
                },
                "valorInformado": 8.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 344.25,
                  "valorUnitario": 4.59
                },
                "valorInformado": 4.59
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 637.5,
                  "valorUnitario": 8.5
                },
                "valorInformado": 8.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 357.0,
                  "valorUnitario": 4.76
                },
                "valorInformado": 4.76
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 637.5,
                  "valorUnitario": 8.5
                },
                "valorInformado": 8.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 464.25,
                  "valorUnitario": 6.19
                },
                "valorInformado": 6.19
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MAQUIRA / MAQUIRA",
            "modeloVersao": "EMBALAGEM C/200ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 637.5,
                  "valorUnitario": 8.5
                },
                "valorInformado": 8.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 637.5,
                  "valorUnitario": 8.5
                },
                "valorInformado": 8.5
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 75,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "FRASCO C/ 200ML ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -15,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G11",
    "descricao": "Grupo 11",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 1181.48,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1161.0,
              "valorUnitario": null
            },
            "valorInformado": 1161.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 288.86,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Bom dia, Sr. Licitante.  Para o devido andamento do processo, solicito que anexe o certificado de regularidade do CTF/IBAMA do fabricante dos itens 35, 55, 56, 78, além do catálogo do item 69 e o anexo V (preposto), no prazo determinado no sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-22T13:00:00",
        "motivoDesclassificacao": "A empresa não apresentou o documento de CTF/IBAMA para o item, desobedecendo ao estabelecido em Termo de Referência. ",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1181.48,
              "valorUnitario": null
            },
            "valorInformado": 1181.48
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 289.12,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Bom dia, Sr. Licitante.  Conforme pedido feito, reabrimos o item para que anexe proposta atualizada, com catálogo detalhado, anexos e demais documentos referidos , além do certificado de regularidade do CTF/IBAMA do fabricante deste item, conforme preconizado no Termo de Referência.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-25T13:00:00",
        "motivoDesclassificacao": "A empresa não apresentou o documento de CTF/IBAMA para o item, desobedecendo ao estabelecido nas normativas do pregão. ",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1181.48,
              "valorUnitario": null
            },
            "valorInformado": 1181.48
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 364.08,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta atualizada, com catálogo detalhado, anexos e demais documentos referidos em Edital e Termo de Referência deste certame, relativo a este item, no prazo determinado e publicado neste sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-25T16:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1180.23,
              "valorUnitario": null
            },
            "valorInformado": 1180.23
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 407.54,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "26395502000152",
          "nome": "DENTAL UNIVERSO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1181.48,
              "valorUnitario": null
            },
            "valorInformado": 1181.48
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 439.52,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1181.48,
              "valorUnitario": null
            },
            "valorInformado": 1181.48
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1181.48,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "33992679000100",
          "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 55,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "55",
        "descricao": "Condicionador De Porcelana",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 28,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 28.49,
        "valorEstimadoTotal": 797.72,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 784.0,
                  "valorUnitario": 28.0
                },
                "valorInformado": 28.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 203.84,
                  "valorUnitario": 7.28
                },
                "valorInformado": 7.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 28,
            "descricaoDetalhada": null,
            "situacao": "Proposta desclassificada",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 797.72,
                  "valorUnitario": 28.49
                },
                "valorInformado": 28.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 196.56,
                  "valorUnitario": 7.02
                },
                "valorInformado": 7.02
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 28,
            "descricaoDetalhada": null,
            "situacao": "Proposta desclassificada",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 797.72,
                  "valorUnitario": 28.49
                },
                "valorInformado": 28.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 248.64,
                  "valorUnitario": 8.88
                },
                "valorInformado": 8.88
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 28,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "MAQUIRA/ MAQUIRA",
            "modeloVersao": "SERINGA C/2,5ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 796.6,
                  "valorUnitario": 28.45
                },
                "valorInformado": 28.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 278.32,
                  "valorUnitario": 9.94
                },
                "valorInformado": 9.94
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 28,
            "descricaoDetalhada": "Condicionador De Porcelana - Condicionador De Porcelana Concentração: 10% , Aspecto Físico: Gel , Tipo: Ácido Fluorídrico",
            "situacao": "None",
            "marcaFabricante": "MAQUIRA",
            "modeloVersao": "MAQUIRA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 797.72,
                  "valorUnitario": 28.49
                },
                "valorInformado": 28.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 300.16,
                  "valorUnitario": 10.72
                },
                "valorInformado": 10.72
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 28,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL / IODONTOSUL / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 797.72,
                  "valorUnitario": 28.49
                },
                "valorInformado": 28.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 797.72,
                  "valorUnitario": 28.49
                },
                "valorInformado": 28.49
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 28,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "SERINGA 2,5 ML ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 56,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "56",
        "descricao": "Condicionador De Porcelana",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 29.52,
        "valorEstimadoTotal": 383.76,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 377.0,
                  "valorUnitario": 29.0
                },
                "valorInformado": 29.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 85.02,
                  "valorUnitario": 6.54
                },
                "valorInformado": 6.54
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta desclassificada",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 383.76,
                  "valorUnitario": 29.52
                },
                "valorInformado": 29.52
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 92.56,
                  "valorUnitario": 7.12
                },
                "valorInformado": 7.12
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta desclassificada",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 383.76,
                  "valorUnitario": 29.52
                },
                "valorInformado": 29.52
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 115.44,
                  "valorUnitario": 8.88
                },
                "valorInformado": 8.88
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "MAQUIRA / MAQUIRA",
            "modeloVersao": "SERINGA C/2,5ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 383.63,
                  "valorUnitario": 29.51
                },
                "valorInformado": 29.51
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 129.22,
                  "valorUnitario": 9.94
                },
                "valorInformado": 9.94
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Condicionador De Porcelana - Condicionador De Porcelana Concentração: 10% , Aspecto Físico: Gel , Tipo: Ácido Fluorídrico",
            "situacao": "None",
            "marcaFabricante": "MAQUIRA",
            "modeloVersao": "MAQUIRA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 383.76,
                  "valorUnitario": 29.52
                },
                "valorInformado": 29.52
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 139.36,
                  "valorUnitario": 10.72
                },
                "valorInformado": 10.72
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL / IODONTOSUL / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 383.76,
                  "valorUnitario": 29.52
                },
                "valorInformado": 29.52
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 383.76,
                  "valorUnitario": 29.52
                },
                "valorInformado": 29.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "SERINGA 2,5 ML",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -17,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G9",
    "descricao": "Grupo 9",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 9607.57,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 5,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 9552.6,
              "valorUnitario": null
            },
            "valorInformado": 9552.6
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1749.95,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para atender ao especificado em Edital, reiteramos a solicitação do encaminhamento do anexo II (preposto), no prazo determinado.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-22T18:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 9607.57,
              "valorUnitario": null
            },
            "valorInformado": 9607.57
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1751.06,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 9607.57,
              "valorUnitario": null
            },
            "valorInformado": 9607.57
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1753.3,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 9603.07,
              "valorUnitario": null
            },
            "valorInformado": 9603.07
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1932.56,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "26395502000152",
          "nome": "DENTAL UNIVERSO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 9611.77,
              "valorUnitario": null
            },
            "valorInformado": 9611.77
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4009.11,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 48,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "48",
        "descricao": "Fio retrator gengival",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 77.58,
        "valorEstimadoTotal": 1008.54,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1001.0,
                  "valorUnitario": 77.0
                },
                "valorInformado": 77.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 186.16,
                  "valorUnitario": 14.32
                },
                "valorInformado": 14.32
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "AF DO BRASIL",
            "modeloVersao": "AF DO BRASIL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1008.54,
                  "valorUnitario": 77.58
                },
                "valorInformado": 77.58
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 190.71,
                  "valorUnitario": 14.67
                },
                "valorInformado": 14.67
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1008.54,
                  "valorUnitario": 77.58
                },
                "valorInformado": 77.58
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 189.8,
                  "valorUnitario": 14.6
                },
                "valorInformado": 14.6
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "RETRAFLEX / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1008.15,
                  "valorUnitario": 77.55
                },
                "valorInformado": 77.55
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 211.12,
                  "valorUnitario": 16.24
                },
                "valorInformado": 16.24
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Fio retrator gengival - Fio Retrator Gengival Material: Algodão Trançado Ou Tricotado , Tipo: Não Impregnado , Espessura: Fino , Apresentação: Embalagem C/ Cerca De 2,5 M , Tipo Uso: Estéril / Descartável",
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "RETRAFLEX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1008.54,
                  "valorUnitario": 77.58
                },
                "valorInformado": 77.58
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 437.97,
                  "valorUnitario": 33.69
                },
                "valorInformado": 33.69
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "maquira / maquira",
            "modeloVersao": "com 250cm",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 49,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "49",
        "descricao": "Fio retrator gengival",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 42,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 73.46,
        "valorEstimadoTotal": 3085.32,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3066.0,
                  "valorUnitario": 73.0
                },
                "valorInformado": 73.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 602.7,
                  "valorUnitario": 14.35
                },
                "valorInformado": 14.35
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 42,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "AF DO BRASIL",
            "modeloVersao": "AF DO BRASIL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3085.32,
                  "valorUnitario": 73.46
                },
                "valorInformado": 73.46
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 616.14,
                  "valorUnitario": 14.67
                },
                "valorInformado": 14.67
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 42,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3085.32,
                  "valorUnitario": 73.46
                },
                "valorInformado": 73.46
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 619.5,
                  "valorUnitario": 14.75
                },
                "valorInformado": 14.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 42,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "RETRAFLEX / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3084.9,
                  "valorUnitario": 73.45
                },
                "valorInformado": 73.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 682.08,
                  "valorUnitario": 16.24
                },
                "valorInformado": 16.24
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 42,
            "descricaoDetalhada": "Fio retrator gengival - Fio Retrator Gengival Material: Algodão Trançado Ou Tricotado , Tipo: Não Impregnado , Espessura: Extra Fino , Apresentação: Embalagem C/ Cerca De 2,5 M , Tipo Uso: Estéril / Descartável",
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "RETRAFLEX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3089.52,
                  "valorUnitario": 73.56
                },
                "valorInformado": 73.56
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1414.98,
                  "valorUnitario": 33.69
                },
                "valorInformado": 33.69
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 42,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "maquira / maquira",
            "modeloVersao": "com 250cm",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 50,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "50",
        "descricao": "Fio retrator gengival",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 38,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 74.99,
        "valorEstimadoTotal": 2849.62,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2831.0,
                  "valorUnitario": 74.5
                },
                "valorInformado": 74.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 543.4,
                  "valorUnitario": 14.3
                },
                "valorInformado": 14.3
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "AF DO BRASIL",
            "modeloVersao": "AF DO BRASIL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2849.62,
                  "valorUnitario": 74.99
                },
                "valorInformado": 74.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 557.46,
                  "valorUnitario": 14.67
                },
                "valorInformado": 14.67
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2849.62,
                  "valorUnitario": 74.99
                },
                "valorInformado": 74.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 560.5,
                  "valorUnitario": 14.75
                },
                "valorInformado": 14.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "RETRAFLEX / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2846.58,
                  "valorUnitario": 74.91
                },
                "valorInformado": 74.91
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 617.12,
                  "valorUnitario": 16.24
                },
                "valorInformado": 16.24
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": "Fio retrator gengival - Fio Retrator Gengival Material: Algodão Trançado Ou Tricotado , Tipo: Não Impregnado , Espessura: Ultra Extra Fino , Apresentação: Embalagem C/ Cerca De 2,5 M , Tipo Uso: Estéril / Descartável",
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "RETRAFLEX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 2849.62,
                  "valorUnitario": 74.99
                },
                "valorInformado": 74.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1280.22,
                  "valorUnitario": 33.69
                },
                "valorInformado": 33.69
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MAQUIRA / MAQUIRA",
            "modeloVersao": "COM 250CM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 51,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "51",
        "descricao": "Fio retrator gengival",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 94.3,
        "valorEstimadoTotal": 1225.9,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1224.6,
                  "valorUnitario": 94.2
                },
                "valorInformado": 94.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 231.79,
                  "valorUnitario": 17.83
                },
                "valorInformado": 17.83
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "AF DO BRASIL",
            "modeloVersao": "AF DO BRASIL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1225.9,
                  "valorUnitario": 94.3
                },
                "valorInformado": 94.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 196.04,
                  "valorUnitario": 15.08
                },
                "valorInformado": 15.08
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1225.9,
                  "valorUnitario": 94.3
                },
                "valorInformado": 94.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 191.75,
                  "valorUnitario": 14.75
                },
                "valorInformado": 14.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "RETRAFLEX / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1225.51,
                  "valorUnitario": 94.27
                },
                "valorInformado": 94.27
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 211.12,
                  "valorUnitario": 16.24
                },
                "valorInformado": 16.24
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Fio retrator gengival - Fio Retrator Gengival Material: Algodão Trançado Ou Tricotado , Tipo: Não Impregnado , Espessura: Médio , Apresentação: Embalagem C/ Cerca De 2,5 M , Tipo Uso: Estéril / Descartável",
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "RETRAFLEX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1225.9,
                  "valorUnitario": 94.3
                },
                "valorInformado": 94.3
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 437.97,
                  "valorUnitario": 33.69
                },
                "valorInformado": 33.69
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MAQUIRA / MAQUIRA",
            "modeloVersao": "COM 250CM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 52,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "52",
        "descricao": "Fio retrator gengival",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 110.63,
        "valorEstimadoTotal": 1438.19,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1430.0,
                  "valorUnitario": 110.0
                },
                "valorInformado": 110.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 185.9,
                  "valorUnitario": 14.3
                },
                "valorInformado": 14.3
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "AF DO BRASIL",
            "modeloVersao": "AF DO BRASIL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1438.19,
                  "valorUnitario": 110.63
                },
                "valorInformado": 110.63
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 190.71,
                  "valorUnitario": 14.67
                },
                "valorInformado": 14.67
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1438.19,
                  "valorUnitario": 110.63
                },
                "valorInformado": 110.63
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 191.75,
                  "valorUnitario": 14.75
                },
                "valorInformado": 14.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "RETRAFLEX / BIODINAMICA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1437.93,
                  "valorUnitario": 110.61
                },
                "valorInformado": 110.61
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 211.12,
                  "valorUnitario": 16.24
                },
                "valorInformado": 16.24
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Fio retrator gengival - Fio Retrator Gengival Material: Algodão Trançado Ou Tricotado , Tipo: Não Impregnado , Espessura: Grosso , Apresentação: Embalagem C/ Cerca De 2,5 M , Tipo Uso: Estéril / Descartável",
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "RETRAFLEX",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1438.19,
                  "valorUnitario": 110.63
                },
                "valorInformado": 110.63
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 437.97,
                  "valorUnitario": 33.69
                },
                "valorInformado": 33.69
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MAQUIRA / MAQUIRA",
            "modeloVersao": "COM 250CM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -14,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G12",
    "descricao": "Grupo 12",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 2762.63,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 4,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2762.63,
              "valorUnitario": null
            },
            "valorInformado": 2762.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2175.49,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe a proposta, com definição da marca a ser fornecida em cada produto, com seus demais anexos, conforme descrito no Edital e Termo de Referência, e demais documentos correlatos, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T18:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2762.63,
              "valorUnitario": null
            },
            "valorInformado": 2762.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2187.75,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 57,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "57",
        "descricao": "Gesso - Uso Odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 138,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 7.2,
        "valorEstimadoTotal": 993.6,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 993.6,
                  "valorUnitario": 7.2
                },
                "valorInformado": 7.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 767.28,
                  "valorUnitario": 5.56
                },
                "valorInformado": 5.56
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 138,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ASFER",
            "modeloVersao": "ASFER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 993.6,
                  "valorUnitario": 7.2
                },
                "valorInformado": 7.2
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 779.7,
                  "valorUnitario": 5.65
                },
                "valorInformado": 5.65
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 138,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER / ASFER / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 58,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "58",
        "descricao": "Gesso - Uso Odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 38,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 5.0,
        "valorEstimadoTotal": 190.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 190.0,
                  "valorUnitario": 5.0
                },
                "valorInformado": 5.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 190.0,
                  "valorUnitario": 5.0
                },
                "valorInformado": 5.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ASFER",
            "modeloVersao": "ASFER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 190.0,
                  "valorUnitario": 5.0
                },
                "valorInformado": 5.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 186.2,
                  "valorUnitario": 4.9
                },
                "valorInformado": 4.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 38,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER / ASFER / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 59,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "59",
        "descricao": "Gesso - Uso Odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 73,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 10.98,
        "valorEstimadoTotal": 801.54,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 801.54,
                  "valorUnitario": 10.98
                },
                "valorInformado": 10.98
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 665.76,
                  "valorUnitario": 9.12
                },
                "valorInformado": 9.12
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 73,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ASFER",
            "modeloVersao": "ASFER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 801.54,
                  "valorUnitario": 10.98
                },
                "valorInformado": 10.98
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 667.95,
                  "valorUnitario": 9.15
                },
                "valorInformado": 9.15
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 73,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER / ASFER / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 60,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "60",
        "descricao": "Gesso - Uso Odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 29,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 26.81,
        "valorEstimadoTotal": 777.49,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 777.49,
                  "valorUnitario": 26.81
                },
                "valorInformado": 26.81
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 552.45,
                  "valorUnitario": 19.05
                },
                "valorInformado": 19.05
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 29,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ASFER",
            "modeloVersao": "ASFER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 777.49,
                  "valorUnitario": 26.81
                },
                "valorInformado": 26.81
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 553.9,
                  "valorUnitario": 19.1
                },
                "valorInformado": 19.1
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 29,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER / ASFER / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -13,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G13",
    "descricao": "Grupo 13",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 1983.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 5,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1983.0,
              "valorUnitario": null
            },
            "valorInformado": 1983.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1453.28,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta atualizada, com catálogo detalhado, anexos e demais documentos referidos em Edital e Termo de Referência deste certame, relativo a este item, no prazo determinado e publicado neste sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-19T17:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1968.7,
              "valorUnitario": null
            },
            "valorInformado": 1968.7
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1496.61,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1983.0,
              "valorUnitario": null
            },
            "valorInformado": 1983.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1527.38,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1983.0,
              "valorUnitario": null
            },
            "valorInformado": 1983.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1548.54,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 63,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "63",
        "descricao": "Cimento odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 15,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 50.23,
        "valorEstimadoTotal": 753.45,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 753.45,
                  "valorUnitario": 50.23
                },
                "valorInformado": 50.23
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 550.35,
                  "valorUnitario": 36.69
                },
                "valorInformado": 36.69
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 15,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ODACHAM / DENTSPLY",
            "modeloVersao": "CAIXA C/8 UNIDADES",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 750.0,
                  "valorUnitario": 50.0
                },
                "valorInformado": 50.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 522.0,
                  "valorUnitario": 34.8
                },
                "valorInformado": 34.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 15,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 753.45,
                  "valorUnitario": 50.23
                },
                "valorInformado": 50.23
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 520.5,
                  "valorUnitario": 34.7
                },
                "valorInformado": 34.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 15,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 753.45,
                  "valorUnitario": 50.23
                },
                "valorInformado": 50.23
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 540.75,
                  "valorUnitario": 36.05
                },
                "valorInformado": 36.05
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 15,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 64,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "64",
        "descricao": "Cone endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 7,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 53.62,
        "valorEstimadoTotal": 375.34,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 375.34,
                  "valorUnitario": 53.62
                },
                "valorInformado": 53.62
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 273.0,
                  "valorUnitario": 39.0
                },
                "valorInformado": 39.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ENDOPOINTS / ENDOPOINTS",
            "modeloVersao": "EMBALAGEM ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 375.2,
                  "valorUnitario": 53.6
                },
                "valorInformado": 53.6
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 333.06,
                  "valorUnitario": 47.58
                },
                "valorInformado": 47.58
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 375.34,
                  "valorUnitario": 53.62
                },
                "valorInformado": 53.62
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 341.6,
                  "valorUnitario": 48.8
                },
                "valorInformado": 48.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 375.34,
                  "valorUnitario": 53.62
                },
                "valorInformado": 53.62
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 345.87,
                  "valorUnitario": 49.41
                },
                "valorInformado": 49.41
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 65,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "65",
        "descricao": "Cone Endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 7,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 40.63,
        "valorEstimadoTotal": 284.41,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 284.41,
                  "valorUnitario": 40.63
                },
                "valorInformado": 40.63
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 204.33,
                  "valorUnitario": 29.19
                },
                "valorInformado": 29.19
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ENDOPOINTS / ENDOPOINTS",
            "modeloVersao": "EMBALAGEM ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 280.0,
                  "valorUnitario": 40.0
                },
                "valorInformado": 40.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 212.52,
                  "valorUnitario": 30.36
                },
                "valorInformado": 30.36
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 284.41,
                  "valorUnitario": 40.63
                },
                "valorInformado": 40.63
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 221.76,
                  "valorUnitario": 31.68
                },
                "valorInformado": 31.68
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 284.41,
                  "valorUnitario": 40.63
                },
                "valorInformado": 40.63
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 220.64,
                  "valorUnitario": 31.52
                },
                "valorInformado": 31.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 66,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "66",
        "descricao": "Cone Endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 7,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 38.59,
        "valorEstimadoTotal": 270.13,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 270.13,
                  "valorUnitario": 38.59
                },
                "valorInformado": 38.59
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 210.0,
                  "valorUnitario": 30.0
                },
                "valorInformado": 30.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ENDOPOINTS / ENDOPOINTS",
            "modeloVersao": "EMBALAGEM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 266.0,
                  "valorUnitario": 38.0
                },
                "valorInformado": 38.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 212.52,
                  "valorUnitario": 30.36
                },
                "valorInformado": 30.36
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 270.13,
                  "valorUnitario": 38.59
                },
                "valorInformado": 38.59
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 221.76,
                  "valorUnitario": 31.68
                },
                "valorInformado": 31.68
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 270.13,
                  "valorUnitario": 38.59
                },
                "valorInformado": 38.59
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 220.64,
                  "valorUnitario": 31.52
                },
                "valorInformado": 31.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 67,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "67",
        "descricao": "Cone Endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 7,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 42.81,
        "valorEstimadoTotal": 299.67,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 299.67,
                  "valorUnitario": 42.81
                },
                "valorInformado": 42.81
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 215.6,
                  "valorUnitario": 30.8
                },
                "valorInformado": 30.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ENDOPOINTS / ENDOPOINTS",
            "modeloVersao": "EMBALAGEM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 297.5,
                  "valorUnitario": 42.5
                },
                "valorInformado": 42.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 216.51,
                  "valorUnitario": 30.93
                },
                "valorInformado": 30.93
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 299.67,
                  "valorUnitario": 42.81
                },
                "valorInformado": 42.81
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 221.76,
                  "valorUnitario": 31.68
                },
                "valorInformado": 31.68
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 299.67,
                  "valorUnitario": 42.81
                },
                "valorInformado": 42.81
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 220.64,
                  "valorUnitario": 31.52
                },
                "valorInformado": 31.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 7,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -12,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G14",
    "descricao": "Grupo 14",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 2717.03,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2717.03,
              "valorUnitario": null
            },
            "valorInformado": 2717.03
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1058.25,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta atualizada, com catálogo detalhado, anexos e demais documentos referidos em Edital e Termo de Referência deste certame, relativo a este item, no prazo determinado e publicado neste sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-19T17:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2717.03,
              "valorUnitario": null
            },
            "valorInformado": 2717.03
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1062.17,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2717.03,
              "valorUnitario": null
            },
            "valorInformado": 2717.03
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1132.57,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 73,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "73",
        "descricao": "Matriz Odontológica",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 9,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 121.42,
        "valorEstimadoTotal": 1092.78,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1092.78,
                  "valorUnitario": 121.42
                },
                "valorInformado": 121.42
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 999.0,
                  "valorUnitario": 111.0
                },
                "valorInformado": 111.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 9,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "MATRIZ POLIESTER / TDV",
            "modeloVersao": "EMBALAGEM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1092.78,
                  "valorUnitario": 121.42
                },
                "valorInformado": 121.42
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1006.92,
                  "valorUnitario": 111.88
                },
                "valorInformado": 111.88
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 9,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TDV / TDV / NAC",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1092.78,
                  "valorUnitario": 121.42
                },
                "valorInformado": 121.42
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1059.57,
                  "valorUnitario": 117.73
                },
                "valorInformado": 117.73
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 9,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TDV",
            "modeloVersao": "TDV",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 74,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "74",
        "descricao": "Matriz odontológica",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 25,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 29.05,
        "valorEstimadoTotal": 726.25,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 726.25,
                  "valorUnitario": 29.05
                },
                "valorInformado": 29.05
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 27.5,
                  "valorUnitario": 1.1
                },
                "valorInformado": 1.1
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 25,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "PREVEN / PREVEN",
            "modeloVersao": "5MM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 726.25,
                  "valorUnitario": 29.05
                },
                "valorInformado": 29.05
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 26.0,
                  "valorUnitario": 1.04
                },
                "valorInformado": 1.04
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 25,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PREVEN / PREVEN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 726.25,
                  "valorUnitario": 29.05
                },
                "valorInformado": 29.05
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 36.5,
                  "valorUnitario": 1.46
                },
                "valorInformado": 1.46
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 25,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PREVEN",
            "modeloVersao": "PREVEN",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 75,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "75",
        "descricao": "Matriz odontológica",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 25,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 35.92,
        "valorEstimadoTotal": 898.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 898.0,
                  "valorUnitario": 35.92
                },
                "valorInformado": 35.92
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 31.75,
                  "valorUnitario": 1.27
                },
                "valorInformado": 1.27
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 25,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "PREVEN / PREVEN",
            "modeloVersao": "7MM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 898.0,
                  "valorUnitario": 35.92
                },
                "valorInformado": 35.92
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 29.25,
                  "valorUnitario": 1.17
                },
                "valorInformado": 1.17
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 25,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PREVEN / PREVEN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 898.0,
                  "valorUnitario": 35.92
                },
                "valorInformado": 35.92
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 36.5,
                  "valorUnitario": 1.46
                },
                "valorInformado": 1.46
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 25,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PREVEN",
            "modeloVersao": "PREVEN",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -10,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G16",
    "descricao": "Grupo 16",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 5559.84,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5559.84,
              "valorUnitario": null
            },
            "valorInformado": 5559.84
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2109.98,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe a proposta, com definição da marca a ser fornecida em cada produto, com seus demais anexos, conforme descrito no Edital e Termo de Referência, e demais documentos correlatos, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T18:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5559.84,
              "valorUnitario": null
            },
            "valorInformado": 5559.84
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2414.63,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5552.05,
              "valorUnitario": null
            },
            "valorInformado": 5552.05
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4214.73,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 79,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "79",
        "descricao": "Carbono para articular",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 311.61,
        "valorEstimadoTotal": 4050.93,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4050.93,
                  "valorUnitario": 311.61
                },
                "valorInformado": 311.61
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1272.05,
                  "valorUnitario": 97.85
                },
                "valorInformado": 97.85
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ANGELUS",
            "modeloVersao": "ANGELUS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4050.93,
                  "valorUnitario": 311.61
                },
                "valorInformado": 311.61
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1883.57,
                  "valorUnitario": 144.89
                },
                "valorInformado": 144.89
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "CONTACTO FILM 280 UN / ANGELUS / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4049.5,
                  "valorUnitario": 311.5
                },
                "valorInformado": 311.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3119.22,
                  "valorUnitario": 239.94
                },
                "valorInformado": 239.94
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BAUSCH",
            "modeloVersao": "BAUSCH",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 80,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "80",
        "descricao": "Carbono Para Articular",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 159,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 9.49,
        "valorEstimadoTotal": 1508.91,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1508.91,
                  "valorUnitario": 9.49
                },
                "valorInformado": 9.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 837.93,
                  "valorUnitario": 5.27
                },
                "valorInformado": 5.27
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 159,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ANGELUS",
            "modeloVersao": "ANGELUS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1508.91,
                  "valorUnitario": 9.49
                },
                "valorInformado": 9.49
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 531.06,
                  "valorUnitario": 3.34
                },
                "valorInformado": 3.34
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 159,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "  IODONTOSUL AZUL / IODONTOSUL / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1502.55,
                  "valorUnitario": 9.45
                },
                "valorInformado": 9.45
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1095.51,
                  "valorUnitario": 6.89
                },
                "valorInformado": 6.89
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 159,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ANGELUS REF: 560",
            "modeloVersao": "ANGELUS REF: 560",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -11,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G15",
    "descricao": "Grupo 15",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 1252.82,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1252.82,
              "valorUnitario": null
            },
            "valorInformado": 1252.82
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 633.5,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante.  Para o devido andamento do processo, conforme preconizado no Edital e Termo de Referência, solicito que anexe o contrato social atualizado da empresa, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1252.82,
              "valorUnitario": null
            },
            "valorInformado": 1252.82
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 664.85,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1244.04,
              "valorUnitario": null
            },
            "valorInformado": 1244.04
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 752.01,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1252.82,
              "valorUnitario": null
            },
            "valorInformado": 1252.82
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 829.71,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1252.82,
              "valorUnitario": null
            },
            "valorInformado": 1252.82
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1252.82,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "33992679000100",
          "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 76,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "76",
        "descricao": "Acessório para radiologia",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 188,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 5.29,
        "valorEstimadoTotal": 994.52,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 994.52,
                  "valorUnitario": 5.29
                },
                "valorInformado": 5.29
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 526.4,
                  "valorUnitario": 2.8
                },
                "valorInformado": 2.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 188,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "PREVEN / PREVEN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 994.52,
                  "valorUnitario": 5.29
                },
                "valorInformado": 5.29
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 554.6,
                  "valorUnitario": 2.95
                },
                "valorInformado": 2.95
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 188,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PREVEN / PREVEN",
            "modeloVersao": "UNIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 987.0,
                  "valorUnitario": 5.25
                },
                "valorInformado": 5.25
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 631.68,
                  "valorUnitario": 3.36
                },
                "valorInformado": 3.36
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 188,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 994.52,
                  "valorUnitario": 5.29
                },
                "valorInformado": 5.29
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 710.64,
                  "valorUnitario": 3.78
                },
                "valorInformado": 3.78
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 188,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 994.52,
                  "valorUnitario": 5.29
                },
                "valorInformado": 5.29
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 994.52,
                  "valorUnitario": 5.29
                },
                "valorInformado": 5.29
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 188,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTEC ",
            "modeloVersao": "UNIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 77,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "77",
        "descricao": "Acessório para radiologia",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 63,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 4.1,
        "valorEstimadoTotal": 258.3,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 258.3,
                  "valorUnitario": 4.1
                },
                "valorInformado": 4.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 107.1,
                  "valorUnitario": 1.7
                },
                "valorInformado": 1.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "PREVEN / PREVEN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 258.3,
                  "valorUnitario": 4.1
                },
                "valorInformado": 4.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 110.25,
                  "valorUnitario": 1.75
                },
                "valorInformado": 1.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "PREVEN / PREVEN",
            "modeloVersao": "UNIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 257.04,
                  "valorUnitario": 4.08
                },
                "valorInformado": 4.08
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 120.33,
                  "valorUnitario": 1.91
                },
                "valorInformado": 1.91
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 258.3,
                  "valorUnitario": 4.1
                },
                "valorInformado": 4.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 119.07,
                  "valorUnitario": 1.89
                },
                "valorInformado": 1.89
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 258.3,
                  "valorUnitario": 4.1
                },
                "valorInformado": 4.1
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 258.3,
                  "valorUnitario": 4.1
                },
                "valorInformado": 4.1
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 63,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "UNIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -9,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G17",
    "descricao": "Grupo 17",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 590.08,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 590.08,
              "valorUnitario": null
            },
            "valorInformado": 590.08
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 313.35,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante. Para o devido andamento do processo, solicito que anexe proposta atualizada deste item, que não apareceu na que foi encaminhada antes ,com catálogo, anexos e demais documentos referidos em Edital e Termo de Referência deste certame, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 590.08,
              "valorUnitario": null
            },
            "valorInformado": 590.08
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 315.2,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 590.08,
              "valorUnitario": null
            },
            "valorInformado": 590.08
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 339.17,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 85,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "85",
        "descricao": "Pedra - Pomes",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 19,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 10.57,
        "valorEstimadoTotal": 200.83,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 200.83,
                  "valorUnitario": 10.57
                },
                "valorInformado": 10.57
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 71.25,
                  "valorUnitario": 3.75
                },
                "valorInformado": 3.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 19,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "PREVEN / PREVEN",
            "modeloVersao": "100 GRAMAS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 200.83,
                  "valorUnitario": 10.57
                },
                "valorInformado": 10.57
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 72.2,
                  "valorUnitario": 3.8
                },
                "valorInformado": 3.8
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 19,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "QUIMIDROL / QUIMIDROL / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 200.83,
                  "valorUnitario": 10.57
                },
                "valorInformado": 10.57
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 89.87,
                  "valorUnitario": 4.73
                },
                "valorInformado": 4.73
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 19,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "AF DO  BRASIL",
            "modeloVersao": "AF DO  BRASIL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 86,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "86",
        "descricao": "Pedra - pomes",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 45,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 8.65,
        "valorEstimadoTotal": 389.25,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 389.25,
                  "valorUnitario": 8.65
                },
                "valorInformado": 8.65
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 242.1,
                  "valorUnitario": 5.38
                },
                "valorInformado": 5.38
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 45,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "ASFER / ASFER",
            "modeloVersao": "COM 1KG",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 389.25,
                  "valorUnitario": 8.65
                },
                "valorInformado": 8.65
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 243.0,
                  "valorUnitario": 5.4
                },
                "valorInformado": 5.4
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 45,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER / ASFER / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 389.25,
                  "valorUnitario": 8.65
                },
                "valorInformado": 8.65
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 249.3,
                  "valorUnitario": 5.54
                },
                "valorInformado": 5.54
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 45,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ASFER",
            "modeloVersao": "ASFER",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -8,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G18",
    "descricao": "Grupo 18",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 18001.68,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 4,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 18001.68,
              "valorUnitario": null
            },
            "valorInformado": 18001.68
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4580.19,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante.  Para o devido andamento do processo, conforme preconizado no Edital e Termo de Referência, solicito que anexe o contrato social atualizado da empresa, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 17793.0,
              "valorUnitario": null
            },
            "valorInformado": 17793.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4606.13,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 18001.68,
              "valorUnitario": null
            },
            "valorInformado": 18001.68
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5690.96,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 18001.68,
              "valorUnitario": null
            },
            "valorInformado": 18001.68
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7582.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "07010532000159",
          "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 17999.51,
              "valorUnitario": null
            },
            "valorInformado": 17999.51
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7805.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "50541407000102",
          "nome": "THIAGO ALMEIDA DA SILVA LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 18001.68,
              "valorUnitario": null
            },
            "valorInformado": 18001.68
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 13545.02,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 18001.68,
              "valorUnitario": null
            },
            "valorInformado": 18001.68
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 15161.5,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "08886401000100",
          "nome": "DENTAL FREIRE GOULART LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 18001.68,
              "valorUnitario": null
            },
            "valorInformado": 18001.68
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 18001.68,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "33992679000100",
          "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 87,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "87",
        "descricao": "Pino - uso odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 54,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 80.99,
        "valorEstimadoTotal": 4373.46,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1106.46,
                  "valorUnitario": 20.49
                },
                "valorInformado": 20.49
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "LYSPOST / LYSANDA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4320.0,
                  "valorUnitario": 80.0
                },
                "valorInformado": 80.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1111.86,
                  "valorUnitario": 20.59
                },
                "valorInformado": 20.59
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1378.08,
                  "valorUnitario": 25.52
                },
                "valorInformado": 25.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "LYSANDA",
            "modeloVersao": "LYSANDA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1836.0,
                  "valorUnitario": 34.0
                },
                "valorInformado": 34.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITE POST\t/\tFGM",
            "modeloVersao": "Nº 0,5",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1890.0,
                  "valorUnitario": 35.0
                },
                "valorInformado": 35.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "PINO DE FIBRA DE VIDRO N0,5",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3279.96,
                  "valorUnitario": 60.74
                },
                "valorInformado": 60.74
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITEPOST SYSTEM DC / FGM",
            "modeloVersao": "EMBALAGEM C/5 UNIDADES",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3780.0,
                  "valorUnitario": 70.0
                },
                "valorInformado": 70.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "FGM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "08886401000100",
              "nome": "DENTAL FREIRE GOULART LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4373.46,
                  "valorUnitario": 80.99
                },
                "valorInformado": 80.99
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 54,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "CAIXA C/ 5",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 88,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "88",
        "descricao": "Pino - uso odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 67,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 96.16,
        "valorEstimadoTotal": 6442.72,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6442.72,
                  "valorUnitario": 96.16
                },
                "valorInformado": 96.16
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1372.83,
                  "valorUnitario": 20.49
                },
                "valorInformado": 20.49
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "LYSPOST / LYSANDA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6365.0,
                  "valorUnitario": 95.0
                },
                "valorInformado": 95.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1379.53,
                  "valorUnitario": 20.59
                },
                "valorInformado": 20.59
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6442.72,
                  "valorUnitario": 96.16
                },
                "valorInformado": 96.16
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1709.84,
                  "valorUnitario": 25.52
                },
                "valorInformado": 25.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "LYSANDA",
            "modeloVersao": "LYSANDA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6442.72,
                  "valorUnitario": 96.16
                },
                "valorInformado": 96.16
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2278.0,
                  "valorUnitario": 34.0
                },
                "valorInformado": 34.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITE POST\t/\tFGM",
            "modeloVersao": " Nº 1,0",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6442.05,
                  "valorUnitario": 96.15
                },
                "valorInformado": 96.15
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 2345.0,
                  "valorUnitario": 35.0
                },
                "valorInformado": 35.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "PINO DE FIBRA DE VIDRO N0,1,0",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6442.72,
                  "valorUnitario": 96.16
                },
                "valorInformado": 96.16
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4069.58,
                  "valorUnitario": 60.74
                },
                "valorInformado": 60.74
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITEPOST DC / FGM",
            "modeloVersao": "EMBALAGEM C/5 UNIDADES",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6442.72,
                  "valorUnitario": 96.16
                },
                "valorInformado": 96.16
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4690.0,
                  "valorUnitario": 70.0
                },
                "valorInformado": 70.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "FGM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "08886401000100",
              "nome": "DENTAL FREIRE GOULART LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 6442.72,
                  "valorUnitario": 96.16
                },
                "valorInformado": 96.16
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 6442.72,
                  "valorUnitario": 96.16
                },
                "valorInformado": 96.16
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 67,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "CAIXA C/ 5",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 89,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "89",
        "descricao": "Pino - uso odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 52,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 79.5,
        "valorEstimadoTotal": 4134.0,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1076.4,
                  "valorUnitario": 20.7
                },
                "valorInformado": 20.7
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "LYSPOST / LYSANDA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4108.0,
                  "valorUnitario": 79.0
                },
                "valorInformado": 79.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1085.24,
                  "valorUnitario": 20.87
                },
                "valorInformado": 20.87
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1327.04,
                  "valorUnitario": 25.52
                },
                "valorInformado": 25.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "LYSANDA",
            "modeloVersao": "LYSANDA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1768.0,
                  "valorUnitario": 34.0
                },
                "valorInformado": 34.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITE POST\t/\tFGM",
            "modeloVersao": "Nº 2,0",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1820.0,
                  "valorUnitario": 35.0
                },
                "valorInformado": 35.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "PINO DE FIBRA DE VIDRO N0,2,0",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3158.48,
                  "valorUnitario": 60.74
                },
                "valorInformado": 60.74
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITEPOST DC / FGM",
            "modeloVersao": "EMBALAGEM C/5 UNIDADES",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3640.0,
                  "valorUnitario": 70.0
                },
                "valorInformado": 70.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "FGM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "08886401000100",
              "nome": "DENTAL FREIRE GOULART LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 4134.0,
                  "valorUnitario": 79.5
                },
                "valorInformado": 79.5
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 52,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "CAIXA C/5",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 90,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "90",
        "descricao": "Pino - uso odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 50,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 61.03,
        "valorEstimadoTotal": 3051.5,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1024.5,
                  "valorUnitario": 20.49
                },
                "valorInformado": 20.49
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "LYSPOST / LYSANDA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3000.0,
                  "valorUnitario": 60.0
                },
                "valorInformado": 60.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1029.5,
                  "valorUnitario": 20.59
                },
                "valorInformado": 20.59
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "IODONTOSUL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1276.0,
                  "valorUnitario": 25.52
                },
                "valorInformado": 25.52
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "LYSANDA",
            "modeloVersao": "LYSANDA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1700.0,
                  "valorUnitario": 34.0
                },
                "valorInformado": 34.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITE POST\t/\tFGM",
            "modeloVersao": "Nº 3,0",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3050.0,
                  "valorUnitario": 61.0
                },
                "valorInformado": 61.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1750.0,
                  "valorUnitario": 35.0
                },
                "valorInformado": 35.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "PINO DE FIBRA DE VIDRO N0,130",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3037.0,
                  "valorUnitario": 60.74
                },
                "valorInformado": 60.74
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "WHITEPOST DC / FGM",
            "modeloVersao": "EMBALAGEM C/5 UNIDADES",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "FGM",
            "modeloVersao": "FGM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "08886401000100",
              "nome": "DENTAL FREIRE GOULART LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 3051.5,
                  "valorUnitario": 61.03
                },
                "valorInformado": 61.03
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 50,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "CAIXA C/5",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -7,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G19",
    "descricao": "Grupo 19",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 1208.22,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1207.7,
              "valorUnitario": null
            },
            "valorInformado": 1207.7
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 707.85,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "50541407000102",
          "nome": "THIAGO ALMEIDA DA SILVA LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Bom dia, Sr. Licitante. Para atender ao especificado em Edital e Termo de Referência, solicitamos o encaminhamento do anexo V (preposto), no prazo determinado.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-22T12:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1208.22,
              "valorUnitario": null
            },
            "valorInformado": 1208.22
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 751.4,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1208.22,
              "valorUnitario": null
            },
            "valorInformado": 1208.22
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 803.92,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1208.22,
              "valorUnitario": null
            },
            "valorInformado": 1208.22
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 810.16,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1207.44,
              "valorUnitario": null
            },
            "valorInformado": 1207.44
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 891.28,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "26395502000152",
          "nome": "DENTAL UNIVERSO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1206.4,
              "valorUnitario": null
            },
            "valorInformado": 1206.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1004.77,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 91,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "91",
        "descricao": "Cone Endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 46.04,
        "valorEstimadoTotal": 598.52,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 598.0,
                  "valorUnitario": 46.0
                },
                "valorInformado": 46.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 331.5,
                  "valorUnitario": 25.5
                },
                "valorInformado": 25.5
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "GN INJECTA METABIOMED",
            "modeloVersao": "CONE DE PAPEL 15-40",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 598.52,
                  "valorUnitario": 46.04
                },
                "valorInformado": 46.04
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 375.7,
                  "valorUnitario": 28.9
                },
                "valorInformado": 28.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / ENDOPOINTS",
            "modeloVersao": "EMBALAGEM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 598.52,
                  "valorUnitario": 46.04
                },
                "valorInformado": 46.04
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 401.96,
                  "valorUnitario": 30.92
                },
                "valorInformado": 30.92
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 598.52,
                  "valorUnitario": 46.04
                },
                "valorInformado": 46.04
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 404.43,
                  "valorUnitario": 31.11
                },
                "valorInformado": 31.11
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 598.39,
                  "valorUnitario": 46.03
                },
                "valorInformado": 46.03
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 445.64,
                  "valorUnitario": 34.28
                },
                "valorInformado": 34.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Cone Endodôntico - Cone Endodôntico Tipo: Absorvente , Material: Papel , Calibre: Nº 15 , Comprimento: 28 MM, Apresentação: Estojo 120 Pontas , Esterilidade: Estéril",
            "situacao": "None",
            "marcaFabricante": "DENTSPLY",
            "modeloVersao": "DENTSPLY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 598.0,
                  "valorUnitario": 46.0
                },
                "valorInformado": 46.0
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 506.09,
                  "valorUnitario": 38.93
                },
                "valorInformado": 38.93
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 92,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "92",
        "descricao": "Cone endodôntico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 13,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 46.9,
        "valorEstimadoTotal": 609.7,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 609.7,
                  "valorUnitario": 46.9
                },
                "valorInformado": 46.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 376.35,
                  "valorUnitario": 28.95
                },
                "valorInformado": 28.95
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "GN INJECTA METABIOMED",
            "modeloVersao": "CONE DE PAPEL 45-80",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "50541407000102",
              "nome": "THIAGO ALMEIDA DA SILVA LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 609.7,
                  "valorUnitario": 46.9
                },
                "valorInformado": 46.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 375.7,
                  "valorUnitario": 28.9
                },
                "valorInformado": 28.9
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / ENDOPOINTS",
            "modeloVersao": "EMBALAGEM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 609.7,
                  "valorUnitario": 46.9
                },
                "valorInformado": 46.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 401.96,
                  "valorUnitario": 30.92
                },
                "valorInformado": 30.92
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "TANARI",
            "modeloVersao": "TANARI",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 609.7,
                  "valorUnitario": 46.9
                },
                "valorInformado": 46.9
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 405.73,
                  "valorUnitario": 31.21
                },
                "valorInformado": 31.21
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS / TANARIMAN / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 609.05,
                  "valorUnitario": 46.85
                },
                "valorInformado": 46.85
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 445.64,
                  "valorUnitario": 34.28
                },
                "valorInformado": 34.28
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": "Cone endodôntico - Cone Endodôntico Tipo: Absorvente , Material: Papel , Calibre: Nº 45 , Comprimento: 28 MM, Apresentação: Estojo 120 Pontas , Esterilidade: Estéril",
            "situacao": "None",
            "marcaFabricante": "DENTSPLY",
            "modeloVersao": "DENTSPLY",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 608.4,
                  "valorUnitario": 46.8
                },
                "valorInformado": 46.8
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 498.68,
                  "valorUnitario": 38.36
                },
                "valorInformado": 38.36
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 13,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ENDOPOINTS",
            "modeloVersao": "ENDOPOINTS",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      }
    ]
  },
  {
    "numero": -6,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G20",
    "descricao": "Grupo 20",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 1868.3,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1868.3,
              "valorUnitario": null
            },
            "valorInformado": 1868.3
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 369.3,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "67403154000103",
          "nome": "A. M. MOLITERNO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Boa tarde, Sr. Licitante.  Para o devido andamento do processo, conforme preconizado no Edital e Termo de Referência, solicito que anexe o contrato social atualizado da empresa, no prazo determinado em sistema.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1864.5,
              "valorUnitario": null
            },
            "valorInformado": 1864.5
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 407.74,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31890783000150",
          "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1868.3,
              "valorUnitario": null
            },
            "valorInformado": 1868.3
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 407.85,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "02482141000113",
          "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1868.3,
              "valorUnitario": null
            },
            "valorInformado": 1868.3
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 416.0,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "07010532000159",
          "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1868.3,
              "valorUnitario": null
            },
            "valorInformado": 1868.3
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 427.75,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "18702815000188",
          "nome": "HEPRO COMERCIO LTDA.",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1867.92,
              "valorUnitario": null
            },
            "valorInformado": 1867.92
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 459.44,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "26395502000152",
          "nome": "DENTAL UNIVERSO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1868.75,
              "valorUnitario": null
            },
            "valorInformado": 1868.75
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1868.75,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "33992679000100",
          "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null,
        "empatadoComoMelhorClassificado": null
      }
    ],
    "subItens": [
      {
        "numero": 95,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "95",
        "descricao": "Cimento odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 5,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 39.7,
        "valorEstimadoTotal": 198.5,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 198.5,
                  "valorUnitario": 39.7
                },
                "valorInformado": 39.7
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 158.1,
                  "valorUnitario": 31.62
                },
                "valorInformado": 31.62
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 5,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "APPLIC / MAQUIRA / NAC ",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 198.0,
                  "valorUnitario": 39.6
                },
                "valorInformado": 39.6
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 141.1,
                  "valorUnitario": 28.22
                },
                "valorInformado": 28.22
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 5,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "APPLIC MAQUIRA",
            "modeloVersao": "APPLIC MAQUIRA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 198.5,
                  "valorUnitario": 39.7
                },
                "valorInformado": 39.7
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 185.1,
                  "valorUnitario": 37.02
                },
                "valorInformado": 37.02
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 5,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "BIODINAMICA",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 198.5,
                  "valorUnitario": 39.7
                },
                "valorInformado": 39.7
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 185.0,
                  "valorUnitario": 37.0
                },
                "valorInformado": 37.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 5,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "BIOPLIC\t/\tBIODINÂMICA",
            "modeloVersao": "FOTOPOLIMERIZÁVEL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 198.5,
                  "valorUnitario": 39.7
                },
                "valorInformado": 39.7
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 145.6,
                  "valorUnitario": 29.12
                },
                "valorInformado": 29.12
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 5,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "MAQUIRA / MAQUIRA",
            "modeloVersao": "EMBALAGEM",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 198.45,
                  "valorUnitario": 39.69
                },
                "valorInformado": 39.69
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 163.1,
                  "valorUnitario": 32.62
                },
                "valorInformado": 32.62
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 5,
            "descricaoDetalhada": "Cimento odontológico - Cimento Odontológico Tipo: Restaurador Provisório , Ativação: Fotopolimerizável , Aspecto Físico: Pasta Tipo Resina",
            "situacao": "None",
            "marcaFabricante": "MAQUIRA",
            "modeloVersao": "APPLIC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 198.95,
                  "valorUnitario": 39.79
                },
                "valorInformado": 39.79
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 198.95,
                  "valorUnitario": 39.79
                },
                "valorInformado": 39.79
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 5,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "APPLIC / MAQUIRA",
            "modeloVersao": "CAIXA C/  UND ",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
      },
      {
        "numero": 96,
        "tipo": "Subitem",
        "disputaPorValorUnitario": "Sim",
        "possuiOrcamentoSigiloso": "Não",
        "identificador": "96",
        "descricao": "Cimento odontológico",
        "criterioJulgamento": "Menor Preço",
        "homologado": "Sim",
        "situacaoEnvioResultado": "None",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
        "participacaoExclusivaMeEppOuEquiparadas": "Sim",
        "situacao": "Ativo",
        "fase": "Adjudicação encerrada",
        "quantidadeSolicitada": 33,
        "criterioValor": "Valor estimado",
        "valorEstimado": null,
        "valorEstimadoUnitario": 50.6,
        "valorEstimadoTotal": 1669.8,
        "priorizarAbertura": "Não",
        "julgHabEncerrada": "Sim",
        "qtdeItensDoGrupo": null,
        "qtdeAceitaSrp": null,
        "qtdeAdjudicadaSrp": null,
        "prazosFaseRecursal": null,
        "propostasItem": [
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1669.8,
                  "valorUnitario": 50.6
                },
                "valorInformado": 50.6
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 211.2,
                  "valorUnitario": 6.4
                },
                "valorInformado": 6.4
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 33,
            "descricaoDetalhada": null,
            "situacao": "Proposta adjudicada",
            "marcaFabricante": "FILLPROV /ALLPLAN / NAC",
            "modeloVersao": "NAC",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "67403154000103",
              "nome": "A. M. MOLITERNO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1666.5,
                  "valorUnitario": 50.5
                },
                "valorInformado": 50.5
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 266.64,
                  "valorUnitario": 8.08
                },
                "valorInformado": 8.08
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 33,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL CAVITEMP",
            "modeloVersao": "IODONTOSUL CAVITEMP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "31890783000150",
              "nome": "RIO MEIER COMERCIO DE MATERIAIS ODONTO-HOSPITALARES LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1669.8,
                  "valorUnitario": 50.6
                },
                "valorInformado": 50.6
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 222.75,
                  "valorUnitario": 6.75
                },
                "valorInformado": 6.75
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 33,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ALLPLAN",
            "modeloVersao": "ALLPLAN",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "02482141000113",
              "nome": "DENTAL BONSUCESSO PRODUTOS ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1669.8,
                  "valorUnitario": 50.6
                },
                "valorInformado": 50.6
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 231.0,
                  "valorUnitario": 7.0
                },
                "valorInformado": 7.0
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 33,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "ORBI\t/\tBRAVI",
            "modeloVersao": "AUTOPOLIMERIZÁVEL",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "07010532000159",
              "nome": "J.PINHEIRO-MATERIAIS MEDICOS E ODONTOLOGICOS LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1669.8,
                  "valorUnitario": 50.6
                },
                "valorInformado": 50.6
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 282.15,
                  "valorUnitario": 8.55
                },
                "valorInformado": 8.55
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 33,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "LYSANDA / LYSANDA",
            "modeloVersao": "UNIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "18702815000188",
              "nome": "HEPRO COMERCIO LTDA.",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1669.47,
                  "valorUnitario": 50.59
                },
                "valorInformado": 50.59
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 296.34,
                  "valorUnitario": 8.98
                },
                "valorInformado": 8.98
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 33,
            "descricaoDetalhada": "Cimento odontológico - Cimento Odontológico Tipo: Restaurador Provisório , Ativação: Fotopolimerizável , Aspecto Físico: Pasta Tipo Resina",
            "situacao": "None",
            "marcaFabricante": "BIODINAMICA",
            "modeloVersao": "FILLTEMP",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "26395502000152",
              "nome": "DENTAL UNIVERSO LTDA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          },
          {
            "valores": {
              "valorPropostaInicial": {
                "valorCalculado": {
                  "valorTotal": 1669.8,
                  "valorUnitario": 50.6
                },
                "valorInformado": 50.6
              },
              "valorPropostaInicialOuLances": {
                "valorCalculado": {
                  "valorTotal": 1669.8,
                  "valorUnitario": 50.6
                },
                "valorInformado": 50.6
              },
              "valorSugeridoNegociacao": null,
              "valorNegociado": null
            },
            "quantidadeOfertada": 33,
            "descricaoDetalhada": null,
            "situacao": "None",
            "marcaFabricante": "IODONTOSUL",
            "modeloVersao": "UNIDADE",
            "situacaoUltimaNegociacao": null,
            "justificativaUltimaNegociacao": null,
            "situacaoNaFaseFechadaModoAbertoFechado": null,
            "participante": {
              "identificacao": "33992679000100",
              "nome": "VITORIA TEIXEIRA DE OLIVEIRA",
              "tipo": "Pessoa Jurídica"
            },
            "situacaoUltimaSolicitacaoAnexos": null,
            "justificativaUltimaSolicitacaoAnexos": null,
            "declaracaoMeEpp": "Sim",
            "canalChatAberto": "Não",
            "dataHoraLimiteAtendimento": null,
            "motivoDesclassificacao": null,
            "situacaoNaDisputaFinal": null,
            "situacaoNoDesempateMeEpp": null,
            "empatadoComoMelhorClassificado": false
          }
        ],
        "subItens": null
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
    //const [dadosCnetMobile, setDadosCnetMobile] = useState([dadosAgrupados])
    const [dadosCnetMobile, setDadosCnetMobile] = useState()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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

                    <Tab key="Cnetmobile" title="Cnetmobile" className='w-full'>
                        {(dadosCnetMobile)
                            &&
                            <CnetMobileTable
                                dados={dadosCnetMobile}
                            />
                        }
                    </Tab>

                    
                    {/* <Tab key="CnetmobileAta" title="Ata" className='w-full'>
                        {(dadosCnetMobile)
                            &&
                            <CnetMobileAta
                                dados={dadosCnetMobile}
                            />
                        }
                    </Tab> */}
                </Tabs>
            )}

            { (!dadosCnetMobile) && 
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
            }
        </div>
        )
    }