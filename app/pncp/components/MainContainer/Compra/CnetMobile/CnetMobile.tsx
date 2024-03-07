import React from 'react'

export default function CnetMobile( { dadosCnetMobile } ) {
    return (
        dadosCnetMobile
            .sort((a, b) => a.numero - b.numero)
            .map((proposta, propostaIndex) => 
                <div key={propostaIndex} className='border m-5'>
                    <p>Número: {proposta.numero}</p>
                    <p>Tipo: {proposta.tipo}</p>
                    <p>disputaPorValorUnitario: {proposta.disputaPorValorUnitario}</p>
                    <p>possuiOrcamentoSigiloso: {proposta.possuiOrcamentoSigiloso}</p>
                    <p>identificador: {proposta.identificador}</p>
                    <p>descricao: {proposta.descricao}</p>
                    <p>criterioJulgamento: {proposta.criterioJulgamento}</p>
                    <p>homologado: {proposta.homologado}</p>
                    <p>situacaoEnvioResultado: {proposta.situacaoEnvioResultado}</p>
                    <p>numeroSessaoJulgHab: {proposta.numeroSessaoJulgHab}</p>
                    <p>tipoTratamentoDiferenciadoMeEpp: {proposta.tipoTratamentoDiferenciadoMeEpp}</p>
                    <p>participacaoExclusivaMeEppOuEquiparadas: {proposta.participacaoExclusivaMeEppOuEquiparadas}</p>
                    <p>situacao: {proposta.situacao}</p>
                    <p>quantidadeSolicitada: {proposta.quantidadeSolicitada}</p>
                    <p>criterioValor: {proposta.criterioValor}</p>
                    <p>valorEstimado: {proposta.valorEstimado}</p>
                    <p>valorEstimadoUnitario: {proposta.valorEstimadoUnitario}</p>
                    <p>valorEstimadoTotal: {proposta.valorEstimadoTotal}</p>
                    <p>priorizarAbertura: {proposta.priorizarAbertura}</p>
                    <p>julgHabEncerrada: {proposta.julgHabEncerrada}</p>
                    <p>qtdeItensDoGrupo: {proposta.qtdeItensDoGrupo}</p>
                    <p>qtdeAceitaSrp: {proposta.qtdeAceitaSrp}</p>
                    <p>qtdeAdjudicadaSrp: {proposta.qtdeAdjudicadaSrp}</p>
                    {/* <p>prazosFaseRecursal: {proposta.prazosFaseRecursal}</p> */}
                    <p>propostasItem:</p>
                    {
                        proposta.propostasItem
                            .sort((a, b) => a.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal - b.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)
                            .map((item, itemIndex) => (
                                <div key={itemIndex} className='m-5 border'>
                                    <p>Nome: {item.participante.nome}</p>
                                    <p>Cpf/Cnpj: {item.participante.identificacao}</p>
                                    <p>situacao: {item.situacao}</p>
                                    <p>tipo: {item.participante.tipo}</p>
                                    <p>declaracaoMeEpp: {item.declaracaoMeEpp}</p>
                                    <p>justificativaUltimaSolicitacaoAnexos: {item.justificativaUltimaSolicitacaoAnexos}</p>
                                    <p>motivoDesclassificacao: {item.motivoDesclassificacao}</p>
                                    <p>Total: {item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal}</p>
                                    <p>Valor Negociado: {item.valorNegociado}</p>
                                    <p>marcaFabricante: {item.marcaFabricante}</p>
                                    <p>modeloVersao: {item.modeloVersao}</p>
                                </div>
                            ))
                    }
                </div>
            )
    )
}