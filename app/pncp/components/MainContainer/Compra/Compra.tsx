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
    "valorEstimadoTotal": 8491.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 7,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 8491.0,
              "valorUnitario": null
            },
            "valorInformado": 8491.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8438.5,
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
          "identificacao": "37771209000169",
          "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o Grupo 3; - Catálogo dos itens; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:26:00",
        "motivoDesclassificacao": "Não apresentou a documentação no prazo solicitado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 8491.0,
              "valorUnitario": null
            },
            "valorInformado": 8491.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8491.0,
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
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio dos seguintes documentos: - Indicação de preposto; - Contrato social..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T16:13:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ],
    "subItens": [
      {
        "numero": 23,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "23",
        "descricao": "Bicarbonato de potássio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 4000,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.17,
        "valorEstimadoTotal": 680.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 4000,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.17,
                "valorCalculado": {
                  "valorUnitario": 0.17,
                  "valorTotal": 680.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.16,
                "valorCalculado": {
                  "valorUnitario": 0.16,
                  "valorTotal": 640.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 4000,
            "descricaoDetalhada": "Bicarbonato de potássio - Bicarbonato De Potássio Aspecto Físico: Cristal Branco, Inodoro , Peso Molecular: 100,12 G/MOL, Fórmula Química: Khco3 , Grau De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 298-14-6",
            "marcaFabricante": "EXODO",
            "modeloVersao": "BP07624RA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.17,
                "valorCalculado": {
                  "valorUnitario": 0.17,
                  "valorTotal": 680.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.17,
                "valorCalculado": {
                  "valorUnitario": 0.17,
                  "valorTotal": 680.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 24,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "24",
        "descricao": "Borohidreto de sódio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 800,
        "criterioValor": "E",
        "valorEstimadoUnitario": 1.92,
        "valorEstimadoTotal": 1536.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 800,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 1.92,
                "valorCalculado": {
                  "valorUnitario": 1.92,
                  "valorTotal": 1536.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 1.92,
                "valorCalculado": {
                  "valorUnitario": 1.92,
                  "valorTotal": 1536.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 800,
            "descricaoDetalhada": "Borohidreto de sódio - Borohidreto De Sódio Aspecto Físico: Pó Branco Cristalino , Peso Molecular: 37,83 G/MOL, Fórmula Química: Nabh4 , Grau De Pureza: Pureza Mínima De 98% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 16940-66-2",
            "marcaFabricante": "EXODO",
            "modeloVersao": "BS04197RA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 1.92,
                "valorCalculado": {
                  "valorUnitario": 1.92,
                  "valorTotal": 1536.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 1.92,
                "valorCalculado": {
                  "valorUnitario": 1.92,
                  "valorTotal": 1536.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 25,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "25",
        "descricao": "Cloreto de amônio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 6000,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.4,
        "valorEstimadoTotal": 2400.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 6000,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.4,
                "valorCalculado": {
                  "valorUnitario": 0.4,
                  "valorTotal": 2400.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.4,
                "valorCalculado": {
                  "valorUnitario": 0.4,
                  "valorTotal": 2400.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 6000,
            "descricaoDetalhada": "Cloreto de amônio - Cloreto De Amônio Aspecto Físico: Pó Branco, Cristalino, Inodoro , Peso Molecular: 53,49 G/MOL, Fórmula Química: Nh4cl , Teor De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 12125-02-9",
            "marcaFabricante": "MERCK",
            "modeloVersao": "1014151000",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.4,
                "valorCalculado": {
                  "valorUnitario": 0.4,
                  "valorTotal": 2400.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.4,
                "valorCalculado": {
                  "valorUnitario": 0.4,
                  "valorTotal": 2400.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 26,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "26",
        "descricao": "Cromato de potássio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 4500,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.21,
        "valorEstimadoTotal": 945.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 4500,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.21,
                "valorCalculado": {
                  "valorUnitario": 0.21,
                  "valorTotal": 945.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.21,
                "valorCalculado": {
                  "valorUnitario": 0.21,
                  "valorTotal": 945.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 4500,
            "descricaoDetalhada": "Cromato de potássio - Cromato De Potássio Aspecto Físico: Pó Cristalino Amarelo Alaranjado, Inodoro , Fórmula Química: K2cro4 Anidro , Massa Molecular: 194,19 G/MOL, Grau De Pureza: Pureza Mínima De 99% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 7789-00-6",
            "marcaFabricante": "DINAMICA",
            "modeloVersao": "1201",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.21,
                "valorCalculado": {
                  "valorUnitario": 0.21,
                  "valorTotal": 945.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.21,
                "valorCalculado": {
                  "valorUnitario": 0.21,
                  "valorTotal": 945.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 27,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "27",
        "descricao": "Dicromato de potássio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 8500,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.28,
        "valorEstimadoTotal": 2380.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 8500,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.28,
                "valorCalculado": {
                  "valorUnitario": 0.28,
                  "valorTotal": 2380.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.28,
                "valorCalculado": {
                  "valorUnitario": 0.28,
                  "valorTotal": 2380.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 8500,
            "descricaoDetalhada": "Dicromato de potássio - Aspecto Físico: Pó Fino, Cristalino, Cor Laranja, Composição Química: K2cr2o7, Peso Molecular: 294,18 G/MOL, Grau De Pureza: Pureza Mínima De 99%, Característica Adicional: Reagente P.A./ Acs, Número De Referência Química: Cas 7778-50-9,",
            "marcaFabricante": "DINAMICA",
            "modeloVersao": "1565",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.28,
                "valorCalculado": {
                  "valorUnitario": 0.28,
                  "valorTotal": 2380.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.28,
                "valorCalculado": {
                  "valorUnitario": 0.28,
                  "valorTotal": 2380.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 28,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "28",
        "descricao": "Dicromato de sódio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 2500,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.07,
        "valorEstimadoTotal": 175.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 2500,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.07,
                "valorCalculado": {
                  "valorUnitario": 0.07,
                  "valorTotal": 175.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.07,
                "valorCalculado": {
                  "valorUnitario": 0.07,
                  "valorTotal": 175.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 2500,
            "descricaoDetalhada": "Dicromato de sódio - Dicromato De Sódio Aspecto Físico: Pó Cristalino Laranja Avermelhado, Brilhante , Peso Molecular: 297,99 G/MOL, Fórmula Química: Na2 Cr2o7. 2h2o (Dihidratado) , Grau De Pureza: Pureza Mínima De 99% , Número De Referência Química: Cas 7789-12-0",
            "marcaFabricante": "EXODO",
            "modeloVersao": "DS09322RA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.07,
                "valorCalculado": {
                  "valorUnitario": 0.07,
                  "valorTotal": 175.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.07,
                "valorCalculado": {
                  "valorUnitario": 0.07,
                  "valorTotal": 175.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 29,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "29",
        "descricao": "Permanganato de potássio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 1250,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.3,
        "valorEstimadoTotal": 375.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 1250,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.3,
                "valorCalculado": {
                  "valorUnitario": 0.3,
                  "valorTotal": 375.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.29,
                "valorCalculado": {
                  "valorUnitario": 0.29,
                  "valorTotal": 362.5
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 1250,
            "descricaoDetalhada": "Permanganato de potássio - Permanganato De Potássio Aspecto Físico: Pó Cristalino Marrom Violáceo, Inodoro , Fórmula Química: Kmno4 , Peso Molecular: 158,03 G/MOL, Grau De Pureza: Pureza Mínima De 99% , Característica Adicional: Reagente P.A , Número De Referência Química: Cas 7722-64-7",
            "marcaFabricante": "DINAMICA",
            "modeloVersao": "1854",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.3,
                "valorCalculado": {
                  "valorUnitario": 0.3,
                  "valorTotal": 375.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.3,
                "valorCalculado": {
                  "valorUnitario": 0.3,
                  "valorTotal": 375.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      }
    ]
  },
  {
    "numero": -2,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G3",
    "descricao": "Grupo 3",
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
    "valorEstimadoTotal": 34992.0,
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
              "valorTotal": 34992.0,
              "valorUnitario": null
            },
            "valorInformado": 34992.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 30690.0,
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
          "identificacao": "37771209000169",
          "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o Grupo 3; - Catálogo dos itens; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:25:00",
        "motivoDesclassificacao": "Não apresentou a documentação no prazo solicitado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 35805.0,
              "valorUnitario": null
            },
            "valorInformado": 35805.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 34860.0,
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
          "identificacao": "71443667000107",
          "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito anexar a Indicação de Preposto.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T16:28:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ],
    "subItens": [
      {
        "numero": 17,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "17",
        "descricao": "Nitrato de amônio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 3500,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.29,
        "valorEstimadoTotal": 1015.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 3500,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.29,
                "valorCalculado": {
                  "valorUnitario": 0.29,
                  "valorTotal": 1015.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.28,
                "valorCalculado": {
                  "valorUnitario": 0.28,
                  "valorTotal": 980.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 3500,
            "marcaFabricante": "QUIM. MODERNA/Q.MODERNA",
            "modeloVersao": "PA FR. 500GR",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.29,
                "valorCalculado": {
                  "valorUnitario": 0.29,
                  "valorTotal": 1015.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.29,
                "valorCalculado": {
                  "valorUnitario": 0.29,
                  "valorTotal": 1015.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
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
        "descricao": "Cianeto de potássio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 200,
        "criterioValor": "E",
        "valorEstimadoUnitario": 1.71,
        "valorEstimadoTotal": 342.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 200,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 1.71,
                "valorCalculado": {
                  "valorUnitario": 1.71,
                  "valorTotal": 342.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 1.5,
                "valorCalculado": {
                  "valorUnitario": 1.5,
                  "valorTotal": 300.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 200,
            "marcaFabricante": "CROMOLINE/CROMOLINE",
            "modeloVersao": "PA FR. 100GR",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 3.4,
                "valorCalculado": {
                  "valorUnitario": 3.4,
                  "valorTotal": 680.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 1.7,
                "valorCalculado": {
                  "valorUnitario": 1.7,
                  "valorTotal": 340.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
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
        "descricao": "Nitrato de mercúrio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 2500,
        "criterioValor": "E",
        "valorEstimadoUnitario": 7.71,
        "valorEstimadoTotal": 19275.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 2500,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 7.71,
                "valorCalculado": {
                  "valorUnitario": 7.71,
                  "valorTotal": 19275.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 7.0,
                "valorCalculado": {
                  "valorUnitario": 7.0,
                  "valorTotal": 17500.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 2500,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "EMBALAGENS EXCLUSIVAMENTE EM FRASCOS DE 100 GRAMAS",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 7.9,
                "valorCalculado": {
                  "valorUnitario": 7.9,
                  "valorTotal": 19750.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 7.69,
                "valorCalculado": {
                  "valorUnitario": 7.69,
                  "valorTotal": 19225.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 20,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "20",
        "descricao": "Nitrato de mercúrio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 500,
        "criterioValor": "E",
        "valorEstimadoUnitario": 8.04,
        "valorEstimadoTotal": 4020.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 500,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 8.04,
                "valorCalculado": {
                  "valorUnitario": 8.04,
                  "valorTotal": 4020.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 7.5,
                "valorCalculado": {
                  "valorUnitario": 7.5,
                  "valorTotal": 3750.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 500,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 100 GRAMAS",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 8.04,
                "valorCalculado": {
                  "valorUnitario": 8.04,
                  "valorTotal": 4020.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 8.0,
                "valorCalculado": {
                  "valorUnitario": 8.0,
                  "valorTotal": 4000.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 21,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "21",
        "descricao": "Nitrato de potássio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 4000,
        "criterioValor": "E",
        "valorEstimadoUnitario": 0.6,
        "valorEstimadoTotal": 2400.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 4000,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.6,
                "valorCalculado": {
                  "valorUnitario": 0.6,
                  "valorTotal": 2400.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.59,
                "valorCalculado": {
                  "valorUnitario": 0.59,
                  "valorTotal": 2360.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 4000,
            "marcaFabricante": "QUIM. MODERNA/QUIM.MODERNA ",
            "modeloVersao": "PA FR. 500 GR",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 0.6,
                "valorCalculado": {
                  "valorUnitario": 0.6,
                  "valorTotal": 2400.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 0.6,
                "valorCalculado": {
                  "valorUnitario": 0.6,
                  "valorTotal": 2400.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      },
      {
        "numero": 22,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "22",
        "descricao": "Sulfeto de sódio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 2000,
        "criterioValor": "E",
        "valorEstimadoUnitario": 3.97,
        "valorEstimadoTotal": 7940.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 2000,
            "marcaFabricante": "perfyltech",
            "modeloVersao": "perfyltech",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 3.97,
                "valorCalculado": {
                  "valorUnitario": 3.97,
                  "valorTotal": 7940.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 2.9,
                "valorCalculado": {
                  "valorUnitario": 2.9,
                  "valorTotal": 5800.0
                }
              }
            },
            "participante": {
              "identificacao": "37771209000169",
              "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 2000,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 250 GR",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 3.97,
                "valorCalculado": {
                  "valorUnitario": 3.97,
                  "valorTotal": 7940.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 3.94,
                "valorCalculado": {
                  "valorUnitario": 3.94,
                  "valorTotal": 7880.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      }
    ]
  },
  {
    "numero": 12,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "12",
    "descricao": "Ácido nítrico",
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
    "valorEstimadoUnitario": 203.02,
    "valorEstimadoTotal": 7714.76,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": 38,
    "qtdeAdjudicadaSrp": 38,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 7714.0,
              "valorUnitario": 203.0
            },
            "valorInformado": 203.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7544.52,
              "valorUnitario": 198.54
            },
            "valorInformado": 198.54
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 38,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": "EXODO/EXODO",
        "modeloVersao": "65% PA FR. 1 LITRO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "71443667000107",
          "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio dos seguintes documentos:\n- Indicação de preposto;\n- Contrato social.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T14:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 7714.76,
              "valorUnitario": 203.02
            },
            "valorInformado": 203.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7620.9,
              "valorUnitario": 200.55
            },
            "valorInformado": 200.55
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 38,
        "descricaoDetalhada": "Ácido nítrico - Ácido Nítrico Aspecto Físico: Líquido Límpido,Incolor À Amarelado,Odor Sufocante , Fórmula Química: Hno3 , Peso Molecular: 63,01 G/MOL, Grau De Pureza: Teor Mínimo De 65% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 7697-37-2",
        "situacao": "None",
        "marcaFabricante": "ÊXODO",
        "modeloVersao": "AN06837RA",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "59403410000126",
          "nome": "INTERJET COMERCIAL LTDA",
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
              "valorTotal": 7714.76,
              "valorUnitario": 203.02
            },
            "valorInformado": 203.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7714.76,
              "valorUnitario": 203.02
            },
            "valorInformado": 203.02
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 38,
        "descricaoDetalhada": "Ácido nítrico - Ácido Nítrico Aspecto Físico: Líquido Límpido,Incolor À Amarelado,Odor Sufocante , Fórmula Química: Hno3 , Peso Molecular: 63,01 G/MOL, Grau De Pureza: Teor Mínimo De 65% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 7697-37-2",
        "situacao": "None",
        "marcaFabricante": "EXODO",
        "modeloVersao": "EXODO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
    ],
    "subItens": null
  },
  {
    "numero": -3,
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
    "valorEstimadoTotal": 10215.43,
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
              "valorTotal": 17800.0,
              "valorUnitario": null
            },
            "valorInformado": 17800.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8635.0,
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
          "identificacao": "39512034000109",
          "nome": "SAL R  COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": "Não atende ao item 4.1.1 do Termo de Referência nº 10/2024, parte integrante do Edital.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 30646.29,
              "valorUnitario": null
            },
            "valorInformado": 30646.29
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8826.76,
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
          "identificacao": "08238866000147",
          "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio dos seguintes documentos:\n- Indicação de preposto;\n- Contrato social.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T14:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 9694.0,
              "valorUnitario": null
            },
            "valorInformado": 9694.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 9694.0,
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
          "identificacao": "45914544000105",
          "nome": "PROQUIMIOS CHEMICALS LTDA",
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
              "valorTotal": 10215.43,
              "valorUnitario": null
            },
            "valorInformado": 10215.43
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10215.43,
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
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
    ],
    "subItens": [
      {
        "numero": 9,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "9",
        "descricao": "Ácido acético",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 52,
        "criterioValor": "E",
        "valorEstimadoUnitario": 59.89,
        "valorEstimadoTotal": 3114.28,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 52,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 100.0,
                "valorCalculado": {
                  "valorUnitario": 100.0,
                  "valorTotal": 5200.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 55.0,
                "valorCalculado": {
                  "valorUnitario": 55.0,
                  "valorTotal": 2860.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 52,
            "descricaoDetalhada": "Ácido acético - Ácido Acético Aspecto Físico: Líquido Límpido Transparente , Peso Molecular: 60,05 G/MOL, Fórmula Química: C2h4o2 , Grau De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Glacial,Reagente P.A./ Acs , Número De Referência Química: Cas 64-19-7",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 179.67,
                "valorCalculado": {
                  "valorUnitario": 179.67,
                  "valorTotal": 9342.84
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 54.73,
                "valorCalculado": {
                  "valorUnitario": 54.73,
                  "valorTotal": 2845.96
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 52,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 58.0,
                "valorCalculado": {
                  "valorUnitario": 58.0,
                  "valorTotal": 3016.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 58.0,
                "valorCalculado": {
                  "valorUnitario": 58.0,
                  "valorTotal": 3016.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 52,
            "descricaoDetalhada": "Ácido acético - Ácido Acético Aspecto Físico: Líquido Límpido Transparente , Peso Molecular: 60,05 G/MOL, Fórmula Química: C2h4o2 , Grau De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Glacial,Reagente P.A./ Acs , Número De Referência Química: Cas 64-19-7",
            "marcaFabricante": "EXODO",
            "modeloVersao": "AA09870RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 59.89,
                "valorCalculado": {
                  "valorUnitario": 59.89,
                  "valorTotal": 3114.28
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 59.89,
                "valorCalculado": {
                  "valorUnitario": 59.89,
                  "valorTotal": 3114.28
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Ácido clorídrico",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 63,
        "criterioValor": "E",
        "valorEstimadoUnitario": 48.73,
        "valorEstimadoTotal": 3069.99,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 63,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 100.0,
                "valorCalculado": {
                  "valorUnitario": 100.0,
                  "valorTotal": 6300.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 45.0,
                "valorCalculado": {
                  "valorUnitario": 45.0,
                  "valorTotal": 2835.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 63,
            "descricaoDetalhada": "Ácido clorídrico - Ácido Clorídrico Aspecto Físico: Líquido Límpido, Incolor/Amarelado, Fumegante , Peso Molecular: 36,46 G/MOL, Fórmula Química: Hcl , Teor: Teor Mínimo De 37% , Grau De Pureza: Pureza Mínima De 99% , Característica Adicional: Reagente P.A. / Acs , Número De Referência Química: Cas 7647-01-0",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 146.19,
                "valorCalculado": {
                  "valorUnitario": 146.19,
                  "valorTotal": 9209.97
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 40.36,
                "valorCalculado": {
                  "valorUnitario": 40.36,
                  "valorTotal": 2542.68
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 63,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 46.0,
                "valorCalculado": {
                  "valorUnitario": 46.0,
                  "valorTotal": 2898.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 46.0,
                "valorCalculado": {
                  "valorUnitario": 46.0,
                  "valorTotal": 2898.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 63,
            "descricaoDetalhada": "Ácido clorídrico - Ácido Clorídrico Aspecto Físico: Líquido Límpido, Incolor/Amarelado, Fumegante , Peso Molecular: 36,46 G/MOL, Fórmula Química: Hcl , Teor: Teor Mínimo De 37% , Grau De Pureza: Pureza Mínima De 99% , Característica Adicional: Reagente P.A. / Acs , Número De Referência Química: Cas 7647-01-0",
            "marcaFabricante": "EXODO",
            "modeloVersao": "AC09783RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 48.73,
                "valorCalculado": {
                  "valorUnitario": 48.73,
                  "valorTotal": 3069.99
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 48.73,
                "valorCalculado": {
                  "valorUnitario": 48.73,
                  "valorTotal": 3069.99
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Ácido sulfúrico",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 42,
        "criterioValor": "E",
        "valorEstimadoUnitario": 95.98,
        "valorEstimadoTotal": 4031.16,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 42,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 6300.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 70.0,
                "valorCalculado": {
                  "valorUnitario": 70.0,
                  "valorTotal": 2940.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 42,
            "descricaoDetalhada": "Ácido sulfúrico - Ácido Sulfúrico Aspecto Físico: Líquido Incolor, Fumegante, Viscoso, Cristalino , Fórmula Química: H2so4 , Massa Molecular: 98,09 G/MOL, Grau De Pureza: Pureza Mínima De 95% , Característica Adicional: Reagente P.A. Acs , Número De Referência Química: Cas 7664-93-9",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 287.94,
                "valorCalculado": {
                  "valorUnitario": 287.94,
                  "valorTotal": 12093.48
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 81.86,
                "valorCalculado": {
                  "valorUnitario": 81.86,
                  "valorTotal": 3438.12
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 42,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 90.0,
                "valorCalculado": {
                  "valorUnitario": 90.0,
                  "valorTotal": 3780.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 90.0,
                "valorCalculado": {
                  "valorUnitario": 90.0,
                  "valorTotal": 3780.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 42,
            "descricaoDetalhada": "Ácido sulfúrico - Ácido Sulfúrico Aspecto Físico: Líquido Incolor, Fumegante, Viscoso, Cristalino , Fórmula Química: H2so4 , Massa Molecular: 98,09 G/MOL, Grau De Pureza: Pureza Mínima De 95% , Característica Adicional: Reagente P.A. Acs , Número De Referência Química: Cas 7664-93-9",
            "marcaFabricante": "EXODO",
            "modeloVersao": "AS09591RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 95.98,
                "valorCalculado": {
                  "valorUnitario": 95.98,
                  "valorTotal": 4031.16
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 95.98,
                "valorCalculado": {
                  "valorUnitario": 95.98,
                  "valorTotal": 4031.16
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      }
    ]
  },
  {
    "numero": -4,
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
    "valorEstimadoTotal": 35557.94,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": 8,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 44445.0,
              "valorUnitario": null
            },
            "valorInformado": 44445.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 19810.0,
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
          "identificacao": "39512034000109",
          "nome": "SAL R  COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação:\n- Proposta atualizada para o Grupo 1 (contendo o valor negociado do item 3);\n- Catálogo dos itens; \n- CTF (FTE-Categoria: Indústria Química; Código: 15);\n- Documentos que comprovem a exequibilidade dos itens 4,5,7 e 8.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-20T14:00:00",
        "motivoDesclassificacao": "Não atende ao item 4.1.1. do Termo de Referência nº 10/2024, parte integrante do Edital.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 106673.82,
              "valorUnitario": null
            },
            "valorInformado": 106673.82
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 21408.73,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorSugeridoNegociacao": {
            "valorCalculado": {
              "valorTotal": 21398.09,
              "valorUnitario": null
            },
            "valorInformado": null
          },
          "valorNegociado": {
            "valorCalculado": {
              "valorTotal": 21398.09,
              "valorUnitario": null
            },
            "valorInformado": null
          }
        },
        "quantidadeOfertada": null,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": null,
        "modeloVersao": null,
        "situacaoUltimaNegociacao": "E",
        "justificativaUltimaNegociacao": "Licitante aceitou reduzir o valor do item 3 para o estimado",
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "08238866000147",
          "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio dos seguintes documentos:\n- Indicação de preposto;\n- Contrato social.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T14:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 33868.0,
              "valorUnitario": null
            },
            "valorInformado": 33868.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 33868.0,
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
          "identificacao": "45914544000105",
          "nome": "PROQUIMIOS CHEMICALS LTDA",
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
              "valorTotal": 36189.94,
              "valorUnitario": null
            },
            "valorInformado": 36189.94
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 35554.46,
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
          "identificacao": "71443667000107",
          "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 35557.94,
              "valorUnitario": null
            },
            "valorInformado": 35557.94
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 35557.94,
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
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
    ],
    "subItens": [
      {
        "numero": 1,
        "tipo": "S",
        "disputaPorValorUnitario": true,
        "possuiOrcamentoSigiloso": false,
        "identificador": "1",
        "descricao": "Acetato de etila",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 50,
        "criterioValor": "E",
        "valorEstimadoUnitario": 47.7,
        "valorEstimadoTotal": 2385.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 50,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 100.0,
                "valorCalculado": {
                  "valorUnitario": 100.0,
                  "valorTotal": 5000.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 44.0,
                "valorCalculado": {
                  "valorUnitario": 44.0,
                  "valorTotal": 2200.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 50,
            "descricaoDetalhada": "Acetato de etila - Acetato De Etila Aspecto Físico: Líquido Incolor, Límpido, Inflamável , Pureza Mínima: Pureza Mínima De 99,5% , Composição Química: Ch3co2c2h5 , Peso Molecular: 88,11 G/MOL, Característica Adicional: Reagente P.A. Acs , Número De Referência Química: Cas 141-78-6",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 143.1,
                "valorCalculado": {
                  "valorUnitario": 143.1,
                  "valorTotal": 7155.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 46.43,
                "valorCalculado": {
                  "valorUnitario": 46.43,
                  "valorTotal": 2321.5
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 50,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1000 ML",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 45.0,
                "valorCalculado": {
                  "valorUnitario": 45.0,
                  "valorTotal": 2250.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 45.0,
                "valorCalculado": {
                  "valorUnitario": 45.0,
                  "valorTotal": 2250.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 50,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 60.0,
                "valorCalculado": {
                  "valorUnitario": 60.0,
                  "valorTotal": 3000.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 47.7,
                "valorCalculado": {
                  "valorUnitario": 47.7,
                  "valorTotal": 2385.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 50,
            "descricaoDetalhada": "Acetato de etila - Acetato De Etila Aspecto Físico: Líquido Incolor, Límpido, Inflamável , Pureza Mínima: Pureza Mínima De 99,5% , Composição Química: Ch3co2c2h5 , Peso Molecular: 88,11 G/MOL, Característica Adicional: Reagente P.A. Acs , Número De Referência Química: Cas 141-78-6",
            "marcaFabricante": "DINAMICA ",
            "modeloVersao": "1226-1",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 47.7,
                "valorCalculado": {
                  "valorUnitario": 47.7,
                  "valorTotal": 2385.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 47.7,
                "valorCalculado": {
                  "valorUnitario": 47.7,
                  "valorTotal": 2385.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Acetona",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 78,
        "criterioValor": "E",
        "valorEstimadoUnitario": 73.73,
        "valorEstimadoTotal": 5750.94,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 78,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 100.0,
                "valorCalculado": {
                  "valorUnitario": 100.0,
                  "valorTotal": 7800.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 50.0,
                "valorCalculado": {
                  "valorUnitario": 50.0,
                  "valorTotal": 3900.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 78,
            "descricaoDetalhada": "Acetona - Acetona Aspecto Físico: Líquido Límpido Transparente , Fórmula Química: C3h6o , Massa Molecular: 58,08 G/MOL, Grau De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 67-64-1",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 221.19,
                "valorCalculado": {
                  "valorUnitario": 221.19,
                  "valorTotal": 17252.82
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 52.64,
                "valorCalculado": {
                  "valorUnitario": 52.64,
                  "valorTotal": 4105.92
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 78,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1000 ML",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 70.0,
                "valorCalculado": {
                  "valorUnitario": 70.0,
                  "valorTotal": 5460.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 70.0,
                "valorCalculado": {
                  "valorUnitario": 70.0,
                  "valorTotal": 5460.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 78,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 1LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 73.73,
                "valorCalculado": {
                  "valorUnitario": 73.73,
                  "valorTotal": 5750.94
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 73.73,
                "valorCalculado": {
                  "valorUnitario": 73.73,
                  "valorTotal": 5750.94
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 78,
            "descricaoDetalhada": "Acetona - Acetona Aspecto Físico: Líquido Límpido Transparente , Fórmula Química: C3h6o , Massa Molecular: 58,08 G/MOL, Grau De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 67-64-1",
            "marcaFabricante": "EXODO",
            "modeloVersao": "A09737RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 73.73,
                "valorCalculado": {
                  "valorUnitario": 73.73,
                  "valorTotal": 5750.94
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 73.73,
                "valorCalculado": {
                  "valorUnitario": 73.73,
                  "valorTotal": 5750.94
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Acetona",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 8,
        "criterioValor": "E",
        "valorEstimadoUnitario": 77.44,
        "valorEstimadoTotal": 619.52,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 8,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 250.0,
                "valorCalculado": {
                  "valorUnitario": 250.0,
                  "valorTotal": 2000.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 1200.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 8,
            "descricaoDetalhada": "Acetona - Acetona Aspecto Físico: Líquido Límpido Transparente , Fórmula Química: C3h6o , Massa Molecular: 58,08 G/MOL, Grau De Pureza: Pureza Mínima De 99,8% , Característica Adicional: Reagente P/ Uv-Ir-Hplc-Gpc , Número De Referência Química: Cas 67-64-1",
            "marcaFabricante": "DINÃMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 232.32,
                "valorCalculado": {
                  "valorUnitario": 232.32,
                  "valorTotal": 1858.56
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 78.77,
                "valorCalculado": {
                  "valorUnitario": 78.77,
                  "valorTotal": 630.16
                }
              },
              "valorNegociado": {
                "valorInformado": 77.44,
                "valorCalculado": {
                  "valorUnitario": 77.44,
                  "valorTotal": 619.52
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 8,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1000 ML",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 76.0,
                "valorCalculado": {
                  "valorUnitario": 76.0,
                  "valorTotal": 608.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 76.0,
                "valorCalculado": {
                  "valorUnitario": 76.0,
                  "valorTotal": 608.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 8,
            "marcaFabricante": "DINAMICA/DINAMICA",
            "modeloVersao": "UV/HPLC FR. 1LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 80.0,
                "valorCalculado": {
                  "valorUnitario": 80.0,
                  "valorTotal": 640.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 77.44,
                "valorCalculado": {
                  "valorUnitario": 77.44,
                  "valorTotal": 619.52
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 8,
            "descricaoDetalhada": "Acetona - Acetona Aspecto Físico: Líquido Límpido Transparente , Fórmula Química: C3h6o , Massa Molecular: 58,08 G/MOL, Grau De Pureza: Pureza Mínima De 99,8% , Característica Adicional: Reagente P/ Uv-Ir-Hplc-Gpc , Número De Referência Química: Cas 67-64-1",
            "marcaFabricante": "DINAMICA ",
            "modeloVersao": "1238",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 77.44,
                "valorCalculado": {
                  "valorUnitario": 77.44,
                  "valorTotal": 619.52
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 77.44,
                "valorCalculado": {
                  "valorUnitario": 77.44,
                  "valorTotal": 619.52
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Clorofórmio",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 11,
        "criterioValor": "E",
        "valorEstimadoUnitario": 150.0,
        "valorEstimadoTotal": 1650.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 11,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 100.0,
                "valorCalculado": {
                  "valorUnitario": 100.0,
                  "valorTotal": 1100.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 60.0,
                "valorCalculado": {
                  "valorUnitario": 60.0,
                  "valorTotal": 660.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 11,
            "descricaoDetalhada": "Clorofórmio - Clorofórmio Aspecto Físico: Líquido Claro, Incolor, Odor Forte Característico , Peso Molecular: 119,38 G/MOL, Fórmula Química: Chcl3 , Grau De Pureza: Pureza Mínima De 99,8% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 67-66-3",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 450.0,
                "valorCalculado": {
                  "valorUnitario": 450.0,
                  "valorTotal": 4950.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 103.95,
                "valorCalculado": {
                  "valorUnitario": 103.95,
                  "valorTotal": 1143.45
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 11,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 90.0,
                "valorCalculado": {
                  "valorUnitario": 90.0,
                  "valorTotal": 990.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 90.0,
                "valorCalculado": {
                  "valorUnitario": 90.0,
                  "valorTotal": 990.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 11,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 1LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 1650.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 1650.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 11,
            "descricaoDetalhada": "Clorofórmio - Clorofórmio Aspecto Físico: Líquido Claro, Incolor, Odor Forte Característico , Peso Molecular: 119,38 G/MOL, Fórmula Química: Chcl3 , Grau De Pureza: Pureza Mínima De 99,8% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 67-66-3",
            "marcaFabricante": "EXODO",
            "modeloVersao": "C09877RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 1650.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 1650.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Diclorometano",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 40,
        "criterioValor": "E",
        "valorEstimadoUnitario": 137.0,
        "valorEstimadoTotal": 5480.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 40,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 6000.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 40.0,
                "valorCalculado": {
                  "valorUnitario": 40.0,
                  "valorTotal": 1600.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 40,
            "descricaoDetalhada": "Diclorometano - Diclorometano Aspecto Físico: Líquido Claro, Incolor , Fórmula Química: Ch2cl2 , Massa Molecular: 84,93 G/MOL, Grau De Pureza: Pureza Mínima De 99,8% , Característica Adicional: Reagente P.A. Acs Iso , Número De Referência Química: Cas 75-09-2",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 411.0,
                "valorCalculado": {
                  "valorUnitario": 411.0,
                  "valorTotal": 16440.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 76.49,
                "valorCalculado": {
                  "valorUnitario": 76.49,
                  "valorTotal": 3059.6
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 40,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 135.0,
                "valorCalculado": {
                  "valorUnitario": 135.0,
                  "valorTotal": 5400.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 135.0,
                "valorCalculado": {
                  "valorUnitario": 135.0,
                  "valorTotal": 5400.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 40,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 1LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 137.0,
                "valorCalculado": {
                  "valorUnitario": 137.0,
                  "valorTotal": 5480.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 137.0,
                "valorCalculado": {
                  "valorUnitario": 137.0,
                  "valorTotal": 5480.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 40,
            "descricaoDetalhada": "Diclorometano - Diclorometano Aspecto Físico: Líquido Claro, Incolor , Fórmula Química: Ch2cl2 , Massa Molecular: 84,93 G/MOL, Grau De Pureza: Pureza Mínima De 99,8% , Característica Adicional: Reagente P.A. Acs Iso , Número De Referência Química: Cas 75-09-2",
            "marcaFabricante": "EXODO",
            "modeloVersao": "D09729RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 137.0,
                "valorCalculado": {
                  "valorUnitario": 137.0,
                  "valorTotal": 5480.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 137.0,
                "valorCalculado": {
                  "valorUnitario": 137.0,
                  "valorTotal": 5480.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Éter dietílico",
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
        "valorEstimadoUnitario": 222.06,
        "valorEstimadoTotal": 12879.48,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 58,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 200.0,
                "valorCalculado": {
                  "valorUnitario": 200.0,
                  "valorTotal": 11600.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 150.0,
                "valorCalculado": {
                  "valorUnitario": 150.0,
                  "valorTotal": 8700.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 58,
            "descricaoDetalhada": "Éter dietílico - Éter Dietílico Composição Química: (C2h5)2o , Aspecto Físico: Líquido Límpido, Incolor, Odor Característico , Pureza Mínima: Pureza Mínima De 99,5% , Peso Molecular: 74,12 G/MOL, Característica Adicional: Reagente P.A. Anidro , Número De Referência Química: Cas 60-29-7",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 666.18,
                "valorCalculado": {
                  "valorUnitario": 666.18,
                  "valorTotal": 38638.44
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 134.51,
                "valorCalculado": {
                  "valorUnitario": 134.51,
                  "valorTotal": 7801.58
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 58,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 220.0,
                "valorCalculado": {
                  "valorUnitario": 220.0,
                  "valorTotal": 12760.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 220.0,
                "valorCalculado": {
                  "valorUnitario": 220.0,
                  "valorTotal": 12760.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 58,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 1LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 222.0,
                "valorCalculado": {
                  "valorUnitario": 222.0,
                  "valorTotal": 12876.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 222.0,
                "valorCalculado": {
                  "valorUnitario": 222.0,
                  "valorTotal": 12876.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 58,
            "descricaoDetalhada": "Éter dietílico - Éter Dietílico Composição Química: (C2h5)2o , Aspecto Físico: Líquido Límpido, Incolor, Odor Característico , Pureza Mínima: Pureza Mínima De 99,5% , Peso Molecular: 74,12 G/MOL, Característica Adicional: Reagente P.A. Anidro , Número De Referência Química: Cas 60-29-7",
            "marcaFabricante": "EXODO",
            "modeloVersao": "EE04837RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 222.06,
                "valorCalculado": {
                  "valorUnitario": 222.06,
                  "valorTotal": 12879.48
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 222.06,
                "valorCalculado": {
                  "valorUnitario": 222.06,
                  "valorTotal": 12879.48
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Tolueno",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 8,
        "criterioValor": "E",
        "valorEstimadoUnitario": 281.0,
        "valorEstimadoTotal": 2248.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 8,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 800.0,
                "valorCalculado": {
                  "valorUnitario": 800.0,
                  "valorTotal": 6400.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 100.0,
                "valorCalculado": {
                  "valorUnitario": 100.0,
                  "valorTotal": 800.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 8,
            "descricaoDetalhada": "Tolueno - Tolueno Aspecto Físico: Líquido Incolor, Odor Característico De Benzeno , Composição Química: C7h8 , Peso Molecular: 92,14 G/MOL, Teor De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 108-88-3",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 843.0,
                "valorCalculado": {
                  "valorUnitario": 843.0,
                  "valorTotal": 6744.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 161.39,
                "valorCalculado": {
                  "valorUnitario": 161.39,
                  "valorTotal": 1291.12
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 8,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 275.0,
                "valorCalculado": {
                  "valorUnitario": 275.0,
                  "valorTotal": 2200.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 275.0,
                "valorCalculado": {
                  "valorUnitario": 275.0,
                  "valorTotal": 2200.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 8,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA 99,8% FR. 1LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 281.0,
                "valorCalculado": {
                  "valorUnitario": 281.0,
                  "valorTotal": 2248.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 281.0,
                "valorCalculado": {
                  "valorUnitario": 281.0,
                  "valorTotal": 2248.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 8,
            "descricaoDetalhada": "Tolueno - Tolueno Aspecto Físico: Líquido Incolor, Odor Característico De Benzeno , Composição Química: C7h8 , Peso Molecular: 92,14 G/MOL, Teor De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 108-88-3",
            "marcaFabricante": "EXODO",
            "modeloVersao": "T09725RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 281.0,
                "valorCalculado": {
                  "valorUnitario": 281.0,
                  "valorTotal": 2248.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 281.0,
                "valorCalculado": {
                  "valorUnitario": 281.0,
                  "valorTotal": 2248.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
        "descricao": "Tolueno",
        "criterioJulgamento": "1",
        "homologado": true,
        "situacaoEnvioResultado": "SP",
        "numeroSessaoJulgHab": 1,
        "tipoTratamentoDiferenciadoMeEpp": "1",
        "participacaoExclusivaMeEppOuEquiparadas": true,
        "situacao": "1",
        "fase": "AE",
        "quantidadeSolicitada": 15,
        "criterioValor": "E",
        "valorEstimadoUnitario": 303.0,
        "valorEstimadoTotal": 4545.0,
        "julgHabEncerrada": true,
        "propostaItem": [
          {
            "quantidadeOfertada": 15,
            "marcaFabricante": "sal-r",
            "modeloVersao": "1",
            "situacao": "2",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 303.0,
                "valorCalculado": {
                  "valorUnitario": 303.0,
                  "valorTotal": 4545.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 50.0,
                "valorCalculado": {
                  "valorUnitario": 50.0,
                  "valorTotal": 750.0
                }
              }
            },
            "participante": {
              "identificacao": "39512034000109",
              "nome": "SAL R  COMERCIAL LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 15,
            "descricaoDetalhada": "Tolueno - Tolueno Aspecto Físico: Líquido Incolor, Odor Característico De Benzeno , Composição Química: C7h8 , Peso Molecular: 92,14 G/MOL, Teor De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente Acs , Número De Referência Química: Cas 108-88-3",
            "marcaFabricante": "DINÂMICA",
            "modeloVersao": "DINÂMICA",
            "situacao": "6",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 909.0,
                "valorCalculado": {
                  "valorUnitario": 909.0,
                  "valorTotal": 13635.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 70.36,
                "valorCalculado": {
                  "valorUnitario": 70.36,
                  "valorTotal": 1055.4
                }
              }
            },
            "participante": {
              "identificacao": "08238866000147",
              "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false,
            "situacaoUltimaNegociacao": "E"
          },
          {
            "quantidadeOfertada": 15,
            "marcaFabricante": "PROQUIMIOS",
            "modeloVersao": "FRASCOS DE 1 LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 280.0,
                "valorCalculado": {
                  "valorUnitario": 280.0,
                  "valorTotal": 4200.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 280.0,
                "valorCalculado": {
                  "valorUnitario": 280.0,
                  "valorTotal": 4200.0
                }
              }
            },
            "participante": {
              "identificacao": "45914544000105",
              "nome": "PROQUIMIOS CHEMICALS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 15,
            "marcaFabricante": "EXODO/EXODO",
            "modeloVersao": "PA FR. 1LITRO",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 303.0,
                "valorCalculado": {
                  "valorUnitario": 303.0,
                  "valorTotal": 4545.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 303.0,
                "valorCalculado": {
                  "valorUnitario": 303.0,
                  "valorTotal": 4545.0
                }
              }
            },
            "participante": {
              "identificacao": "71443667000107",
              "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          },
          {
            "quantidadeOfertada": 15,
            "descricaoDetalhada": "Tolueno - Tolueno Aspecto Físico: Líquido Incolor, Odor Característico De Benzeno , Composição Química: C7h8 , Peso Molecular: 92,14 G/MOL, Teor De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente Acs , Número De Referência Química: Cas 108-88-3",
            "marcaFabricante": "EXODO",
            "modeloVersao": "T09725RA",
            "empatadoComoMelhorClassificado": false,
            "valores": {
              "valorPropostaInicial": {
                "valorInformado": 303.0,
                "valorCalculado": {
                  "valorUnitario": 303.0,
                  "valorTotal": 4545.0
                }
              },
              "valorPropostaInicialOuLances": {
                "valorInformado": 303.0,
                "valorCalculado": {
                  "valorUnitario": 303.0,
                  "valorTotal": 4545.0
                }
              }
            },
            "participante": {
              "identificacao": "32578926000155",
              "nome": "DINALAB COMERCIO E SERVICOS LTDA",
              "tipo": "J"
            },
            "declaracaoMeEpp": true,
            "canalChatAberto": false
          }
        ]
      }
    ]
  },
  {
    "numero": 15,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "15",
    "descricao": "Ácido fórmico",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 3,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 257.88,
    "valorEstimadoTotal": 773.64,
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
              "valorTotal": 773.64,
              "valorUnitario": 257.88
            },
            "valorInformado": 257.88
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 764.22,
              "valorUnitario": 254.74
            },
            "valorInformado": 254.74
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 3,
        "descricaoDetalhada": "Ácido fórmico - Ácido Fórmico Aspecto Físico: Líquido Incolor, Odor Penetrante , Composição Química: Hcooh , Peso Molecular: 46,03 G/MOL, Teor De Pureza: Pureza Mínima De 98% , Característica Adicional: Reagente P.A. Acs , Número De Referência Química: Cas 64-18-6",
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "PERFYLTECH",
        "modeloVersao": "RP-001100",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "59403410000126",
          "nome": "INTERJET COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 15; - Catálogo do item; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:29:00",
        "motivoDesclassificacao": " Não enviou a documentação no prazo solicitado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 765.0,
              "valorUnitario": 255.0
            },
            "valorInformado": 255.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 765.0,
              "valorUnitario": 255.0
            },
            "valorInformado": 255.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 3,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "PROQUIMIOS",
        "modeloVersao": "FRASCOS DE 1 LITRO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "45914544000105",
          "nome": "PROQUIMIOS CHEMICALS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 15; - Catálogo do item; - CTF do fabricante.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-25T14:08:00",
        "motivoDesclassificacao": "Não atende ao item 4.1.1 do Termo de Referência nº 10/2024, parte integrante do Edital",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ],
    "subItens": null
  },
  {
    "numero": 13,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "13",
    "descricao": "Ácido benzóico",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 1000,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 0.16,
    "valorEstimadoTotal": 160.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": 1000,
    "qtdeAdjudicadaSrp": 1000,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 160.0,
              "valorUnitario": 0.16
            },
            "valorInformado": 0.16
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 160.0,
              "valorUnitario": 0.16
            },
            "valorInformado": 0.16
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 1000,
        "descricaoDetalhada": "Ácido benzóico - Aspecto Físico: Pó Branco Ou Cristal Incolor, C/ Odor Forte, Fórmula Química: C6h5cooh, Peso Molecular: 122,12 G/MOL, Grau De Pureza: Pureza Mínima De 99,5%, Característica Adicional: Reagente P.A., Número De Referência Química: Cas 65-85-0,",
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "EXODO",
        "modeloVersao": "AB08127RA",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 13; - Catálogo do item; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:28:00",
        "motivoDesclassificacao": "Não encaminhou a documentação no prazo solicitado.",
        "situacaoNaDisputaFinal": "5",
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 160.0,
              "valorUnitario": 0.16
            },
            "valorInformado": 0.16
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 160.0,
              "valorUnitario": 0.16
            },
            "valorInformado": 0.16
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 1000,
        "descricaoDetalhada": null,
        "situacao": "Proposta adjudicada",
        "marcaFabricante": "EXODO/EXODO",
        "modeloVersao": "PA FR. 500 GR",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "71443667000107",
          "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito anexar a Indicação de Preposto.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T16:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": "5",
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 50000.0,
              "valorUnitario": 50.0
            },
            "valorInformado": 50.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 50000.0,
              "valorUnitario": 50.0
            },
            "valorInformado": 50.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 1000,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "PROQUIMIOS",
        "modeloVersao": "FRASCOS DE 1000 GRAMAS",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "45914544000105",
          "nome": "PROQUIMIOS CHEMICALS LTDA",
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
    ],
    "subItens": null
  },
  {
    "numero": 14,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "14",
    "descricao": "Ácido bórico",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 9500,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 0.04,
    "valorEstimadoTotal": 380.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": 9500,
    "qtdeAdjudicadaSrp": 9500,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 380.0,
              "valorUnitario": 0.04
            },
            "valorInformado": 0.04
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 380.0,
              "valorUnitario": 0.04
            },
            "valorInformado": 0.04
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 9500,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "perfyltech",
        "modeloVersao": "perfyltech",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "37771209000169",
          "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 14; - Catálogo do item; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:26:00",
        "motivoDesclassificacao": "Não apresentou os documentos no prazo solicitado.",
        "situacaoNaDisputaFinal": "5",
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 380.0,
              "valorUnitario": 0.04
            },
            "valorInformado": 0.04
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 380.0,
              "valorUnitario": 0.04
            },
            "valorInformado": 0.04
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 9500,
        "descricaoDetalhada": "Ácido bórico - Ácido Bórico Aspecto Físico: Cristal Incolor Ou Pó/Grânulo Branco, Inodoro , Peso Molecular: 61,83 G/MOL, Composição Química: H3bo3 , Grau De Pureza: Pureza Mínima De 99,5% , Característica Adicional: Reagente P.A. , Número De Referência Química: Cas 10043-35-3",
        "situacao": "Proposta adjudicada",
        "marcaFabricante": "DINAMICA ",
        "modeloVersao": "1253",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio dos seguintes documentos: - Indicação de preposto; - Contrato social..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T16:13:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": "5",
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 380000.0,
              "valorUnitario": 40.0
            },
            "valorInformado": 40.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 380000.0,
              "valorUnitario": 40.0
            },
            "valorInformado": 40.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 9500,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "PROQUIMIOS",
        "modeloVersao": "FRASCOS DE 1000 GRAMAS",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "45914544000105",
          "nome": "PROQUIMIOS CHEMICALS LTDA",
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
    ],
    "subItens": null
  },
  {
    "numero": 30,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "30",
    "descricao": "Cafeína",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 2500,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 0.79,
    "valorEstimadoTotal": 1975.0,
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
              "valorTotal": 1975.0,
              "valorUnitario": 0.79
            },
            "valorInformado": 0.79
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1975.0,
              "valorUnitario": 0.79
            },
            "valorInformado": 0.79
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2500,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "perfyltech",
        "modeloVersao": "perfyltech",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "37771209000169",
          "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 30; - Catálogo do item; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:30:00",
        "motivoDesclassificacao": "Não enviou a documentação no prazo solicitado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ],
    "subItens": null
  },
  {
    "numero": 16,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "16",
    "descricao": "Ácido fórmico",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Deserto",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 3,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 78.0,
    "valorEstimadoTotal": 234.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [],
    "subItens": null
  },
  {
    "numero": 33,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "33",
    "descricao": "Formamida",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 2,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 295.33,
    "valorEstimadoTotal": 590.66,
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
              "valorTotal": 590.6,
              "valorUnitario": 295.3
            },
            "valorInformado": 295.3
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 590.6,
              "valorUnitario": 295.3
            },
            "valorInformado": 295.3
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "perfyltech",
        "modeloVersao": "perfyltech",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "37771209000169",
          "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 33; - Catálogo do item; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:31:00",
        "motivoDesclassificacao": " Não enviou os documentos no prazo solicitado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ],
    "subItens": null
  },
  {
    "numero": 32,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "32",
    "descricao": "Clorofórmio",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 200,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 18.02,
    "valorEstimadoTotal": 3604.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": 200,
    "qtdeAdjudicadaSrp": 200,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 3604.0,
              "valorUnitario": 18.02
            },
            "valorInformado": 18.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2000.0,
              "valorUnitario": 10.0
            },
            "valorInformado": 10.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 200,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "perfyltech",
        "modeloVersao": "perfyltech",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "37771209000169",
          "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 32; - Catálogo do item; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:30:00",
        "motivoDesclassificacao": "Não enviou a documentação no prazo solicitado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 10812.0,
              "valorUnitario": 54.06
            },
            "valorInformado": 54.06
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2194.0,
              "valorUnitario": 10.97
            },
            "valorInformado": 10.97
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 200,
        "descricaoDetalhada": "Clorofórmio - Clorofórmio Aspecto Físico: Líquido Límpido, Incolor, Odor Agradável , Peso Molecular: 120,38 G/MOL, Fórmula Química: Cdcl3 (Clorofórmio Deuterado) , Grau De Pureza: Pureza Isotópica De 99,8 Atom % D , Característica Adicional: Com 0.03 % (V/V) Tms , Número De Referência Química: Cas 865-49-6",
        "situacao": "Proposta adjudicada",
        "marcaFabricante": "DINÂMICA",
        "modeloVersao": "DINÂMICA",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "08238866000147",
          "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio dos seguintes documentos:\n- Indicação de preposto;\n- Contrato social.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T14:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 3604.0,
              "valorUnitario": 18.02
            },
            "valorInformado": 18.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3604.0,
              "valorUnitario": 18.02
            },
            "valorInformado": 18.02
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 200,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "SIGMA/MERCK",
        "modeloVersao": "CÓD. 530735-100G",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "71443667000107",
          "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
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
    ],
    "subItens": null
  },
  {
    "numero": 31,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "31",
    "descricao": "Cloreto de tionila",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Fracassado",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 2,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 1309.46,
    "valorEstimadoTotal": 2618.92,
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
              "valorTotal": 2618.92,
              "valorUnitario": 1309.46
            },
            "valorInformado": 1309.46
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2618.92,
              "valorUnitario": 1309.46
            },
            "valorInformado": 1309.46
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "perfyltech",
        "modeloVersao": "perfyltech",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "37771209000169",
          "nome": "ERINALDO FIGUEIREDO DA SILVA 56865724534",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio da seguinte documentação: - Proposta atualizada para o item 31; - Catálogo do item; - CTF do fabricante..",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-03-21T16:30:00",
        "motivoDesclassificacao": "Não enviou a proposta no prazo solicitado.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      }
    ],
    "subItens": null
  },
  {
    "numero": 34,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "34",
    "descricao": "Fósforo",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 2000,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 1.42,
    "valorEstimadoTotal": 2840.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": 2000,
    "qtdeAdjudicadaSrp": 2000,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 8520.0,
              "valorUnitario": 4.26
            },
            "valorInformado": 4.26
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2240.0,
              "valorUnitario": 1.12
            },
            "valorInformado": 1.12
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2000,
        "descricaoDetalhada": "Fósforo - Fósforo Aspecto Físico: Amorfo, Pó Vermelho, Inodoro , Fórmula Química: P , Peso Molecular: 30,97 G/MOL, Grau De Pureza: Pureza Mínima De 97% , Número De Referência Química: Cas 7723-14-0",
        "situacao": "Proposta adjudicada",
        "marcaFabricante": "DINÃMICA",
        "modeloVersao": "DINÂMICA",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "08238866000147",
          "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito o envio dos seguintes documentos:\n- Indicação de preposto;\n- Contrato social.",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T14:00:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2840.0,
              "valorUnitario": 1.42
            },
            "valorInformado": 1.42
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2440.0,
              "valorUnitario": 1.22
            },
            "valorInformado": 1.22
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2000,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "DINAMICA/DINAMICA",
        "modeloVersao": "EMBALAGEM MINIMA COM 500 GRAMAS",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "71443667000107",
          "nome": "ORBITAL PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 2840.0,
              "valorUnitario": 1.42
            },
            "valorInformado": 1.42
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2840.0,
              "valorUnitario": 1.42
            },
            "valorInformado": 1.42
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2000,
        "descricaoDetalhada": "Fósforo - Fósforo Aspecto Físico: Amorfo, Pó Vermelho, Inodoro , Fórmula Química: P , Peso Molecular: 30,97 G/MOL, Grau De Pureza: Pureza Mínima De 97% , Número De Referência Química: Cas 7723-14-0",
        "situacao": "None",
        "marcaFabricante": "DINAMICA ",
        "modeloVersao": "1660",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 1600000.0,
              "valorUnitario": 800.0
            },
            "valorInformado": 800.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1600000.0,
              "valorUnitario": 800.0
            },
            "valorInformado": 800.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 2000,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "PROQUIMIOS",
        "modeloVersao": "FRASCOS DE 500 GRAMAS",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "45914544000105",
          "nome": "PROQUIMIOS CHEMICALS LTDA",
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
    ],
    "subItens": null
  },
  {
    "numero": 35,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "35",
    "descricao": "Hidróxido de amônio",
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
    "valorEstimadoUnitario": 44.96,
    "valorEstimadoTotal": 899.2,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": 20,
    "qtdeAdjudicadaSrp": 20,
    "prazosFaseRecursal": {},
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2000.0,
              "valorUnitario": 100.0
            },
            "valorInformado": 100.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 760.0,
              "valorUnitario": 38.0
            },
            "valorInformado": 38.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 20,
        "descricaoDetalhada": null,
        "situacao": "Proposta desclassificada",
        "marcaFabricante": "sal-r",
        "modeloVersao": "1",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "39512034000109",
          "nome": "SAL R  COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": null,
        "justificativaUltimaSolicitacaoAnexos": null,
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": null,
        "motivoDesclassificacao": "Não atende ao item 4.1.1 do Termo de Referência nº 10/2024, parte integrante do Edital.",
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2697.6,
              "valorUnitario": 134.88
            },
            "valorInformado": 134.88
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 799.0,
              "valorUnitario": 39.95
            },
            "valorInformado": 39.95
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 20,
        "descricaoDetalhada": "Hidróxido de amônio - Hidróxido De Amônio Aspecto Físico: Líquido Límpido, Incolor, Volátil, De Odor Acre , Peso Molecular: 35,05 G/MOL, Fórmula Química: Nh4oh , Grau De Pureza: Teor De Nh3 Entre 28 E 30% , Característica Adicional: Em Solução Aquosa, Reagente P.A. Acs Iso , Número De Referência Química: Cas 1336-21-6",
        "situacao": "Proposta adjudicada",
        "marcaFabricante": "DINÂMICA",
        "modeloVersao": "DINÂMICA",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "08238866000147",
          "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicito anexar o Contrato Social e Indicação de Preposto ao item 35",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Não",
        "dataHoraLimiteAtendimento": "2024-04-02T16:25:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 860.0,
              "valorUnitario": 43.0
            },
            "valorInformado": 43.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 860.0,
              "valorUnitario": 43.0
            },
            "valorInformado": 43.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 20,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "PROQUIMIOS",
        "modeloVersao": "FRASCOS DE 1 LITRO",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "45914544000105",
          "nome": "PROQUIMIOS CHEMICALS LTDA",
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
              "valorTotal": 899.2,
              "valorUnitario": 44.96
            },
            "valorInformado": 44.96
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 899.2,
              "valorUnitario": 44.96
            },
            "valorInformado": 44.96
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 20,
        "descricaoDetalhada": "Hidróxido de amônio - Hidróxido De Amônio Aspecto Físico: Líquido Límpido, Incolor, Volátil, De Odor Acre , Peso Molecular: 35,05 G/MOL, Fórmula Química: Nh4oh , Grau De Pureza: Teor De Nh3 Entre 28 E 30% , Característica Adicional: Em Solução Aquosa, Reagente P.A. Acs Iso , Número De Referência Química: Cas 1336-21-6",
        "situacao": "None",
        "marcaFabricante": "EXODO",
        "modeloVersao": "HA09815RA",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "32578926000155",
          "nome": "DINALAB COMERCIO E SERVICOS LTDA",
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
    ],
    "subItens": null
  },
  {
    "numero": 36,
    "tipo": "ItemPregao não agrupado",
    "disputaPorValorUnitario": "Sim",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "36",
    "descricao": "Paracetamol (acetaminofeno)",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Sim",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Deserto",
    "fase": "Adjudicação encerrada",
    "quantidadeSolicitada": 125,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 2.39,
    "valorEstimadoTotal": 298.75,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Sim",
    "qtdeItensDoGrupo": null,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [],
    "subItens": null
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