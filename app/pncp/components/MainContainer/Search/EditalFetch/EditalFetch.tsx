'use client'

import React, { useState } from 'react'

import {
    Card,
    Button,
    CardBody,
    Input,
    CardHeader
} from "@nextui-org/react";

import Image from 'next/image'
import DropboxModalidade from './DropboxModalidade/DropboxModalidade';
import DropboxStatus from './DropboxStatus/DropboxStatus';
import pesquisaEditaisEContratacoes from '../../fetcher'

// Enumeração ModalidadeContratacao
enum ModalidadeContratacao {
    "Leilão - Eletrônico" = 1,
    "Diálogo Competitivo" = 2,
    "Concurso" = 3,
    "Concorrência - Eletrônica" = 4,
    "Concorrência - Presencial" = 5,
    "Pregão - Eletrônico" = 6,
    "Pregão - Presencial" = 7,
    "Dispensa de Licitação" = 8,
    "Inexigibilidade" = 9,
    "Manifestação de Interesse" = 10,
    "Pré-qualificação" = 11,
    "Credenciamento" = 12,
    "Leilão - Presencial" = 13,
}

enum Status {
    "Recebendo Proposta" = "recebendo_proposta",
    "Propostas Encerradas" = "propostas_encerradas",
    "Encerradas" = "encerradas",
}

export default function EditalFetch( { setEditais } ) {
    const [uasg, setUasg] = useState('')
    const [modalidadeSelectedKeys, setModalidadeSelectedKeys] = React.useState(new Set(["Pregão - Eletrônico"]));
    const [statusSelectedKeys, setStatusSelectedKeys] = React.useState(new Set(["Recebendo Proposta"]));

    const handleClick = async () => {
        try {
            setEditais([])
            let modalidadeID = ModalidadeContratacao[Array.from(modalidadeSelectedKeys)[0]];
            let statusID = Status[Array.from(statusSelectedKeys)[0]];
    
            //console.log(modalidadeID, statusID, uasg)
    
            const resultado = await pesquisaEditaisEContratacoes({ Uasg: uasg, Status: statusID, ModalidadeContratacao: modalidadeID });
            if (resultado?.data.total > 0) {
                setEditais(resultado?.data.items)
            } else {
                console.log(`Nenhum resultado encontrado para "${uasg}"`)
            }
        } catch (error) {
            console.error("Erro ao executar handleClick:", error);
        }
    };

    return (
        <div>
            <Card>
                <CardHeader className="flex gap-3">
                    <Image
                        className="rounded-lg"
                        alt="pncp logo"
                        width={150}
                        height={5}
                        src="/pncp.png"
                    />
                    <div className="flex flex-col">
                    <p className="text-md">Contratações</p>
                    <p className="text-small text-default-500">Editais e avisos de contratação</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex items-center lg:gap-4'>
                            <Input
                                value={uasg}
                                size='sm'
                                variant="bordered"
                                label="Insira a UASG"
                                labelPlacement='inside'
                                onChange={(e) => setUasg(e.target.value)}
                                className='w-1/7'
                                />
                            <DropboxModalidade
                                modalidadeSelectedKeys={modalidadeSelectedKeys}
                                setModalidadeSelectedKeys={setModalidadeSelectedKeys}
                                />
                            <DropboxStatus
                                statusSelectedKeys={statusSelectedKeys}
                                setStatusSelectedKeys={setStatusSelectedKeys}
                                />
                        </div>
                        <Button
                            color='primary'
                            variant='ghost'
                            onClick={handleClick}
                            >
                            Buscar
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
