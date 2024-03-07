'use client'

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function DropboxModalidade( {modalidadeSelectedKeys, setModalidadeSelectedKeys} ) {

    const selectedValue = React.useMemo(
        () => Array.from(modalidadeSelectedKeys).join(", ").replaceAll("_", " "),
        [modalidadeSelectedKeys]
    );

    return (
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                    <Button 
                        variant="shadow"
                        color="success"
                        >
                        {selectedValue}
                    </Button>
                
            </DropdownTrigger>
            
            <DropdownMenu 
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={modalidadeSelectedKeys}
                onSelectionChange={setModalidadeSelectedKeys}
                >
                <DropdownItem key="Pregão - Eletrônico">Pregão - Eletrônico</DropdownItem>
                <DropdownItem key="Pregão - Presencial">Pregão - Presencial</DropdownItem>
                <DropdownItem key="Dispensa de Licitação">Dispensa de Licitação</DropdownItem>
                <DropdownItem key="Concorrência - Eletrônica">Concorrência - Eletrônica</DropdownItem>
                <DropdownItem key="Concorrência - Presencial">Concorrência - Presencial</DropdownItem>
                <DropdownItem key="Inexigibilidade">Inexigibilidade</DropdownItem>
                <DropdownItem key="Leilão - Eletrônico">Leilão - Eletrônico</DropdownItem>
                <DropdownItem key="Leilão - Presencial">Leilão - Presencial</DropdownItem>
                <DropdownItem key="Concurso">Concurso</DropdownItem>
                <DropdownItem key="Diálogo Competitivo">Diálogo Competitivo</DropdownItem>
                <DropdownItem key="Credenciamento">Credenciamento</DropdownItem>
                <DropdownItem key="Pré-qualificação">Pré-qualificação</DropdownItem>
                <DropdownItem key="Manifestação de Interesse">Manifestação de Interesse</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
