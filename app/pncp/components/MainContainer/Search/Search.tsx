'use client'

import React from 'react'
import EditalFetch from './EditalFetch/EditalFetch';
import EditalView from './EditalView/EditalView';
import { IoIosArrowDown } from "react-icons/io";
import { Input } from "@nextui-org/react";
import '../styles.css'

export default function Search( { editais, filtro, onTitleClick, setEditais, setFiltro } ) {
    return (
        <div className='bg-black bg-opacity-50 rounded-lg p-10 lg:w-[90%]'>
                            
            <div className='mb-5'>
                <EditalFetch
                    setEditais={setEditais}
                    />
            </div>

            {(editais.length > 0) && (
                <div>
                    <div className='flex flex-col justify-center items-center mb-5'>
                        <div className="animated-arrow-container">
                            <IoIosArrowDown size={'20px'} className="animated-arrow" />
                        </div>
                        <Input
                            value={filtro}
                            size='sm'
                            variant="flat"
                            color='default'
                            label="Filtre o número"
                            labelPlacement='inside'
                            onChange={(e) => setFiltro(e.target.value)}
                            className='w-1/7'
                            />
                    </div>
                </div>
            )}

            <div>
                <EditalView
                    editais={editais}
                    filtro={filtro}
                    onTitleClick={onTitleClick}
                    />
            </div>
            
        </div>
    )
}
