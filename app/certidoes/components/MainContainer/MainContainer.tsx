"use client"

import React, { useState } from 'react';
import SearchSupplier from './SearchSupplier/SearchSupplier';
import SupplierView from './SupplierView/SupplierView';
import { LuDownload } from "react-icons/lu";
import ziperPdf from './SearchSupplier/ziperPdf';
import { Button } from '@nextui-org/react';

interface ResponseAPIBrasil {
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    uf: string | null;
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

const MainContainer: React.FC = () => {
    const [dataAPIBrasil, setDataAPIBrasil] = useState<ResponseAPIBrasil[]>([]);
    const [dataTCU, setDataTCU] = useState<ResponseTCU[]>([]);
    const [isTCUFetching, setIsTCUFetching] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);
    
    const handleDownloadZip = () => {
        ziperPdf(dataTCU)
            .then((pdf_zip) => {
                return pdf_zip.generateAsync({ type: 'blob' }); // Adicione o retorno aqui
            })
            .then((content) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = 'certidoes_tcu.zip';
                link.click();
            });
    };

    return (
        <>  
            <main className='flex justify-center items-center shrink-0 w-lg bg-gradient-to-br from-blue-900 to-purple-300 p-8 min-h-lvh'>
                <div className='bg-black bg-opacity-50 rounded-lg p-10'>
                    <div className='flex flex-col sm:flex-row gap-5'>
                        <div>
                            <SearchSupplier 
                                setDataAPIBrasil={setDataAPIBrasil}
                                setDataTCU={setDataTCU}
                                setIsTCUFetching={setIsTCUFetching}
                                setStarted = {setStarted}
                                />
                        </div>

                        {started && 
                            <SupplierView 
                                dataAPIBrasil={dataAPIBrasil}
                                dataTCU={dataTCU}
                                isTCUFetching={isTCUFetching}
                            />}

                    </div>

                    <div className='flex justify-center mt-5'>

                        {(dataTCU.length > 0) && !isTCUFetching && (
                            <Button
                                isIconOnly
                                color="danger"
                                aria-label="download"
                                onClick={handleDownloadZip}>
                                <LuDownload />
                            </Button>
                        )}

                    </div>

                </div>
            </main>
        </>
    );
};

export default MainContainer;