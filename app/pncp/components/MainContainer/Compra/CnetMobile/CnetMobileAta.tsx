'use client'

import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, CardHeader, CardBody, Divider, Chip, CardFooter, Spacer, Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import { formatarCnpj } from '@/app/components/Utils/Utils';
import { formatarParaReais } from '../../../../../components/Utils/Utils';

export default function CnetMobileAta( { dados } ){

    function generateID(): string {
        let id = Math.floor(Math.random() * 1000000).toString(); // Generate 6-digit number
        while (id.length < 6) {
          id = "0" + id; // Pad with zeros if necessary
        }
        return id;
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
                    <TableColumn>Item</TableColumn>
                    <TableColumn>Descrição</TableColumn>
                    <TableColumn>Unidade de medida</TableColumn>
                    <TableColumn>Qtd</TableColumn>
                    <TableColumn>Marca</TableColumn>
                    <TableColumn>Modelo</TableColumn>
                    <TableColumn>Valor unitário</TableColumn>
                    <TableColumn>Valor total</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                    {   
                        //dados.propostas
                        dados[0]
                            .sort((a, b) => a.numero - b.numero)
                            .map((proposta, propostaIndex) =>  (
                                proposta.tipo != 'Grupo' ? 
                                    
                                    <TableRow key={propostaIndex}>

                                        <TableCell>{proposta.identificador}</TableCell>

                                        <TableCell>teste</TableCell>

                                        <TableCell>teste</TableCell>

                                        <TableCell>teste</TableCell>

                                        <TableCell>teste</TableCell>

                                        <TableCell>teste</TableCell>

                                        <TableCell>teste</TableCell>

                                        <TableCell>teste</TableCell>
                                        
                                    </TableRow>

                                    :

                                    proposta.subItens.map((subItem) => (
                                        <TableRow key={generateID()}>

                                            <TableCell>{subItem.numero}</TableCell> 
                                            <TableCell>teste</TableCell>
                                            <TableCell>teste</TableCell>
                                            <TableCell>teste</TableCell>
                                            <TableCell>teste</TableCell>
                                            <TableCell>teste</TableCell>
                                            <TableCell>teste</TableCell>
                                            <TableCell>teste</TableCell>
                                        </TableRow>
                                    ))
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}