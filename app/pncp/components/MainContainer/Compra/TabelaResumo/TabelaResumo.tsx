'use client'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Textarea } from '@nextui-org/react';
import React from 'react'
import { formatarParaReais } from '../../../../../components/Utils/Utils';
import { formatarCnpj } from '../../../../../components/Utils/Utils'
    
const TabelaResumo: React.FC = ( { resultados, resumo, setResumo }: ResultadoCompraItem[] ) => {
    
    
    React.useEffect(() => {

        const agrupamento = resultados.reduce((agrupado, objeto) => {
            if (objeto) {
                const niFornecedor = objeto.niFornecedor
                const nome = objeto.nomeRazaoSocialFornecedor;
                const valorTotalHomologado = objeto.valorTotalHomologado;
                const numeroItem = objeto.numeroItem;
        
                if (agrupado[niFornecedor]) {
                    agrupado[niFornecedor].valorTotalHomologado += valorTotalHomologado;
                    agrupado[niFornecedor].itens.push(numeroItem);
                    agrupado[niFornecedor].nome = nome;
                } else {
                    agrupado[niFornecedor] = { nome, valorTotalHomologado, itens: [numeroItem] };
                }
            }
    
            return agrupado;
        }, [])

        setResumo(agrupamento)

    }, [resultados]);

    React.useEffect(() => {
        console.log('Resumo: ', resumo)
    }, [resumo])

    return(
        <div className='sm gap-5'>
            <Table
                color='secondary'
                aria-label="Example static collection table"
                bottomContent={
                    <div className="flex flex-col w-3/5 justify-center self-center gap-3 p-5">
                        <p className='font-bold'>Itens homologados:</p>
                        <Textarea
                            isReadOnly
                            color='default'
                            labelPlacement="outside"
                            defaultValue={
                                resultados
                                    .filter(item => item) 
                                    .map(item => item.numeroItem)
                                    .join(',')
                            }
                        />
                    </div>
                }>
                    
                <TableHeader>
                    <TableColumn style={{ width: '15%' }}>Cnpj/Cpf</TableColumn>
                    <TableColumn style={{ width: '20%' }}>Razão Social</TableColumn>
                    <TableColumn style={{ width: '50%' }}>Itens homologados</TableColumn>
                    <TableColumn style={{ width: '15%' }}>Valor Total</TableColumn>
                </TableHeader>

                <TableBody emptyContent={"No rows to display."}>

                    {Object.entries(resumo).map(([cnpj, objeto]) => {
                        return(
                            <TableRow key={cnpj}>

                                <TableCell
                                    className='animate-none text-center'
                                    >
                                    <p className='text-left'>{formatarCnpj(cnpj)}</p>
                                </TableCell>

                                <TableCell
                                    className='animate-none text-center'
                                    >
                                    <p className='text-left'>{objeto.nome}</p>
                                </TableCell>

                                <TableCell
                                    className='animate-none text-center'
                                    >
                                    <Textarea
                                        isReadOnly
                                        color='default'
                                        labelPlacement="outside"
                                        defaultValue={objeto.itens.join(',')}
                                        className="max-w-full text-small text-default-600"
                                    />
                                </TableCell>

                                <TableCell
                                    className='animate-none text-center'
                                    >
                                    <p className='text-left'>{formatarParaReais(objeto.valorTotalHomologado)}</p>
                                </TableCell>

                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default TabelaResumo;