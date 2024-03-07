import React from 'react'

import { Button, Card, CardBody, CardHeader, Chip, Divider, Link, Textarea } from '@nextui-org/react';
import { MdOutlineCheck, MdOutlineClose, MdArrowBack, MdKeyboardDoubleArrowDown } from "react-icons/md";

import { formatarParaReais } from '../../../../../components/Utils/Utils';
import '../../styles.css'

export default function CompraDetalhes( {compra, swap} ) {
  return (
    <Card className='w-full'>

        <CardHeader className='flex justify-between' >

            <Button isIconOnly size='md' color='primary' variant='solid' onClick={swap} className='rounded-lg'>
                <MdArrowBack />
            </Button>

            <span className='flex gap-2'>
                <Chip color="success" variant="dot">{compra.numeroCompra.replace(/^0+/, '')}/{compra.anoCompra}</Chip>
                <Chip color="success" variant="dot">{compra.modalidadeNome}</Chip>
                <Chip
                    startContent={compra.srp ? <MdOutlineCheck /> : <MdOutlineClose />}
                    variant="faded"
                    color={compra.srp ? 'success' : 'danger'}
                    >
                    SRP
                </Chip>
            </span>

            <span className='flex gap-2'>
                <Button
                    size='sm'
                    href={compra.linkSistemaOrigem}
                    as={Link}
                    showAnchorIcon
                    variant="solid"
                    isExternal='true'
                    color='warning'
                    className='rounded-lg'
                    >
                    cnetmobile
                </Button>
            </span>

        </CardHeader>

        <Divider />
        <CardBody>
            <div className='flex gap-3'>
                <Textarea
                    isReadOnly
                    label='Descrição detalhada do objeto da licitação:'
                    title='Objeto'
                    color='default'
                    labelPlacement="outside"
                    defaultValue={compra.objetoCompra}
                    maxRows={3}
                    className="w-5/6 text-small text-default-600"
                    >
                </Textarea>
                <div className='w-1/6'>
                    <div className='flex flex-col w-full h-full items-center justify-center gap-1'>

                        <Chip color='success' variant='flat'>
                            <div className='flex gap-1 text-lg'>
                                {formatarParaReais(compra.valorTotalEstimado)}
                            </div>
                        </Chip>

                        {(compra.valorTotalHomologado) &&
                            (
                                <div className='flex items-center justify-center gap-1'>
                                    <MdKeyboardDoubleArrowDown className='animated-arrow-container' />
                                    <Chip size='sm' variant='bordered' color='default'>
                                        {'% '+parseFloat((100*(1-(compra.valorTotalHomologado/compra.valorTotalEstimado))).toFixed(1))}
                                    </Chip>
                                </div>
                            )
                        
                        }
                            
                        {(compra.valorTotalHomologado) &&
                            (                          
                                <Chip color='success' variant='shadow'>
                                    <div className='flex gap-1 text-lg'>
                                        {formatarParaReais(compra.valorTotalHomologado)}
                                    </div>
                                </Chip>
                            )
                        }

                    </div>
                        
                </div>
            </div>
        </CardBody>
    </Card>
  )
}
