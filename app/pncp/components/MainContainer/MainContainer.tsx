"use client"

import React from 'react';
import Search from './Search/Search';
import Compra from './Compra/Compra';

const MainContainer: React.FC = () => {

    const [editais, setEditais] = React.useState([])
    const [filtro, setFiltro] = React.useState()
    const [next, setNext] = React.useState(false)
    
    const [orgao_cnpj, setOrgao_cnpj] = React.useState()
    const [ano, setAno] = React.useState()
    const [numero_sequencial, setNumero_sequencial] = React.useState()

    const swap = (() => {setNext(!next)})

    const onTitleClick = async ( orgao_cnpj, ano, numero_sequencial ) => {
        setOrgao_cnpj(orgao_cnpj)
        setAno(ano)
        setNumero_sequencial(numero_sequencial)

        swap();
    
        // resetando
        setFiltro('');
    };

    return (
        <>  
            <main className='flex justify-center items-start shrink-0 w-lg bg-gradient-to-br from-blue-900 to-purple-300 p-8 min-h-lvh'>
                {

                    !(next)
                
                    ?

                    <Search
                        editais={editais}
                        filtro={filtro}
                        onTitleClick={onTitleClick}
                        setEditais={setEditais}
                        setFiltro={setFiltro}
                        />
                    
                    :

                    <Compra
                        orgao_cnpj={orgao_cnpj}
                        ano={ano}
                        numero_sequencial={numero_sequencial}
                        swap={swap}
                        />
                }
                
            </main>
        </>
    );
};

export default MainContainer;