'use client'

import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, CardHeader, CardBody, Divider, Chip, CardFooter, Spacer, Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import { formatarCnpj } from '@/app/components/Utils/Utils';
import { formatarParaReais } from '../../../../../components/Utils/Utils';
import filterCnetMobile from './filterCnetMobile'

export default function CnetMobileAta( { dados, unidadeMedida } ){

    const empresas = filterCnetMobile(dados)
    let totalGlobal = 0
    console.log(empresas)

    return (
        <div className='sm flex flex-col items-center center gap-10 max-w-full'>
            {Object.entries(empresas).map(([cnpj, objeto]) => {

                const totalValor = objeto.reduce((acc, empresa) => acc + empresa.proposta.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal, 0);
                totalGlobal += totalValor

                return(
                    <> 
                        <Table key={cnpj} className='max-w-[70%]' isStriped
                            topContent={
                                <div className='flex flex-col'>
                                    <p className='text-sm'><strong>Razão Social: </strong>{objeto[0].proposta.participante.nome}</p>
                                    <p className='text-sm'><strong>Cnpj: </strong>{formatarCnpj(cnpj)}</p>
                                </div>
                            }
                            bottomContent={
                                <div className='flex justify-end'>
                                    <p>Total Global:</p>
                                    <p className='pl-10'><strong>{formatarParaReais(totalValor)}</strong></p>
                                </div>
                            }>
                            <TableHeader>
                                <TableColumn style={{ width: '3%' }}>GRUPO</TableColumn>
                                <TableColumn style={{ width: '5%' }}>ITEM</TableColumn>
                                <TableColumn style={{ width: '22%' }}>DESCRIÇÃO</TableColumn>
                                <TableColumn style={{ width: '10%' }}>UND MEDIDA</TableColumn>
                                <TableColumn style={{ width: '5%' }}>QTD</TableColumn>
                                <TableColumn style={{ width: '12.5%' }}>MARCA</TableColumn>
                                <TableColumn style={{ width: '12.5%' }}>MODELO</TableColumn>
                                <TableColumn style={{ width: '15.5%' }}>VALOR (UND)</TableColumn>
                                <TableColumn style={{ width: '19.5%' }}>VALOR TOTAL</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {objeto.sort((a, b) => a.item - b.item).map((empresa, empresaIndex) => (
                                    <TableRow key={empresaIndex}>
                                        <TableCell>{empresa.grupo}</TableCell>
                                        <TableCell>{empresa.item}</TableCell>
                                        <TableCell>{empresa.descricao}</TableCell>
                                        <TableCell>{unidadeMedida[empresa.item]}</TableCell>
                                        <TableCell>{empresa.proposta.quantidadeOfertada}</TableCell>
                                        <TableCell>{empresa.proposta.marcaFabricante}</TableCell>
                                        <TableCell>{empresa.proposta.modeloVersao}</TableCell>
                                        <TableCell className='text-right'>{formatarParaReais(empresa.proposta.valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario)}</TableCell>
                                        <TableCell className='text-right'>{formatarParaReais(empresa.proposta.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* <div>{objeto.sort((a, b) => a.item - b.item).map((empresa) => `${empresa.item},`)}</div> */}
                    </>
                )
            })}
            <p>Total Global: {formatarParaReais(totalGlobal)}</p>
        </div>
    )
}