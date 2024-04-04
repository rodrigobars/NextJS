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
    "numero": -17,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G2",
    "descricao": "Grupo 2",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 481.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 481.0,
              "valorUnitario": null
            },
            "valorInformado": 481.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 98.32,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. \n",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 481.0,
              "valorUnitario": null
            },
            "valorInformado": 481.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 100.27,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 481.0,
              "valorUnitario": null
            },
            "valorInformado": 481.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 166.81,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2200.0,
              "valorUnitario": null
            },
            "valorInformado": 2200.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 220.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 481.0,
              "valorUnitario": null
            },
            "valorInformado": 481.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 237.6,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 481.0,
              "valorUnitario": null
            },
            "valorInformado": 481.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 298.09,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 481.0,
              "valorUnitario": null
            },
            "valorInformado": 481.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 445.39,
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
          "identificacao": "22627453000185",
          "nome": "A C L ASSISTENCIA E COMERCIO DE PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 481.0,
              "valorUnitario": null
            },
            "valorInformado": 481.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 445.5,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 449.0,
              "valorUnitario": null
            },
            "valorInformado": 449.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 449.0,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "numero": -14,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G5",
    "descricao": "Grupo 5",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 16111.0,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 2,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4141.16,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 21600.0,
              "valorUnitario": null
            },
            "valorInformado": 21600.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4142.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5738.04,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6041.8,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6569.0,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 13325.06,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 13326.0,
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
          "identificacao": "11088488000177",
          "nome": "REOBOT COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 108000.0,
              "valorUnitario": null
            },
            "valorInformado": 108000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 14305.18,
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
          "identificacao": "47756053000109",
          "nome": "SA CONSUMIVEIS PRODUTOS DE LABORATORIO LTDA",
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
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 15012.8,
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
              "valorTotal": 16111.0,
              "valorUnitario": null
            },
            "valorInformado": 16111.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 15020.0,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 15940.0,
              "valorUnitario": null
            },
            "valorInformado": 15940.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 15940.0,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 30582.0,
              "valorUnitario": null
            },
            "valorInformado": 30582.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 30582.0,
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
          "identificacao": "49198204000178",
          "nome": "WYARA EMPREENDIMENTOS - LTDA",
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
    "numero": -18,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G1",
    "descricao": "Grupo 1",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 15420.8,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 11,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 15420.8,
              "valorUnitario": null
            },
            "valorInformado": 15420.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5096.52,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 26200.0,
              "valorUnitario": null
            },
            "valorInformado": 26200.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5097.3,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 15420.8,
              "valorUnitario": null
            },
            "valorInformado": 15420.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6726.24,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 15420.8,
              "valorUnitario": null
            },
            "valorInformado": 15420.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7200.29,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 18475.0,
              "valorUnitario": null
            },
            "valorInformado": 18475.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7603.97,
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
          "identificacao": "06238495000178",
          "nome": "DGC COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
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
              "valorTotal": 15420.8,
              "valorUnitario": null
            },
            "valorInformado": 15420.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8484.45,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 15423.59,
              "valorUnitario": null
            },
            "valorInformado": 15423.59
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12185.76,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 15420.8,
              "valorUnitario": null
            },
            "valorInformado": 15420.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12186.02,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 15420.8,
              "valorUnitario": null
            },
            "valorInformado": 15420.8
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 14073.32,
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
      }
    ]
  },
  {
    "numero": -15,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G4",
    "descricao": "Grupo 4",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 16890.72,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 80000.0,
              "valorUnitario": null
            },
            "valorInformado": 80000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3068.0,
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
          "identificacao": "21803386000140",
          "nome": "THAIS KENDERLLY ALVES DA SILVA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 21530.0,
              "valorUnitario": null
            },
            "valorInformado": 21530.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3200.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 16890.72,
              "valorUnitario": null
            },
            "valorInformado": 16890.72
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5017.24,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 16890.72,
              "valorUnitario": null
            },
            "valorInformado": 16890.72
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5017.6,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 34800.0,
              "valorUnitario": null
            },
            "valorInformado": 34800.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5648.52,
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
          "identificacao": "06238495000178",
          "nome": "DGC COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
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
              "valorTotal": 16890.72,
              "valorUnitario": null
            },
            "valorInformado": 16890.72
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6432.85,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 16890.72,
              "valorUnitario": null
            },
            "valorInformado": 16890.72
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7300.8,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorUnitario": null
            },
            "valorInformado": 80000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 14100.6,
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
          "identificacao": "47756053000109",
          "nome": "SA CONSUMIVEIS PRODUTOS DE LABORATORIO LTDA",
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
              "valorTotal": 16890.72,
              "valorUnitario": null
            },
            "valorInformado": 16890.72
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 16290.25,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 16890.72,
              "valorUnitario": null
            },
            "valorInformado": 16890.72
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 16291.0,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 16854.4,
              "valorUnitario": null
            },
            "valorInformado": 16854.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 16854.4,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 16890.72,
              "valorUnitario": null
            },
            "valorInformado": 16890.72
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 16890.72,
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
      }
    ]
  },
  {
    "numero": -16,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G3",
    "descricao": "Grupo 3",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 29578.12,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 19,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 29578.12,
              "valorUnitario": null
            },
            "valorInformado": 29578.12
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 9984.25,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 29578.12,
              "valorUnitario": null
            },
            "valorInformado": 29578.12
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10013.04,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 59125.0,
              "valorUnitario": null
            },
            "valorInformado": 59125.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10294.6,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 34860.0,
              "valorUnitario": null
            },
            "valorInformado": 34860.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10435.32,
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
          "identificacao": "06238495000178",
          "nome": "DGC COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
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
              "valorTotal": 29578.12,
              "valorUnitario": null
            },
            "valorInformado": 29578.12
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 11311.61,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 29578.12,
              "valorUnitario": null
            },
            "valorInformado": 29578.12
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12281.33,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 29578.12,
              "valorUnitario": null
            },
            "valorInformado": 29578.12
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12283.2,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 29578.12,
              "valorUnitario": null
            },
            "valorInformado": 29578.12
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 19713.34,
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
              "valorTotal": 29578.12,
              "valorUnitario": null
            },
            "valorInformado": 29578.12
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 29454.12,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
    "numero": -11,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G8",
    "descricao": "Grupo 8",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 14793.95,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14793.95,
              "valorUnitario": null
            },
            "valorInformado": 14793.95
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4228.7024,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14793.95,
              "valorUnitario": null
            },
            "valorInformado": 14793.95
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4233.15,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14793.95,
              "valorUnitario": null
            },
            "valorInformado": 14793.95
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5158.11,
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
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 14793.95,
              "valorUnitario": null
            },
            "valorInformado": 14793.95
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5959.82,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 15300.0,
              "valorUnitario": null
            },
            "valorInformado": 15300.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5960.0,
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
          "identificacao": "40392813000199",
          "nome": "COMERCIAL SOL RADIANTE LTDA",
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
              "valorTotal": 14793.95,
              "valorUnitario": null
            },
            "valorInformado": 14793.95
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12384.0,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 19900.0,
              "valorUnitario": null
            },
            "valorInformado": 19900.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 12570.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 14793.95,
              "valorUnitario": null
            },
            "valorInformado": 14793.95
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 13345.62,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 44381.85,
              "valorUnitario": null
            },
            "valorInformado": 44381.85
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 14793.83,
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
          "identificacao": "08238866000147",
          "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
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
    "numero": -12,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G7",
    "descricao": "Grupo 7",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 6204.17,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 4,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 40000.0,
              "valorUnitario": null
            },
            "valorInformado": 40000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1806.0,
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
          "identificacao": "21803386000140",
          "nome": "THAIS KENDERLLY ALVES DA SILVA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 7820.0,
              "valorUnitario": null
            },
            "valorInformado": 7820.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2133.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 6204.17,
              "valorUnitario": null
            },
            "valorInformado": 6204.17
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3801.34,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 6204.17,
              "valorUnitario": null
            },
            "valorInformado": 6204.17
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3801.6,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 6188.0,
              "valorUnitario": null
            },
            "valorInformado": 6188.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6188.0,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "numero": -10,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G9",
    "descricao": "Grupo 9",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 5570.02,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 7,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5570.02,
              "valorUnitario": null
            },
            "valorInformado": 5570.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2220.66,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5570.02,
              "valorUnitario": null
            },
            "valorInformado": 5570.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2221.67,
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
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5570.02,
              "valorUnitario": null
            },
            "valorInformado": 5570.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2228.4165,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 5570.02,
              "valorUnitario": null
            },
            "valorInformado": 5570.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2427.25,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5570.02,
              "valorUnitario": null
            },
            "valorInformado": 5570.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2429.21,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 14460.0,
              "valorUnitario": null
            },
            "valorInformado": 14460.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2533.48,
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
          "identificacao": "06238495000178",
          "nome": "DGC COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
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
              "valorTotal": 5552.02,
              "valorUnitario": null
            },
            "valorInformado": 5552.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2543.0,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 5570.02,
              "valorUnitario": null
            },
            "valorInformado": 5570.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5461.29,
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
              "valorTotal": 5570.02,
              "valorUnitario": null
            },
            "valorInformado": 5570.02
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5462.39,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 5544.3,
              "valorUnitario": null
            },
            "valorInformado": 5544.3
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5544.3,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 7425.0,
              "valorUnitario": null
            },
            "valorInformado": 7425.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7425.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
    "numero": -13,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G6",
    "descricao": "Grupo 6",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 4145.4,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 4,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 6090.0,
              "valorUnitario": null
            },
            "valorInformado": 6090.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2259.25,
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
          "identificacao": "06238495000178",
          "nome": "DGC COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4145.4,
              "valorUnitario": null
            },
            "valorInformado": 4145.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2329.04,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 4145.4,
              "valorUnitario": null
            },
            "valorInformado": 4145.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2902.83,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 4145.4,
              "valorUnitario": null
            },
            "valorInformado": 4145.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3060.225,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 4145.4,
              "valorUnitario": null
            },
            "valorInformado": 4145.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3133.97,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 4133.15,
              "valorUnitario": null
            },
            "valorInformado": 4133.15
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3568.95,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 4145.4,
              "valorUnitario": null
            },
            "valorInformado": 4145.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4010.51,
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
              "valorTotal": 4145.4,
              "valorUnitario": null
            },
            "valorInformado": 4145.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4085.9,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 12436.2,
              "valorUnitario": null
            },
            "valorInformado": 12436.2
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4133.01,
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
          "identificacao": "08238866000147",
          "nome": "ADONEX COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
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
              "valorTotal": 4270.0,
              "valorUnitario": null
            },
            "valorInformado": 4270.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4270.0,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 6300.0,
              "valorUnitario": null
            },
            "valorInformado": 6300.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6300.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
    "numero": -9,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G10",
    "descricao": "Grupo 10",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 2181.93,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2181.93,
              "valorUnitario": null
            },
            "valorInformado": 2181.93
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 665.79,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2181.93,
              "valorUnitario": null
            },
            "valorInformado": 2181.93
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 666.9,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 2181.93,
              "valorUnitario": null
            },
            "valorInformado": 2181.93
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 748.57,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 2915.0,
              "valorUnitario": null
            },
            "valorInformado": 2915.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 915.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 2181.93,
              "valorUnitario": null
            },
            "valorInformado": 2181.93
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1296.0,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 2181.93,
              "valorUnitario": null
            },
            "valorInformado": 2181.93
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1557.93,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 53000.0,
              "valorUnitario": null
            },
            "valorInformado": 53000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1559.11,
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
          "identificacao": "47756053000109",
          "nome": "SA CONSUMIVEIS PRODUTOS DE LABORATORIO LTDA",
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
              "valorTotal": 2179.4,
              "valorUnitario": null
            },
            "valorInformado": 2179.4
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2179.4,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "numero": -7,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G12",
    "descricao": "Grupo 12",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 10513.59,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 260000.0,
              "valorUnitario": null
            },
            "valorInformado": 260000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3266.0,
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
          "identificacao": "21803386000140",
          "nome": "THAIS KENDERLLY ALVES DA SILVA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 10513.59,
              "valorUnitario": null
            },
            "valorInformado": 10513.59
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3330.99,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 12400.0,
              "valorUnitario": null
            },
            "valorInformado": 12400.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3333.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 10513.59,
              "valorUnitario": null
            },
            "valorInformado": 10513.59
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5346.0,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 10513.59,
              "valorUnitario": null
            },
            "valorInformado": 10513.59
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5429.67,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 10513.59,
              "valorUnitario": null
            },
            "valorInformado": 10513.59
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8471.453,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 10513.59,
              "valorUnitario": null
            },
            "valorInformado": 10513.59
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10481.51,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 10513.59,
              "valorUnitario": null
            },
            "valorInformado": 10513.59
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10485.43,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 10511.0,
              "valorUnitario": null
            },
            "valorInformado": 10511.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10511.0,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "numero": -8,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G11",
    "descricao": "Grupo 11",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 11792.53,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 10,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 11792.53,
              "valorUnitario": null
            },
            "valorInformado": 11792.53
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6705.0,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 11792.53,
              "valorUnitario": null
            },
            "valorInformado": 11792.53
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6705.29,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 19115.0,
              "valorUnitario": null
            },
            "valorInformado": 19115.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6830.6,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 11802.73,
              "valorUnitario": null
            },
            "valorInformado": 11802.73
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 11802.73,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "numero": -5,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G14",
    "descricao": "Grupo 14",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 1673.58,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2100.0,
              "valorUnitario": null
            },
            "valorInformado": 2100.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 670.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1673.58,
              "valorUnitario": null
            },
            "valorInformado": 1673.58
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 710.1,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 1673.58,
              "valorUnitario": null
            },
            "valorInformado": 1673.58
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 864.89,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 1673.58,
              "valorUnitario": null
            },
            "valorInformado": 1673.58
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 865.0,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 1673.58,
              "valorUnitario": null
            },
            "valorInformado": 1673.58
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 995.46,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 1673.58,
              "valorUnitario": null
            },
            "valorInformado": 1673.58
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 995.68,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 1712.0,
              "valorUnitario": null
            },
            "valorInformado": 1712.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1712.0,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "numero": -6,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G13",
    "descricao": "Grupo 13",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 2292.31,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 5,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2292.31,
              "valorUnitario": null
            },
            "valorInformado": 2292.31
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1619.75,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 3175.0,
              "valorUnitario": null
            },
            "valorInformado": 3175.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1620.1,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 2292.31,
              "valorUnitario": null
            },
            "valorInformado": 2292.31
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2292.31,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
    "numero": -4,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G15",
    "descricao": "Grupo 15",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 8072.47,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 13,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 8072.47,
              "valorUnitario": null
            },
            "valorInformado": 8072.47
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2050.05,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 8072.47,
              "valorUnitario": null
            },
            "valorInformado": 8072.47
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2050.6669,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 8072.47,
              "valorUnitario": null
            },
            "valorInformado": 8072.47
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2941.44,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 20600.0,
              "valorUnitario": null
            },
            "valorInformado": 20600.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2941.5,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 11431.17,
              "valorUnitario": null
            },
            "valorInformado": 11431.17
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7165.77,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 8072.47,
              "valorUnitario": null
            },
            "valorInformado": 8072.47
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 7529.72,
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
              "valorTotal": 8072.47,
              "valorUnitario": null
            },
            "valorInformado": 8072.47
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 8072.47,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
    "descricao": "Material laboratório",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": 11,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 597.49,
    "valorEstimadoTotal": 6572.39,
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
              "valorTotal": 16500.0,
              "valorUnitario": 1500.0
            },
            "valorInformado": 1500.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1694.0,
              "valorUnitario": 154.0
            },
            "valorInformado": 154.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 11,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "BHGLASS",
        "modeloVersao": "Clevenger 500ML",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "21803386000140",
          "nome": "THAIS KENDERLLY ALVES DA SILVA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 7700.0,
              "valorUnitario": 700.0
            },
            "valorInformado": 700.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1705.0,
              "valorUnitario": 155.0
            },
            "valorInformado": 155.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 11,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "CARLABOR",
        "modeloVersao": "CARLABOR/VL",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 6572.39,
              "valorUnitario": 597.49
            },
            "valorInformado": 597.49
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5476.9,
              "valorUnitario": 497.9
            },
            "valorInformado": 497.9
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 11,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "CARLABOR",
        "modeloVersao": "ACTV-500",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 6572.39,
              "valorUnitario": 597.49
            },
            "valorInformado": 597.49
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5489.0,
              "valorUnitario": 499.0
            },
            "valorInformado": 499.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 11,
        "descricaoDetalhada": "Material laboratório - Material Laboratório Tipo: Aparelho Clevenger , Material: Vidro , Dimensões: Com Balão 500 ML, Adicional: Graduado , Componentes: Com Torneira Vidro",
        "situacao": "None",
        "marcaFabricante": "QUALIVIDROS",
        "modeloVersao": "QUALIVIDROS",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 6567.0,
              "valorUnitario": 597.0
            },
            "valorInformado": 597.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6567.0,
              "valorUnitario": 597.0
            },
            "valorInformado": 597.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 11,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "Exom",
        "modeloVersao": "500 ml",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "descricao": "Aparelho de kipp",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": 5,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": 538.73,
    "valorEstimadoTotal": 2693.65,
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
              "valorTotal": 5000.0,
              "valorUnitario": 1000.0
            },
            "valorInformado": 1000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1860.0,
              "valorUnitario": 372.0
            },
            "valorInformado": 372.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 5,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "BHGLASS",
        "modeloVersao": "Ap. Kipp 250ML",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "21803386000140",
          "nome": "THAIS KENDERLLY ALVES DA SILVA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 3500.0,
              "valorUnitario": 700.0
            },
            "valorInformado": 700.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1865.0,
              "valorUnitario": 373.0
            },
            "valorInformado": 373.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 5,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "CARLABOR",
        "modeloVersao": "CARLABOR/KIPP",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 2693.65,
              "valorUnitario": 538.73
            },
            "valorInformado": 538.73
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2470.0,
              "valorUnitario": 494.0
            },
            "valorInformado": 494.0
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 5,
        "descricaoDetalhada": "Aparelho de kipp - Aparelho De Kipp Material: Vidro , Capacidade: 250 ML, Componentes: Com Frasco, Balão, Funil E Torneira",
        "situacao": "None",
        "marcaFabricante": "QUALIVIDROS",
        "modeloVersao": "QUALIVIDROS",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 2693.5,
              "valorUnitario": 538.7
            },
            "valorInformado": 538.7
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2693.5,
              "valorUnitario": 538.7
            },
            "valorInformado": 538.7
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 5,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "Exom",
        "modeloVersao": "250 ml",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 2693.65,
              "valorUnitario": 538.73
            },
            "valorInformado": 538.73
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2693.65,
              "valorUnitario": 538.73
            },
            "valorInformado": 538.73
          },
          "valorSugeridoNegociacao": null,
          "valorNegociado": null
        },
        "quantidadeOfertada": 5,
        "descricaoDetalhada": null,
        "situacao": "None",
        "marcaFabricante": "VIDROLABOR",
        "modeloVersao": "VIDROLABOR",
        "situacaoUltimaNegociacao": null,
        "justificativaUltimaNegociacao": null,
        "situacaoNaFaseFechadaModoAbertoFechado": null,
        "participante": {
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
    "numero": -3,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G16",
    "descricao": "Grupo 16",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 6318.63,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 9,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 10410.0,
              "valorUnitario": null
            },
            "valorInformado": 10410.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1702.4,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "E",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 6318.63,
              "valorUnitario": null
            },
            "valorInformado": 6318.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2029.97,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 6318.63,
              "valorUnitario": null
            },
            "valorInformado": 6318.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2565.0,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 6318.63,
              "valorUnitario": null
            },
            "valorInformado": 6318.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2571.44,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 6318.93,
              "valorUnitario": null
            },
            "valorInformado": 6318.93
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3658.51,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 6318.63,
              "valorUnitario": null
            },
            "valorInformado": 6318.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 3658.73,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 6318.63,
              "valorUnitario": null
            },
            "valorInformado": 6318.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4151.3,
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
          "identificacao": "22627453000185",
          "nome": "A C L ASSISTENCIA E COMERCIO DE PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 6318.63,
              "valorUnitario": null
            },
            "valorInformado": 6318.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 4266.24,
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
              "valorTotal": 6318.63,
              "valorUnitario": null
            },
            "valorInformado": 6318.63
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6286.15,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
    "numero": -1,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G18",
    "descricao": "Grupo 18",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 2332.75,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 3,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2332.75,
              "valorUnitario": null
            },
            "valorInformado": 2332.75
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 766.8,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 5950.0,
              "valorUnitario": null
            },
            "valorInformado": 5950.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 768.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 7300.0,
              "valorUnitario": null
            },
            "valorInformado": 7300.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 804.08,
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
          "identificacao": "06238495000178",
          "nome": "DGC COMERCIO DE PRODUTOS PARA LABORATORIO LTDA",
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
              "valorTotal": 2332.75,
              "valorUnitario": null
            },
            "valorInformado": 2332.75
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 907.6,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 2332.75,
              "valorUnitario": null
            },
            "valorInformado": 2332.75
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1205.17,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 2332.75,
              "valorUnitario": null
            },
            "valorInformado": 2332.75
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1239.3,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
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
              "valorTotal": 146000.0,
              "valorUnitario": null
            },
            "valorInformado": 146000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1301.71,
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
          "identificacao": "47756053000109",
          "nome": "SA CONSUMIVEIS PRODUTOS DE LABORATORIO LTDA",
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
              "valorTotal": 2332.75,
              "valorUnitario": null
            },
            "valorInformado": 2332.75
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 1454.58,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 2332.75,
              "valorUnitario": null
            },
            "valorInformado": 2332.75
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2170.5,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 2329.6,
              "valorUnitario": null
            },
            "valorInformado": 2329.6
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 2329.6,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    "numero": -2,
    "tipo": "Grupo",
    "disputaPorValorUnitario": "Não",
    "possuiOrcamentoSigiloso": "Não",
    "identificador": "G17",
    "descricao": "Grupo 17",
    "criterioJulgamento": "Menor Preço",
    "homologado": "Não",
    "situacaoEnvioResultado": "None",
    "numeroSessaoJulgHab": 1,
    "tipoTratamentoDiferenciadoMeEpp": "Exclusividade ME/EPP",
    "participacaoExclusivaMeEppOuEquiparadas": "Sim",
    "situacao": "Ativo",
    "fase": "Disputa Encerrada",
    "quantidadeSolicitada": null,
    "criterioValor": "Valor estimado",
    "valorEstimado": null,
    "valorEstimadoUnitario": null,
    "valorEstimadoTotal": 17764.62,
    "priorizarAbertura": "Não",
    "julgHabEncerrada": "Não",
    "qtdeItensDoGrupo": 5,
    "qtdeAceitaSrp": null,
    "qtdeAdjudicadaSrp": null,
    "prazosFaseRecursal": null,
    "propostasItem": [
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 17764.62,
              "valorUnitario": null
            },
            "valorInformado": 17764.62
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 5652.5717,
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
          "identificacao": "10535809000171",
          "nome": "NNAL COMERCIO DE MATERIAIS MEDICOS E SERVICOS EMPRESARIAIS LTDA",
          "tipo": "Pessoa Jurídica"
        },
        "situacaoUltimaSolicitacaoAnexos": "S",
        "justificativaUltimaSolicitacaoAnexos": "Solicitamos o envio de Proposta para o grupo/item. ",
        "declaracaoMeEpp": "Sim",
        "canalChatAberto": "Sim",
        "dataHoraLimiteAtendimento": "2024-03-28T13:30:00",
        "motivoDesclassificacao": null,
        "situacaoNaDisputaFinal": null,
        "situacaoNoDesempateMeEpp": null
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 538000.0,
              "valorUnitario": null
            },
            "valorInformado": 538000.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6204.37,
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
          "identificacao": "47756053000109",
          "nome": "SA CONSUMIVEIS PRODUTOS DE LABORATORIO LTDA",
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
              "valorTotal": 17764.62,
              "valorUnitario": null
            },
            "valorInformado": 17764.62
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 6207.54,
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
          "identificacao": "11301724000191",
          "nome": "QUALY COMERCIAL LTDA",
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
              "valorTotal": 17763.22,
              "valorUnitario": null
            },
            "valorInformado": 17763.22
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10601.87,
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
      },
      {
        "valores": {
          "valorPropostaInicial": {
            "valorCalculado": {
              "valorTotal": 17764.62,
              "valorUnitario": null
            },
            "valorInformado": 17764.62
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 10606.4,
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
          "identificacao": "35257760000163",
          "nome": "LAB VISION - COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 17764.62,
              "valorUnitario": null
            },
            "valorInformado": 17764.62
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 11856.13,
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
          "identificacao": "31931501000115",
          "nome": "ZARALAB COMERCIO DE PRODUTOS LABORATORIAIS LTDA",
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
              "valorTotal": 27440.0,
              "valorUnitario": null
            },
            "valorInformado": 27440.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 14496.0,
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
          "identificacao": "45947177000138",
          "nome": "CARLABOR PRODUTOS PARA LABORATORIOS LTDA",
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
              "valorTotal": 17764.62,
              "valorUnitario": null
            },
            "valorInformado": 17764.62
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 17750.62,
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
          "identificacao": "26205861000108",
          "nome": "OXYGEN SOLUCOES COMERCIO E SERVICOS LTDA",
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
              "valorTotal": 18146.0,
              "valorUnitario": null
            },
            "valorInformado": 18146.0
          },
          "valorPropostaInicialOuLances": {
            "valorCalculado": {
              "valorTotal": 18146.0,
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
          "identificacao": "55741110000104",
          "nome": "EXOM ARTIGOS PARA LABORATORIOS LTDA",
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
    //const [dadosCnetMobile, setDadosCnetMobile] = useState([dadosAgrupados])
    const [dadosCnetMobile, setDadosCnetMobile] = useState()
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