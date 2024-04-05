import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, CardHeader, CardBody, Divider, Chip, CardFooter, Spacer } from '@nextui-org/react';
import { formatarCnpj } from '@/app/components/Utils/Utils';
import { formatarParaReais } from '../../../../../components/Utils/Utils';
import { stringify } from 'querystring';

export default function CnetMobileTable( { dados } ) {
    console.log(dados.propostas)

    const tipo = (tipo) => {
        if (tipo == "Fornecedor habilitado") return ('primary')
        else if (tipo == "Proposta adjudicada") return ('success')
        else if (tipo == "Proposta desclassificada") return ('warning')
        else if (tipo == "Fornecedor inabilitado") return ('danger')
        else return ('default')
    }

    return (
        <div className='sm gap-5 overflow-x-auto max-w-full'>
            <Table
                selectionMode="single"
                color='secondary'
                isHeaderSticky
                topContentPlacement="outside"
                aria-label="Example static collection table"
                classNames={{
                    wrapper: "overflow-x-scroll"
                }}>
                <TableHeader>
                    <TableColumn>Grupo</TableColumn>
                    <TableColumn>Item</TableColumn>
                    <TableColumn>Descrição</TableColumn>
                    <TableColumn>Quantidade</TableColumn>
                    <TableColumn>ValorEstimado(Und)</TableColumn>
                    <TableColumn>Info</TableColumn>
                    <TableColumn>Empresas</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {
                        //dados.propostas
                        dados[0]
                            .sort((a, b) => a.numero - b.numero)
                            .map((proposta, propostaIndex) =>  (
                                proposta.tipo != 'Grupo' ? 
                                    <TableRow key={propostaIndex}>

                                        <TableCell>
                                            -
                                        </TableCell>

                                        <TableCell
                                            className='animate-none text-center'
                                            >
                                            <Chip variant='flat' color={proposta.tipo=='Grupo' ? 'default' : 'primary'} size='lg'>{proposta.identificador}</Chip>
                                        </TableCell>

                                        <TableCell
                                            className='animate-none text-center'
                                            >
                                            <p className='font-bold'>{proposta.descricao}</p>
                                        </TableCell>

                                        <TableCell
                                            className='animate-none text-center'
                                            >
                                            <p className='font-bold'>{proposta.quantidadeSolicitada}</p>
                                        </TableCell>

                                        <TableCell
                                            className='animate-none text-center'
                                            >
                                            <p className='font-bold'>{proposta.valorEstimadoUnitario ? formatarParaReais(proposta.valorEstimadoUnitario) : null}</p>
                                        </TableCell>

                                        <TableCell
                                            className='text-left'
                                            >
                                            <p><strong>situacao: </strong>{proposta.situacao}</p>
                                            <p><strong>fase: </strong>{proposta.fase}</p>
                                            <p><strong>julgHabEncerrada: </strong>{proposta.julgHabEncerrada}</p>
                                            <p><strong>numeroSessaoJulgHab: </strong>{proposta.numeroSessaoJulgHab}</p>
                                            <p><strong>homologado: </strong>{proposta.homologado}</p>
                                            <Spacer y={5}/>
                                            <p><strong>Tipo: </strong>{proposta.tipo}</p>
                                            <p><strong>disputaPorValorUnitario: </strong>{proposta.disputaPorValorUnitario}</p>
                                            <p><strong>criterioJulgamento: </strong>{proposta.criterioJulgamento}</p>
                                            <p><strong>situacaoEnvioResultado: </strong>{proposta.situacaoEnvioResultado}</p>
                                            <p><strong>tipoTratamentoDiferenciadoMeEpp: </strong>{proposta.tipoTratamentoDiferenciadoMeEpp}</p>
                                            <p><strong>participacaoExclusivaMeEppOuEquiparadas: </strong>{proposta.participacaoExclusivaMeEppOuEquiparadas}</p>
                                            <p><strong>criterioValor: </strong>{proposta.criterioValor}</p>
                                            <p><strong>priorizarAbertura: </strong>{proposta.priorizarAbertura}</p>
                                            <p><strong>criterioValor: </strong>{proposta.criterioValor}</p>
                                            <p><strong>qtdeItensDoGrupo: </strong>{proposta.qtdeItensDoGrupo}</p>
                                            <p><strong>qtdeAceitaSrp: </strong>{proposta.qtdeAceitaSrp}</p>
                                            <p><strong>qtdeAdjudicadaSrp: </strong>{proposta.qtdeAdjudicadaSrp}</p>
                                            {/* <p><strong>prazosFaseRecursal: </strong>{proposta.prazosFaseRecursal}</p> */}
                                        </TableCell>
                                        
                                        <TableCell>
                                            <div className='flex gap-4'>
                                                {
                                                    proposta.propostasItem
                                                        .sort((a, b) => a.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal - b.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)
                                                        .map((item, itemIndex) => (

                                                            <Card key={itemIndex} radius="lg" shadow='md' isPressable
                                                                className='w-[300px] bg-neutral-800'>
                                                                <CardHeader className='flex justify-between'>
                                                                    <div>
                                                                        <p className="text-small truncate text-green-400 animate-pulse">
                                                                            {item.participante.nome.length > 25 ? `${item.participante.nome.slice(0, 25)}...` : item.participante.nome}
                                                                        </p>
                                                                        <p className="text-small text-default-500 text-left">{formatarCnpj(item.participante.identificacao)}</p>
                                                                    </div>
                                                                    <Chip variant='bordered' color='default' radius='lg' size='md'>{itemIndex+1}</Chip>
                                                                </CardHeader>
                                                                <Divider/>
                                                                <CardBody>
                                                                    <div>
                                                                        <p><strong>tipo: </strong>{item.participante.tipo}</p>
                                                                        <p><strong>declaracaoMeEpp: </strong>{item.declaracaoMeEpp}</p>
                                                                        <p><strong>quantidade ofertada: </strong>{item.quantidadeOfertada}</p>
                                                                        <p><strong>Unitario: </strong>{item.valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario ? formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario) : 'None'}</p>
                                                                        <p><strong>Total: </strong>{item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal ? formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal) : 'None'}</p>
                                                                        {(item.valorNegociado) &&
                                                                            <p>Valor Negociado: {formatarParaReais(item.valorNegociado)}</p>
                                                                        }
                                                                        <p><strong>Marca: </strong>{item.marcaFabricante}</p>
                                                                        <p><strong>Modelo: </strong>{item.modeloVersao}</p>
                                                                        <p><strong>descricaoDetalhada: </strong>{item.descricaoDetalhada}</p>
                                                                        <p><strong>motivoDesclassificacao: </strong>{item.motivoDesclassificacao}</p>
                                                                        <p><strong>justificativaUltimaSolicitacaoAnexos: </strong>{item.justificativaUltimaSolicitacaoAnexos}</p>
                                                                    </div>
                                                                </CardBody>
                                                                {(item.situacao != 'None') && (
                                                                    <>
                                                                        <Divider/>
                                                                        <CardFooter className='flex justify-center'>
                                                                            <Chip variant='flat' color={tipo(item.situacao)}>{item.situacao}</Chip>
                                                                        </CardFooter>
                                                                    </>
                                                                )}
                                                            </Card>
                                                        ))
                                                }
                                            </div>
                                        </TableCell>
                                        
                                    </TableRow>

                                    :

                                    proposta.subItens.map((subItem, subItemIndex) => (
                                        <TableRow key={subItemIndex}>
                                            <TableCell>
                                                <Chip variant='flat' color='primary' size='lg'>{proposta.identificador}</Chip>
                                            </TableCell>
                                            <TableCell>{subItem.numero}</TableCell>
                                            <TableCell>{subItem.descricao}</TableCell>
                                            <TableCell>{subItem.quantidadeSolicitada}</TableCell>
                                            <TableCell><p className='font-bold'>{subItem.valorEstimadoUnitario ? formatarParaReais(subItem.valorEstimadoUnitario) : null}</p></TableCell>
                                            <TableCell>
                                                <p><strong>situacao: </strong>{subItem.situacao}</p>
                                                <p><strong>fase: </strong>{subItem.fase}</p>
                                                <p><strong>julgHabEncerrada: </strong>{subItem.julgHabEncerrada}</p>
                                                <p><strong>numeroSessaoJulgHab: </strong>{subItem.numeroSessaoJulgHab}</p>
                                                <p><strong>homologado: </strong>{subItem.homologado}</p>
                                                <Spacer y={5}/>
                                                <p><strong>Tipo: </strong>{subItem.tipo}</p>
                                                <p><strong>disputaPorValorUnitario: </strong>{subItem.disputaPorValorUnitario}</p>
                                                <p><strong>criterioJulgamento: </strong>{subItem.criterioJulgamento}</p>
                                                <p><strong>situacaoEnvioResultado: </strong>{subItem.situacaoEnvioResultado}</p>
                                                <p><strong>tipoTratamentoDiferenciadoMeEpp: </strong>{subItem.tipoTratamentoDiferenciadoMeEpp}</p>
                                                <p><strong>participacaoExclusivaMeEppOuEquiparadas: </strong>{subItem.participacaoExclusivaMeEppOuEquiparadas}</p>
                                                <p><strong>criterioValor: </strong>{subItem.criterioValor}</p>
                                                <p><strong>priorizarAbertura: </strong>{subItem.priorizarAbertura}</p>
                                                <p><strong>criterioValor: </strong>{subItem.criterioValor}</p>
                                                <p><strong>qtdeItensDoGrupo: </strong>{subItem.qtdeItensDoGrupo}</p>
                                                <p><strong>qtdeAceitaSrp: </strong>{subItem.qtdeAceitaSrp}</p>
                                                <p><strong>qtdeAdjudicadaSrp: </strong>{subItem.qtdeAdjudicadaSrp}</p>
                                            </TableCell>
                                            <TableCell>
                                            <div className='flex gap-4'>
                                                {
                                                    subItem.propostaItem
                                                        .sort((a, b) => a.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal - b.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)
                                                        .map((item, itemIndex) => (

                                                            <Card key={itemIndex} radius="lg" shadow='md' isPressable
                                                                className='w-[300px] bg-neutral-800'>
                                                                <CardHeader className='flex justify-between'>
                                                                    <div>
                                                                        <p className="text-small truncate text-green-400 animate-pulse">
                                                                            {item.participante.nome.length > 25 ? `${item.participante.nome.slice(0, 25)}...` : item.participante.nome}
                                                                        </p>
                                                                        <p className="text-small text-default-500 text-left">{formatarCnpj(item.participante.identificacao)}</p>
                                                                    </div>
                                                                    <Chip variant='bordered' color='default' radius='lg' size='md'>{itemIndex+1}</Chip>
                                                                </CardHeader>
                                                                <Divider/>
                                                                <CardBody>
                                                                    <div>
                                                                        <p><strong>tipo: </strong>{item.participante.tipo}</p>
                                                                        <p><strong>declaracaoMeEpp: </strong>{item.declaracaoMeEpp}</p>
                                                                        <p><strong>quantidade ofertada: </strong>{item.quantidadeOfertada}</p>
                                                                        <p><strong>Unitario: </strong>{item.valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario ? formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario) : 'None'}</p>
                                                                        <p><strong>Total: </strong>{item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal ? formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal) : 'None'}</p>
                                                                        {(item.valorNegociado) &&
                                                                            <p>Valor Negociado: {formatarParaReais(item.valorNegociado)}</p>
                                                                        }
                                                                        <p><strong>Marca: </strong>{item.marcaFabricante}</p>
                                                                        <p><strong>Modelo: </strong>{item.modeloVersao}</p>
                                                                        <p><strong>descricaoDetalhada: </strong>{item.descricaoDetalhada}</p>
                                                                        <p><strong>motivoDesclassificacao: </strong>{item.motivoDesclassificacao}</p>
                                                                        <p><strong>justificativaUltimaSolicitacaoAnexos: </strong>{item.justificativaUltimaSolicitacaoAnexos}</p>
                                                                    </div>
                                                                </CardBody>
                                                                {(item.situacao != 'None') && (
                                                                    <>
                                                                        <Divider/>
                                                                        <CardFooter className='flex justify-center'>
                                                                            <Chip variant='flat' color={tipo(item.situacao)}>{item.situacao}</Chip>
                                                                        </CardFooter>
                                                                    </>
                                                                )}
                                                            </Card>
                                                        ))
                                                }
                                            </div>
                                        </TableCell>
                                        </TableRow>
                                    ))

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

// <Card key={itemIndex} radius="lg" shadow='md'
//     className='w-[300px] bg-neutral-800'>
//     <CardHeader className='flex justify-between'>
//         <div>
//             <p className="text-small">
//                 Razão Social: {item.participante.nome}
//             </p>
//             <p className="text-small text-default-500 text-left">
//                 Cnpj: {formatarCnpj(item.participante.identificacao)}
//             </p>
//         </div>
//         <Chip variant='bordered' color='default' radius='lg' size='md'>{itemIndex+1}</Chip>
//     </CardHeader>
//     <Divider/>
//     <CardBody>
//         <div>
//             <p><strong>Quantidade: </strong>{item.quantidadeOfertada}</p>
//             <p><strong>Unitario: </strong>{item.valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario ? formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario) : 'None'}</p>
//             <p><strong>Total: </strong>{item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal ? formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal) : 'None'}</p>
//             {(item.valorNegociado) &&
//                 <p>Valor Negociado: {formatarParaReais(item.valorNegociado)}</p>
//             }
//             <p><strong>Marca: </strong>{item.marcaFabricante}</p>
//             <p><strong>Modelo: </strong>{item.modeloVersao}</p>
//         </div>
//     </CardBody>
//     {(item.situacao != 'None') && (
//         <>
//             <Divider/>
//             <CardFooter className='flex justify-center'>
//                 <Chip variant='flat' color={tipo(item.situacao)}>{item.situacao}</Chip>
//             </CardFooter>
//         </>
//     )}
// </Card>


/////////// Requisição de itens de um grupo

// https://cnetmobile.estaleiro.serpro.gov.br/comprasnet-fase-externa/public/v1/compras/15018205001052023/itens/-3/itens-grupo?tamanhoPagina=10000&pagina=0

/////////// PERFEIÇÃO!!!!!!

// const companys = document.getElementsByClassName("ng-trigger-animationRotate180");
// const filteredElements = Array.from(companys).filter((element, index) => index > 0);
// filteredElements.forEach((item) => item.click())

// const buttonsProposta = Array.from(document.querySelectorAll('button'))
//   .filter(el => el.textContent === 'Proposta');

// let delay = 0;

// // Loop para clicar nos botões com delay individual
// for (const button of buttonsProposta) {
//   setTimeout(() => {
//     button.click();
//   }, delay);

//   delay += 500; // Aumenta o delay para o próximo botão
// }