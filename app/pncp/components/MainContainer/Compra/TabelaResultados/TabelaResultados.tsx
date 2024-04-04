'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import React from 'react'
import { formatarParaReais } from '../../../../../components/Utils/Utils';
import { formatarCnpj } from '../../../../../components/Utils/Utils'
  
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

function limitarString(str, comprimentoMaximo) {
    if (str.length > comprimentoMaximo) {
        return str.substring(0, comprimentoMaximo - 3) + '...';
    }
    return str;
}
    
const TabelaResultados: React.FC = ( { resultados }: ResultadoCompraItem[] ) => {

    // UseEffect para observar as mudanças nas props e atualizar o estado interno
    React.useEffect(() => {
        console.log(resultados)
    }, [resultados]);

    return (
        <div className='sm gap-5'>
            <Table
                color='secondary'
                selectionMode="single"
                aria-label="Example static collection table"
                classNames={{
                    wrapper: "min-h-[150px]",
                }}>
                <TableHeader>
                    <TableColumn style={{ width: '3%' }}>Item</TableColumn>
                    <TableColumn style={{ width: '15%' }}>Cnpj/Cpf</TableColumn>
                    <TableColumn style={{ width: '29%' }}>Razão Social</TableColumn>
                    <TableColumn style={{ width: '3%' }}>Quantidade</TableColumn>
                    <TableColumn style={{ width: '12%' }}>Valor unitário</TableColumn>
                    <TableColumn style={{ width: '12%' }}>Valor total</TableColumn>
                    <TableColumn style={{ width: '3%' }}>Tipo</TableColumn>
                    <TableColumn style={{ width: '3%' }}>Porte</TableColumn>
                    <TableColumn style={{ width: '5%' }}>País</TableColumn>
                    <TableColumn style={{ width: '5%' }}>Situação</TableColumn>
                    <TableColumn style={{ width: '5%' }}>Data Resultado</TableColumn>
                    <TableColumn style={{ width: '5%' }}>Data Atualização</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {resultados.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className='animate-none text-center'>
                                <p className='font-bold'>{item.numeroItem}</p>
                            </TableCell>
                            <TableCell className='text-left'>
                                {formatarCnpj(item.niFornecedor)}
                            </TableCell>
                            <TableCell>
                                <p className='text-left'>{limitarString(item.nomeRazaoSocialFornecedor, 40)}</p>
                            </TableCell>
                            <TableCell className='text-left'>
                                {item.quantidadeHomologada}
                            </TableCell>
                            <TableCell className='text-left'>
                                {formatarParaReais(item.valorUnitarioHomologado)}
                            </TableCell>
                            <TableCell className='text-left'>
                                {formatarParaReais(item.valorTotalHomologado)}
                            </TableCell>
                            <TableCell className='text-left'>
                                {item.tipoPessoa}
                            </TableCell>
                            <TableCell className='text-left'>
                                {item.porteFornecedorNome}
                            </TableCell>
                            <TableCell className='text-left'>
                                {item.codigoPais}
                            </TableCell>
                            <TableCell className='text-left text-small'>
                                {item.situacaoCompraItemResultadoNome}
                            </TableCell>
                            <TableCell className='text-left text-small'>
                                {item.dataResultado}
                            </TableCell>
                            <TableCell className='text-left text-small'>
                                {item.dataAtualizacao}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TabelaResultados;