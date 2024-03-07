'use client'

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function DropboxStatus( {statusSelectedKeys, setStatusSelectedKeys} ) {

    const selectedValue = React.useMemo(
        () => Array.from(statusSelectedKeys).join(", ").replaceAll("_", " "),
        [statusSelectedKeys]
    );

    return (
        <Dropdown backdrop="blur" size="lg">
            <DropdownTrigger>
                <Button 
                    variant="shadow"
                    color="warning"
                    >
                    {selectedValue}
                </Button>
            </DropdownTrigger>
            <DropdownMenu 
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={statusSelectedKeys}
                onSelectionChange={setStatusSelectedKeys}
                >
                <DropdownItem key="Recebendo Proposta">Recebendo Proposta</DropdownItem>
                <DropdownItem key="Propostas Encerradas">Propostas Encerradas</DropdownItem>
                <DropdownItem key="Encerradas">Encerradas</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
