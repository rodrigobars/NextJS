'use client'

import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Divider, Accordion, AccordionItem, Skeleton, Textarea } from "@nextui-org/react";
import './styles.css';
import { formatarCnpj } from '../../../../components/Utils/Utils'

// interface ResponseAPIBrasil {
//     razao_social: string;
//     cnpj: string;
//   }
  
interface SupplierViewProps {
    dataAPIBrasil: ResponseAPIBrasil[];
    dataTCU: ResponseTCU[];
    started: boolean;
    isAPIBrasilFetching: boolean;
    isTCUFetching: boolean;
  }

interface ResponseTCU {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    uf: string | null;
    certidoes: Certidao[];
    certidaoPDF: string;
    seCnpjEncontradoNaBaseTcu: boolean,
    dataHoraGeracaoInMillis: number
}

interface Certidao {
    emissor: string;
    tipo: string;
    dataHoraEmissao: string;
    descricao: string;
    situacao: string;
    observacao: string | null;
    linkConsultaManual: string;
    tempoGeracao: number;
}
  
export default function SupplierView({
        dataTCU,
        isTCUFetching
    }: SupplierViewProps) {

    // const [n, setN] = React.useState(dataAPIBrasil.length)

    // useEffect(() => {
    //     setN(dataAPIBrasil.length)
    // }, [dataAPIBrasil])

    const formataCertidao = (certidaoSituacao: string) => {
        console.log(certidaoSituacao)
        if (certidaoSituacao === 'NADA_CONSTA') {
            return 'default'
        } else if (certidaoSituacao === 'CONSTAM_REGISTROS') {
            return 'orange'
        } else {
            return 'red'
        }
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-[260px] gap-5`}>
            {dataTCU
                .filter((empresa: ResponseTCU) => empresa.cnpj.replace(/\D/g, ''))
                .map((filteredEmpresa, index) => {
                    return (
                        <div key={index}>
                            <Card  radius="lg">
                                <CardHeader>
                                    <div>
                                        <p className="text-small truncate text-green-400 animate-pulse">
                                            {filteredEmpresa.razaoSocial.length > 25 ? `${filteredEmpresa.razaoSocial.slice(0, 25)}...` : filteredEmpresa.razaoSocial}
                                        </p>
                                        <p className="text-small text-default-500">{formatarCnpj(filteredEmpresa.cnpj)}</p>
                                    </div>
                                </CardHeader> 

                                <Divider />

                                <CardBody>
                                    <div className='flex justify-center'>
                                        {
                                            isTCUFetching && (
                                                <div className="w-full flex flex-col gap-2">
                                                    <Skeleton className="h-3 w-full rounded-lg"/>
                                                    <Skeleton className="h-3 w-full rounded-lg"/>
                                                    <Skeleton className="h-3 w-full rounded-lg"/>
                                                    <Skeleton className="h-3 w-full rounded-lg"/>
                                                </div>
                                            )
                                        }
                                        {
                                            <Accordion isCompact key={index}>
                                                {filteredEmpresa.certidoes.map((certidao: Certidao, certidaoIndex: number) => {
                                                    return(
                                                        <AccordionItem 
                                                            key={certidaoIndex}
                                                            title={(
                                                                <span
                                                                    style={{
                                                                        color: formataCertidao(certidao.situacao),
                                                                        fontSize: '12px'
                                                                    }}
                                                                >
                                                                    {`${certidao.tipo}: ${(certidao.situacao).replace(/_/g, ' ')}`}
                                                                </span>
                                                            )}
                                                            >
                                                            <div>
                                                                {certidao.observacao && (
                                                                    <Textarea
                                                                        isReadOnly
                                                                        color='warning'
                                                                        labelPlacement="outside"
                                                                        defaultValue={certidao.observacao.replace(/<br\s*\/?>/g, '\n')}
                                                                        className="max-w-xs"
                                                                        />
                                                                )}
                                                            </div>
                                                        </AccordionItem>                
                                                    )}
                                                )}
                                            </Accordion>
                                        }
                                        
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )})
            }
        </div>
    )
}