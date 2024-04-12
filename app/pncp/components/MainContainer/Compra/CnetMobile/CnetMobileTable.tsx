'use client'

import React, { useState, useEffect }  from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, CardHeader, CardBody, Divider, Chip, CardFooter, Spacer, Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import { formatarCnpj } from '@/app/components/Utils/Utils';
import { formatarParaReais } from '../../../../../components/Utils/Utils';
//import CnetMobileAta from './CnetMobileAta';
  
export default function CnetMobileTable( { dados } ) {

    const [dictionary, setDictionary] = useState<Record<number, string>>({});
    
    useEffect(() => {
        //const filteredNumbers = dados[0].filter((proposta) => proposta.numero < 0);
        const filteredNumbers = dados.propostas.filter((proposta) => proposta.numero < 0);
    
        if (filteredNumbers) {
            const generateRandomLightColor = (): string => {
            const hsl = `hsl(${Math.floor(Math.random() * 360)}, 100%, ${Math.floor(Math.random() * 80 + 20)}%)`;
                return hsl;
            };
        
            for (const proposta of filteredNumbers) {
                setDictionary((prevDictionary) => ({
                    ...prevDictionary,
                    [proposta.numero]: generateRandomLightColor(),
                }));
            }
        }
    }, [dados]);

    const situacaoItem = {
        'Adujicação Encerrada' : 'success',
        'Deserto' : 'warning',
        'Fracassado' : 'danger',
    }

    function generateID(): string {
        let id = Math.floor(Math.random() * 1000000).toString(); // Generate 6-digit number
        while (id.length < 6) {
          id = "0" + id; // Pad with zeros if necessary
        }
        return id;
    }

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
                //selectionMode="single"
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
                    <TableColumn>Qtd</TableColumn>
                    <TableColumn>Estimado(Und)</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Hom</TableColumn>
                    <TableColumn>Empresas</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {   
                        //dados[0]
                        dados.propostas
                            .sort((a, b) => a.numero - b.numero)
                            .map((proposta, propostaIndex) =>  (
                                proposta.tipo != 'Grupo' ? 
                                    
                                    <TableRow key={propostaIndex}>

                                        <TableCell></TableCell>

                                        <TableCell
                                            className='animate-none text-center'
                                            >
                                            <Chip variant='flat' color='default' size='lg'>{proposta.identificador}</Chip>
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
                                            className='text-center'
                                            >

                                            { (proposta.situacao == 'Ativo') ?
                                                (
                                                    (proposta.fase == 'Adjudicação encerrada') ?
                                                        <Chip color='success'>Adjudicado</Chip> 
                                                        :
                                                        <>
                                                            <p><strong>fase: </strong>{proposta.fase}</p>
                                                            <p><strong>sessão: </strong>{proposta.numeroSessaoJulgHab}</p>
                                                            {/* <p><strong>situacao: </strong>{proposta.situacao}</p>
                                                            <p><strong>JulHabFim: </strong>{proposta.julgHabEncerrada}</p>
                                                            <p><strong>homologado: </strong>{proposta.homologado}</p> */}
                                                        </>
                                                    
                                                )
                                            :

                                            ( (proposta.situacao == 'Deserto') ?
                                                    <Chip color='warning'>Deserto</Chip> 
                                                :
                                                (
                                                    (proposta.situacao == 'Fracassado') ?
                                                        <Chip color='danger'>Fracassado</Chip> 
                                                    :
                                                    <>
                                                        <p><strong>fase: </strong>{proposta.fase}</p>
                                                        <p><strong>sessão: </strong>{proposta.numeroSessaoJulgHab}</p>
                                                        {/* <p><strong>situacao: </strong>{proposta.situacao}</p>
                                                        <p><strong>JulHabFim: </strong>{proposta.julgHabEncerrada}</p>
                                                        <p><strong>homologado: </strong>{proposta.homologado}</p> */}
                                                    </>
                                                )
                                            )

                                            
                                            }
                                            {/* <Spacer y={5}/>
                                            <p><strong>tipoTratamentoDiferenciadoMeEpp: </strong>{proposta.tipoTratamentoDiferenciadoMeEpp}</p>
                                            <p><strong>Apenas MeEpp ou Equiparadas: </strong>{proposta.participacaoExclusivaMeEppOuEquiparadas}</p> */}
                                            {/* <p><strong>Tipo: </strong>{proposta.tipo}</p> */}
                                            {/* <p><strong>disputaPorValorUnitario: </strong>{proposta.disputaPorValorUnitario}</p> */}
                                            {/* <p><strong>criterioJulgamento: </strong>{proposta.criterioJulgamento}</p> */}
                                            {/* <p><strong>situacaoEnvioResultado: </strong>{proposta.situacaoEnvioResultado}</p> */}
                                            {/* <p><strong>criterioValor: </strong>{proposta.criterioValor}</p> */}
                                            {/* <p><strong>priorizarAbertura: </strong>{proposta.priorizarAbertura}</p>
                                            <p><strong>criterioValor: </strong>{proposta.criterioValor}</p> */}
                                            {/* <p><strong>qtdeItensDoGrupo: </strong>{proposta.qtdeItensDoGrupo}</p>
                                            <p><strong>qtdeAceitaSrp: </strong>{proposta.qtdeAceitaSrp}</p>
                                            <p><strong>qtdeAdjudicadaSrp: </strong>{proposta.qtdeAdjudicadaSrp}</p> */}
                                            {/* <p><strong>prazosFaseRecursal: </strong>{proposta.prazosFaseRecursal}</p> */}
                                        </TableCell>

                                        <TableCell>
                                            <Chip>
                                                {
                                                (proposta.homologado == 'Sim') ?
                                                    <p>Sim</p>
                                                    :
                                                    <p>Não</p>
                                                }
                                            </Chip>
                                        </TableCell>

                                        <TableCell>
                                            <div className='flex gap-4'>
                                                {   
                                                    proposta.propostasItem
                                                    
                                                    ?

                                                    proposta.propostasItem
                                                        .sort((a, b) => a.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal - b.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)
                                                        .map((item, itemIndex) => (
                                                            // isPressable
                                                            <Card key={itemIndex} radius="lg" shadow='md' 
                                                                className='w-[230px] bg-neutral-800'>
                                                                <CardHeader className='flex justify-between'>
                                                                    <div>
                                                                        <p className="text-small truncate text-green-400 animate-pulse">
                                                                            {item.participante.nome.length > 18 ? `${item.participante.nome.slice(0, 18)}...` : item.participante.nome}
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

                                                                        {/* <br></br>
                                                                        { (item.descricaoDetalhada) ?
                                                                            <p><strong>Descrição detalhada:</strong> {item.descricaoDetalhada}</p>
                                                                            :
                                                                            null
                                                                        } */}

                                                                        {/* <p><strong>descricaoDetalhada: </strong>{item.descricaoDetalhada}</p> */}
                                                                    </div>
                                                                </CardBody>

                                                                {(item.motivoDesclassificacao) &&
                                                                            <Accordion isCompact variant='splitted'>
                                                                                <AccordionItem
                                                                                    key="1"
                                                                                    aria-label="Accordion 1"
                                                                                    title='Motivo'
                                                                                    >
                                                                                        <Textarea
                                                                                            isReadOnly
                                                                                            color='warning'
                                                                                            labelPlacement="outside"
                                                                                            defaultValue={item.motivoDesclassificacao}
                                                                                            className="max-w-xs"
                                                                                        />
                                                                                </AccordionItem>
                                                                            </Accordion>
                                                                        }
                                                                        
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

                                                    :

                                                    null
                                                }
                                            </div>
                                        </TableCell>
                                        
                                    </TableRow>

                                    :

                                    proposta.subItens.map((subItem) => (
                                        <TableRow key={generateID()}>
                                            <TableCell>
                                                <Chip variant='flat' size='lg' style={{'backgroundColor': `${dictionary[proposta.numero]}`}}  className={'text-gray-950'}>{proposta.identificador}</Chip>
                                            </TableCell>
                                            <TableCell
                                                className='text-center'>
                                                <Chip variant='flat' color='default'>{subItem.numero}</Chip>
                                            </TableCell>
                                            <TableCell className='text-center'>{subItem.descricao}</TableCell>
                                            <TableCell className='text-center'>{subItem.quantidadeSolicitada}</TableCell>
                                            <TableCell className='text-center'><p className='font-bold'>{subItem.valorEstimadoUnitario ? formatarParaReais(subItem.valorEstimadoUnitario) : null}</p></TableCell>

                                            <TableCell
                                            className='text-center'
                                                >

                                                { (proposta.situacao == 'Ativo') ?
                                                    (
                                                        (proposta.fase == 'Adjudicação encerrada') ?
                                                            <Chip color='success'>Adjudicado</Chip> 
                                                            :
                                                            <>
                                                                <p><strong>fase: </strong>{proposta.fase}</p>
                                                                <p><strong>sessão: </strong>{proposta.numeroSessaoJulgHab}</p>
                                                                {/* <p><strong>situacao: </strong>{proposta.situacao}</p>
                                                                <p><strong>JulHabFim: </strong>{proposta.julgHabEncerrada}</p>
                                                                <p><strong>homologado: </strong>{proposta.homologado}</p> */}
                                                            </>
                                                        
                                                    )
                                                :

                                                ( (proposta.situacao == 'Deserto') ?
                                                        <Chip color='warning'>Deserto</Chip> 
                                                    :
                                                    (
                                                        (proposta.situacao == 'Fracassado') ?
                                                            <Chip color='danger'>Fracassado</Chip> 
                                                        :
                                                        <>
                                                            <p><strong>fase: </strong>{proposta.fase}</p>
                                                            <p><strong>sessão: </strong>{proposta.numeroSessaoJulgHab}</p>
                                                            {/* <p><strong>situacao: </strong>{proposta.situacao}</p>
                                                            <p><strong>JulHabFim: </strong>{proposta.julgHabEncerrada}</p>
                                                            <p><strong>homologado: </strong>{proposta.homologado}</p> */}
                                                        </>
                                                    )
                                                )

                                            
                                            }
                                            {/* <Spacer y={5}/>
                                            <p><strong>tipoTratamentoDiferenciadoMeEpp: </strong>{proposta.tipoTratamentoDiferenciadoMeEpp}</p>
                                            <p><strong>Apenas MeEpp ou Equiparadas: </strong>{proposta.participacaoExclusivaMeEppOuEquiparadas}</p> */}
                                            {/* <p><strong>Tipo: </strong>{proposta.tipo}</p> */}
                                            {/* <p><strong>disputaPorValorUnitario: </strong>{proposta.disputaPorValorUnitario}</p> */}
                                            {/* <p><strong>criterioJulgamento: </strong>{proposta.criterioJulgamento}</p> */}
                                            {/* <p><strong>situacaoEnvioResultado: </strong>{proposta.situacaoEnvioResultado}</p> */}
                                            {/* <p><strong>criterioValor: </strong>{proposta.criterioValor}</p> */}
                                            {/* <p><strong>priorizarAbertura: </strong>{proposta.priorizarAbertura}</p>
                                            <p><strong>criterioValor: </strong>{proposta.criterioValor}</p> */}
                                            {/* <p><strong>qtdeItensDoGrupo: </strong>{proposta.qtdeItensDoGrupo}</p>
                                            <p><strong>qtdeAceitaSrp: </strong>{proposta.qtdeAceitaSrp}</p>
                                            <p><strong>qtdeAdjudicadaSrp: </strong>{proposta.qtdeAdjudicadaSrp}</p> */}
                                            {/* <p><strong>prazosFaseRecursal: </strong>{proposta.prazosFaseRecursal}</p> */}
                                        </TableCell>

                                        <TableCell>
                                            <Chip>
                                                {
                                                (proposta.homologado == 'Sim') ?
                                                    <p>Sim</p>
                                                    :
                                                    <p>Não</p>
                                                }
                                            </Chip>
                                        </TableCell>

                                            <TableCell>
                                                <div className='flex gap-4'>
                                                    {
                                                        subItem.propostasItem
                                                            .sort((a, b) => a.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal - b.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)
                                                            .map((item, itemIndex) => (
                                                                //isPressable
                                                                <Card key={itemIndex} radius="lg" shadow='md' 
                                                                    className='w-[230px] bg-neutral-800'>
                                                                    <CardHeader className='flex justify-between'>
                                                                        <div>
                                                                            <p className="text-small truncate text-green-400 animate-pulse">
                                                                                {item.participante.nome.length > 18 ? `${item.participante.nome.slice(0, 18)}...` : item.participante.nome}
                                                                            </p>
                                                                            <p className="text-small text-default-500 text-left">{formatarCnpj(item.participante.identificacao)}</p>
                                                                        </div>
                                                                        <Chip variant='bordered' color='default' radius='lg' size='md'>{itemIndex+1}</Chip>
                                                                    </CardHeader>
                                                                    <Divider/>
                                                                    <CardBody className='text-center'>
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
                                                                            
                                                                            {/* <br></br>
                                                                            { (item.descricaoDetalhada) ?
                                                                                <p><strong>Descrição detalhada:</strong> {item.descricaoDetalhada}</p>
                                                                                :
                                                                                null
                                                                            } */}

                                                                            {/* <p><strong>descricaoDetalhada: </strong>{item.descricaoDetalhada}</p> */}
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