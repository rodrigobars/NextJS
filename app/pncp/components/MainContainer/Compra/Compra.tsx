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
    "numero": -1,
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
    "valorEstimadoTotal": 30292.89,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 19,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 30276.06,
              "valorUnitario": null
            },
            "valorInformado": 30276.06
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 22497.19,
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
          "identificacao": "31900031000122",
          "nome": "LENISA DISTRIBUIDORA LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio da proposta atualizada, juntamente com a ficha técnica e rótulos dos produtos ofertados.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2023-12-22T14:00:00",
        "motivoDesclassificacao": "Licitante não enviou os documentos solicitados no prazo determinado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 30292.89,
              "valorUnitario": null
            },
            "valorInformado": 30292.89
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 22921.88,
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
          "identificacao": "09031962000182",
          "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos enviar atestados de qualificação técnica, conforme subitem 8.28 do TR.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2023-12-26T16:45:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ],
    "subItens": [
      {
        "numero": 1,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "1",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 93,
        "criterioValor": "E",
        "valorEstimadoUnitario": 19.51,
        "valorEstimadoTotal": 1814.43,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 93,
            "marcaFabricante": "tempera bem ",
            "modeloVersao": "500 grs",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 19.5,
                "valorCalculado": {
                  "valorUnitario": 19.5,
                  "valorTotal": 1813.5
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 19.5,
                "valorCalculado": {
                  "valorUnitario": 19.5,
                  "valorTotal": 1813.5
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 93,
            "marcaFabricante": "TEMPERABEM",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 19.51,
                "valorCalculado": {
                  "valorUnitario": 19.51,
                  "valorTotal": 1814.43
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 16.94,
                "valorCalculado": {
                  "valorUnitario": 16.94,
                  "valorTotal": 1575.42
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 2,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "2",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 70,
        "criterioValor": "E",
        "valorEstimadoUnitario": 18.85,
        "valorEstimadoTotal": 1319.5,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 70,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500 grs",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 18.84,
                "valorCalculado": {
                  "valorUnitario": 18.84,
                  "valorTotal": 1318.8
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 10.0,
                "valorCalculado": {
                  "valorUnitario": 10.0,
                  "valorTotal": 700.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 70,
            "marcaFabricante": "TEMPERABEM",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 18.85,
                "valorCalculado": {
                  "valorUnitario": 18.85,
                  "valorTotal": 1319.5
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 11.4,
                "valorCalculado": {
                  "valorUnitario": 11.4,
                  "valorTotal": 798.0
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 3,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "3",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 58,
        "criterioValor": "E",
        "valorEstimadoUnitario": 9.99,
        "valorEstimadoTotal": 579.42,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 58,
            "marcaFabricante": "chinesinho",
            "modeloVersao": "30grs",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 9.98,
                "valorCalculado": {
                  "valorUnitario": 9.98,
                  "valorTotal": 578.84
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 5.0,
                "valorCalculado": {
                  "valorUnitario": 5.0,
                  "valorTotal": 290.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 58,
            "marcaFabricante": "KITANO/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 9.99,
                "valorCalculado": {
                  "valorUnitario": 9.99,
                  "valorTotal": 579.42
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 4.0,
                "valorCalculado": {
                  "valorUnitario": 4.0,
                  "valorTotal": 232.0
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 4,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "4",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 6,
        "criterioValor": "E",
        "valorEstimadoUnitario": 70.96,
        "valorEstimadoTotal": 425.76,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 6,
            "marcaFabricante": "tempera bem ",
            "modeloVersao": "500 grs",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 70.95,
                "valorCalculado": {
                  "valorUnitario": 70.95,
                  "valorTotal": 425.7
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 25.0,
                "valorCalculado": {
                  "valorUnitario": 25.0,
                  "valorTotal": 150.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 6,
            "marcaFabricante": "TEMPERABEM",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 70.96,
                "valorCalculado": {
                  "valorUnitario": 70.96,
                  "valorTotal": 425.76
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 30.0,
                "valorCalculado": {
                  "valorUnitario": 30.0,
                  "valorTotal": 180.0
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 5,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "5",
        "descricao": "Tempero",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 144,
        "criterioValor": "E",
        "valorEstimadoUnitario": 21.52,
        "valorEstimadoTotal": 3098.88,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 144,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500 grs",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 21.51,
                "valorCalculado": {
                  "valorUnitario": 21.51,
                  "valorTotal": 3097.44
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 19.0,
                "valorCalculado": {
                  "valorUnitario": 19.0,
                  "valorTotal": 2736.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 144,
            "marcaFabricante": "TEMPERABEM",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 21.52,
                "valorCalculado": {
                  "valorUnitario": 21.52,
                  "valorTotal": 3098.88
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 21.08,
                "valorCalculado": {
                  "valorUnitario": 21.08,
                  "valorTotal": 3035.52
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 6,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "6",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 600,
        "criterioValor": "E",
        "valorEstimadoUnitario": 15.93,
        "valorEstimadoTotal": 9558.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 600,
            "marcaFabricante": "tempero bem",
            "modeloVersao": "kg",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 15.92,
                "valorCalculado": {
                  "valorUnitario": 15.92,
                  "valorTotal": 9552.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 10.0,
                "valorCalculado": {
                  "valorUnitario": 10.0,
                  "valorTotal": 6000.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 600,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 15.93,
                "valorCalculado": {
                  "valorUnitario": 15.93,
                  "valorTotal": 9558.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 9.8,
                "valorCalculado": {
                  "valorUnitario": 9.8,
                  "valorTotal": 5880.0
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 7,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "7",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 33,
        "criterioValor": "E",
        "valorEstimadoUnitario": 13.7,
        "valorEstimadoTotal": 452.1,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 33,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500 grs",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 13.69,
                "valorCalculado": {
                  "valorUnitario": 13.69,
                  "valorTotal": 451.77
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 9.0,
                "valorCalculado": {
                  "valorUnitario": 9.0,
                  "valorTotal": 297.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 33,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 13.7,
                "valorCalculado": {
                  "valorUnitario": 13.7,
                  "valorTotal": 452.1
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 9.9,
                "valorCalculado": {
                  "valorUnitario": 9.9,
                  "valorTotal": 326.7
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 8,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "8",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 17,
        "criterioValor": "E",
        "valorEstimadoUnitario": 57.48,
        "valorEstimadoTotal": 977.16,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 17,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500 g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 57.47,
                "valorCalculado": {
                  "valorUnitario": 57.47,
                  "valorTotal": 976.99
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 57.47,
                "valorCalculado": {
                  "valorUnitario": 57.47,
                  "valorTotal": 976.99
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 17,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 57.48,
                "valorCalculado": {
                  "valorUnitario": 57.48,
                  "valorTotal": 977.16
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 57.48,
                "valorCalculado": {
                  "valorUnitario": 57.48,
                  "valorTotal": 977.16
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 9,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "9",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 44,
        "criterioValor": "E",
        "valorEstimadoUnitario": 14.7,
        "valorEstimadoTotal": 646.8,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 44,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.69,
                "valorCalculado": {
                  "valorUnitario": 14.69,
                  "valorTotal": 646.36
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 6.0,
                "valorCalculado": {
                  "valorUnitario": 6.0,
                  "valorTotal": 264.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 44,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.7,
                "valorCalculado": {
                  "valorUnitario": 14.7,
                  "valorTotal": 646.8
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 13.3,
                "valorCalculado": {
                  "valorUnitario": 13.3,
                  "valorTotal": 585.2
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 10,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "10",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 23,
        "criterioValor": "E",
        "valorEstimadoUnitario": 12.35,
        "valorEstimadoTotal": 284.05,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 23,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 12.34,
                "valorCalculado": {
                  "valorUnitario": 12.34,
                  "valorTotal": 283.82
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 7.0,
                "valorCalculado": {
                  "valorUnitario": 7.0,
                  "valorTotal": 161.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 23,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 12.35,
                "valorCalculado": {
                  "valorUnitario": 12.35,
                  "valorTotal": 284.05
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 8.6,
                "valorCalculado": {
                  "valorUnitario": 8.6,
                  "valorTotal": 197.8
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 11,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "11",
        "descricao": "Tempero",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 45,
        "criterioValor": "E",
        "valorEstimadoUnitario": 20.22,
        "valorEstimadoTotal": 909.9,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 45,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 20.21,
                "valorCalculado": {
                  "valorUnitario": 20.21,
                  "valorTotal": 909.45
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 18.0,
                "valorCalculado": {
                  "valorUnitario": 18.0,
                  "valorTotal": 810.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 45,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 20.22,
                "valorCalculado": {
                  "valorUnitario": 20.22,
                  "valorTotal": 909.9
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 19.7,
                "valorCalculado": {
                  "valorUnitario": 19.7,
                  "valorTotal": 886.5
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 12,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "12",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 84,
        "criterioValor": "E",
        "valorEstimadoUnitario": 26.24,
        "valorEstimadoTotal": 2204.16,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 84,
            "marcaFabricante": "tempera bem/casa pedro",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 26.23,
                "valorCalculado": {
                  "valorUnitario": 26.23,
                  "valorTotal": 2203.32
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 26.23,
                "valorCalculado": {
                  "valorUnitario": 26.23,
                  "valorTotal": 2203.32
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 84,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 26.24,
                "valorCalculado": {
                  "valorUnitario": 26.24,
                  "valorTotal": 2204.16
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 19.08,
                "valorCalculado": {
                  "valorUnitario": 19.08,
                  "valorTotal": 1602.72
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 13,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "13",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 44,
        "criterioValor": "E",
        "valorEstimadoUnitario": 13.33,
        "valorEstimadoTotal": 586.52,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 44,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 13.32,
                "valorCalculado": {
                  "valorUnitario": 13.32,
                  "valorTotal": 586.08
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 11.0,
                "valorCalculado": {
                  "valorUnitario": 11.0,
                  "valorTotal": 484.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 44,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 13.33,
                "valorCalculado": {
                  "valorUnitario": 13.33,
                  "valorTotal": 586.52
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 13.33,
                "valorCalculado": {
                  "valorUnitario": 13.33,
                  "valorTotal": 586.52
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 14,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "14",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 22,
        "criterioValor": "E",
        "valorEstimadoUnitario": 28.8,
        "valorEstimadoTotal": 633.6,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 22,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 28.79,
                "valorCalculado": {
                  "valorUnitario": 28.79,
                  "valorTotal": 633.38
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 28.79,
                "valorCalculado": {
                  "valorUnitario": 28.79,
                  "valorTotal": 633.38
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 22,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 28.8,
                "valorCalculado": {
                  "valorUnitario": 28.8,
                  "valorTotal": 633.6
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 16.51,
                "valorCalculado": {
                  "valorUnitario": 16.51,
                  "valorTotal": 363.22
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 15,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "15",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 65,
        "criterioValor": "E",
        "valorEstimadoUnitario": 23.31,
        "valorEstimadoTotal": 1515.15,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 65,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 23.3,
                "valorCalculado": {
                  "valorUnitario": 23.3,
                  "valorTotal": 1514.5
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 19.0,
                "valorCalculado": {
                  "valorUnitario": 19.0,
                  "valorTotal": 1235.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 65,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 23.31,
                "valorCalculado": {
                  "valorUnitario": 23.31,
                  "valorTotal": 1515.15
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 21.37,
                "valorCalculado": {
                  "valorUnitario": 21.37,
                  "valorTotal": 1389.05
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 16,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "16",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 92,
        "criterioValor": "E",
        "valorEstimadoUnitario": 14.55,
        "valorEstimadoTotal": 1338.6,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 92,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.54,
                "valorCalculado": {
                  "valorUnitario": 14.54,
                  "valorTotal": 1337.68
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 8.0,
                "valorCalculado": {
                  "valorUnitario": 8.0,
                  "valorTotal": 736.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 92,
            "marcaFabricante": "TEM´PERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.55,
                "valorCalculado": {
                  "valorUnitario": 14.55,
                  "valorTotal": 1338.6
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 11.12,
                "valorCalculado": {
                  "valorUnitario": 11.12,
                  "valorTotal": 1023.04
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 17,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "17",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 68,
        "criterioValor": "E",
        "valorEstimadoUnitario": 14.27,
        "valorEstimadoTotal": 970.36,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 68,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500 g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.26,
                "valorCalculado": {
                  "valorUnitario": 14.26,
                  "valorTotal": 969.68
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 8.0,
                "valorCalculado": {
                  "valorUnitario": 8.0,
                  "valorTotal": 544.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 68,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.27,
                "valorCalculado": {
                  "valorUnitario": 14.27,
                  "valorTotal": 970.36
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 9.96,
                "valorCalculado": {
                  "valorUnitario": 9.96,
                  "valorTotal": 677.28
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 18,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "18",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 75,
        "criterioValor": "E",
        "valorEstimadoUnitario": 14.86,
        "valorEstimadoTotal": 1114.5,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 75,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.85,
                "valorCalculado": {
                  "valorUnitario": 14.85,
                  "valorTotal": 1113.75
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 8.0,
                "valorCalculado": {
                  "valorUnitario": 8.0,
                  "valorTotal": 600.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 75,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 14.86,
                "valorCalculado": {
                  "valorUnitario": 14.86,
                  "valorTotal": 1114.5
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 9.89,
                "valorCalculado": {
                  "valorUnitario": 9.89,
                  "valorTotal": 741.75
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 19,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "19",
        "descricao": "Condimento",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 100,
        "criterioValor": "E",
        "valorEstimadoUnitario": 18.64,
        "valorEstimadoTotal": 1864.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 100,
            "marcaFabricante": "tempera bem",
            "modeloVersao": "500g",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 18.63,
                "valorCalculado": {
                  "valorUnitario": 18.63,
                  "valorTotal": 1863.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 18.63,
                "valorCalculado": {
                  "valorUnitario": 18.63,
                  "valorTotal": 1863.0
                }
              }
            },
            "participante": {
              "identificacao": "31900031000122",
              "nome": "LENISA DISTRIBUIDORA LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 100,
            "marcaFabricante": "TEMPERABEM/ZANA",
            "modeloVersao": "CARACTERISTICO",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 18.64,
                "valorCalculado": {
                  "valorUnitario": 18.64,
                  "valorTotal": 1864.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 18.64,
                "valorCalculado": {
                  "valorUnitario": 18.64,
                  "valorTotal": 1864.0
                }
              }
            },
            "participante": {
              "identificacao": "09031962000182",
              "nome": "C C S VALENTE COMERCIO DE GENEROS ALIMENTICIOS",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
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
    const [dadosCnetMobile, setDadosCnetMobile] = useState([dadosAgrupados])
    //const [dadosCnetMobile, setDadosCnetMobile] = useState()
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
                                        //startFetchingCnetMobile()
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