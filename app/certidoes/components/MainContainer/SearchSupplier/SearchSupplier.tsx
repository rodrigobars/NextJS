'use client'

import React, { useState, ChangeEvent } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import Image from 'next/image'
import { LuMinus, LuPlus, LuSearch } from "react-icons/lu";
import { TCU } from './fetcher';

// interface ResponseAPIBrasil {
//     razao_social: string;
//     nome_fantasia: string;
//     cnpj: string;
//     uf: string | null;
// }
  
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

interface SupplierSearchProps {
    // setDataAPIBrasil: React.Dispatch<React.SetStateAction<ResponseAPIBrasil[]>>;
    setDataTCU: React.Dispatch<React.SetStateAction<ResponseTCU[]>>;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setIsTCUFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchSupplier( {setStarted, setIsTCUFetching, setDataTCU}: SupplierSearchProps ) {
    
    const [amountCnpj, setAmountCnpj] = useState<number>(1);
    const [cnpjValues, setCnpjValues] = useState(Array.from({ length: amountCnpj }, () => ''));
    
    const handleTextFieldChange = (index: number, value: string) => {
        // Verificar se o valor já está no array
        if (!cnpjValues.includes(value)) {
          const newCnpjValues: string[] = [...cnpjValues];
          newCnpjValues[index] = value;
          setCnpjValues(newCnpjValues);
        } else {
          // Valor já está presente, faça algo, se necessário
          console.log(`O valor ${value} já está no array.`);
        }
    };

    const handleCnpjAmount = (isIncreaser: boolean) => {
        if (isIncreaser) {
          setAmountCnpj(amountCnpj + 1);
          // Se estiver incrementando, adicione uma string vazia ao final do array
          setCnpjValues((prevCnpjValues) => [...prevCnpjValues, '']);
        } else {
          setAmountCnpj(Math.max(amountCnpj - 1, 1));
          // Se estiver diminuindo, remova o último valor do array
          setCnpjValues((prevCnpjValues) => prevCnpjValues.slice(0, -1));
        }
    };
    
    const updateCnpjAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setAmountCnpj(Number(e.target.value))
    }

    const cnpjMask = (value: string) => {
        return value
          .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
          .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
    }

    const fetchAll = () => {
        setStarted(true);
        setIsTCUFetching(true);

        // Resetando
        // setDataAPIBrasil([])
        setDataTCU([])

        // APIBrasil(cnpjValues)
        //     .then((responseAPIBrasil) => {
        //         if (responseAPIBrasil !== undefined) {
        //             setDataAPIBrasil(responseAPIBrasil);
        //         } else {
        //             // Tratar o caso em que responseAPIBrasil é undefined, se necessário
        //             console.error("Erro: responseAPIBrasil é undefined");
        //         }
        //     })
        //         .catch((error) => {
        //         // Tratar erros relacionados à APIBrasil, se necessário
        //         console.error("Erro ao chamar a APIBrasil:", error);
        //     });
    
        TCU(cnpjValues)
            .then((responseTCU) => {
                if (responseTCU !== undefined) {
                    setIsTCUFetching(false);
                    setDataTCU(responseTCU);
                } else {
                    // Tratar o caso em que responseTCU é undefined, se necessário
                    console.error("Erro: responseTCU é undefined");
                }
                })
            .catch((error) => {
                // Tratar erros relacionados à TCU, se necessário
                console.error("Erro ao chamar a TCU:", error);
                setIsTCUFetching(false);
            });
    };
    
    return (
        <Card className="w-[300px]">
            <CardHeader className="flex gap-3">
                <Image
                    className="rounded-lg"
                    alt="tcu logo"
                    width={53}
                    height={1}
                    src="/tcu.jpg"
                />
                <div className="flex flex-col">
                    <p className="text-md">Certidões consolidadas</p>
                    <p className="text-small text-default-500">Indôneos, CNIA, CEIS e CNEP</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <div key={'1'} className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    {Array.from({ length: amountCnpj }).map((_, index) => (
                        <Input
                            key={index}
                            id={`outlined-basic-${index}`}
                            labelPlacement='outside'
                            variant="bordered"
                            value={cnpjMask(cnpjValues[index] === undefined ? '' : cnpjValues[index])}
                            onChange={(e) => handleTextFieldChange(index, e.target.value)}
                        />
                    ))}
                </div>
            </CardBody>
            <Divider/>
            <CardFooter className='justify-between'>

                <div className='flex'>
                    <Button
                        isIconOnly
                        color="primary"
                        aria-label="increment"
                        onClick={() => handleCnpjAmount(true)}
                        >
                        <LuPlus />
                    </Button> 
                    <Button
                        isIconOnly
                        color="default"
                        aria-label="decrement"
                        onClick={() => handleCnpjAmount(false)}
                        >
                        <LuMinus />
                    </Button>
                    <Input
                        className="w-1/3"
                        type="number"
                        variant='bordered'
                        labelPlacement='outside'
                        value={String(amountCnpj)}
                        onChange={updateCnpjAmount}
                        />
                </div>

                <Button
                    isIconOnly
                    color="success"
                    aria-label="search"
                    onClick={fetchAll}
                    >
                    <LuSearch />
                </Button> 
                
            </CardFooter>
        </Card>
    );
}
