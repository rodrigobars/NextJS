import React from 'react'
import { Textarea, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { formatarCnpj } from '@/app/components/Utils/Utils';
import { formatarParaReais } from '../../../../../components/Utils/Utils';

export default function CnetMobileTable( { dados } ) {
    return (
        <div className='sm gap-5 overflow-x-auto max-w-full'>
            <Table
                color='secondary'
                isHeaderSticky
                topContentPlacement="outside"
                aria-label="Example static collection table"
                classNames={{
                    wrapper: "overflow-x-scroll"
                }}>
                <TableHeader>
                    <TableColumn>Item</TableColumn>
                    <TableColumn>Descrição</TableColumn>
                    <TableColumn>Quantidade</TableColumn>
                    <TableColumn>ValorEstimado(Und)</TableColumn>
                    <TableColumn>Empresas</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {
                        dados
                            .sort((a, b) => a.numero - b.numero)
                            .map((proposta, propostaIndex) =>  (
                            <TableRow key={propostaIndex}>

                                <TableCell
                                    className='animate-none text-center'
                                    >
                                    <p className='font-bold'>{proposta.numero}</p>
                                </TableCell>

                                <TableCell>
                                    <Textarea
                                        isReadOnly
                                        color='default'
                                        labelPlacement="outside"
                                        defaultValue={proposta.descricao}
                                        maxRows={2}
                                        className="min-w-[200px] max-w-full text-small text-default-600"
                                    />
                                </TableCell>

                                <TableCell
                                    className='animate-none text-center'
                                    >
                                    <p className='font-bold'>{proposta.quantidadeSolicitada}</p>
                                </TableCell>

                                <TableCell
                                    className='animate-none text-center'
                                    >
                                    <p className='font-bold'>{formatarParaReais(proposta.valorEstimadoUnitario)}</p>
                                </TableCell>
                                
                                <TableCell>
                                    <div className='flex gap-4'>
                                        {
                                            proposta.propostasItem
                                                .sort((a, b) => a.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal - b.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)
                                                .map((item, itemIndex) => (
                                                    <Card key={itemIndex} radius="lg" shadow='md' isPressable
                                                        className='w-[300px] bg-neutral-800'>
                                                        <CardHeader>
                                                            <div>
                                                                <p className="text-small truncate text-green-400 animate-pulse">
                                                                    {item.participante.nome.length > 25 ? `${item.participante.nome.slice(0, 25)}...` : item.participante.nome}
                                                                </p>
                                                                <p className="text-small text-default-500 text-left">{formatarCnpj(item.participante.identificacao)}</p>
                                                            </div>
                                                        </CardHeader>
                                                        <Divider/>
                                                        <CardBody>
                                                            <div>
                                                                <p>tipo: {item.participante.tipo}</p>
                                                                <p>declaracaoMeEpp: {item.declaracaoMeEpp}</p>
                                                                <p>justificativaUltimaSolicitacaoAnexos: {item.justificativaUltimaSolicitacaoAnexos}</p>
                                                                <p>motivoDesclassificacao: {item.motivoDesclassificacao}</p>
                                                                <p>Unitario: {formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.ValorUnitario)}</p>
                                                                <p>Total: {formatarParaReais(item.valores.valorPropostaInicialOuLances.valorCalculado.valorTotal)}</p>
                                                                {(item.valorNegociado) &&
                                                                    <p>Valor Negociado: {item.valorNegociado}</p>
                                                                }
                                                                <p>Marca: {item.marcaFabricante}</p>
                                                                <p>Modelo: {item.modeloVersao}</p>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))
                                        }
                                    </div>
                                </TableCell>
                                
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}