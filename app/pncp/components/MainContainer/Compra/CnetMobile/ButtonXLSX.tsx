'use client'

import * as XLSX from "xlsx";
import { formatarCnpj } from '@/app/components/Utils/Utils';
import { formatarParaReais } from '../../../../../components/Utils/Utils';

type Row = {
    grupo: number | null,
    item: number,
    descricao: string,
    fornecimento: string,
    quantidade: number,
    valorEstimadoUnd: number,
    empresa1: string,
    empresa2: string,
    empresa3: string,
    empresa4: string,
    empresa5: string
}

const templateEmpresa = (item, index) => {
    try{
        const participante = item.propostasItem[index].participante;
        const marca = item.propostasItem[index].marcaFabricante;
        const modelo = item.propostasItem[index].modeloVersao;
        const valorUnitario = formatarParaReais(item.propostasItem[index].valores.valorPropostaInicialOuLances.valorCalculado.valorUnitario);
        const valorTotal = formatarParaReais(item.propostasItem[index].valores.valorPropostaInicialOuLances.valorCalculado.valorTotal);
    
        return (`Razão Social: ${participante.nome}\nCNPJ: ${formatarCnpj(participante.identificacao)}\nValorUnd: ${valorUnitario}\nValorTotal: ${valorTotal}\nMarca: ${marca}\nModelo: ${modelo}`);
    }catch{
        return ('')
    }
};

function compareByNumero(
        a: {
            item: number, 
            descricao: string,
            fornecimento: string,
            quantidade: number,
            valorEstimadoUnd: number
        },
        b: {
            item: number, 
            descricao: string,
            fornecimento: string,
            quantidade: number,
            valorEstimadoUnd: number
            }
        ) {
    if (a.item < b.item) {
      return -1;
    } else if (a.item > b.item) {
      return 1;
    } else {
      return 0;
    }
}

export default function ButtonXLSX( {dados, unidadeMedida} ) {

    const onGetExporProduct = async (title?: string, worksheetname?: string) => { 
        try {
            let dataToExport: Row[] = []
            
            dados.propostas.map((item) => {
                if (item.tipo != 'Grupo') {
                    
                    let row: Row = {
                        'grupo': null,
                        'item': item.numero,
                        'descricao': item.descricao,
                        'fornecimento': unidadeMedida[item.numero],
                        'quantidade': item.quantidadeSolicitada,
                        'valorEstimadoUnd': item.valorEstimadoUnitario,
                        'empresa1': templateEmpresa(item, 0),
                        'empresa2': templateEmpresa(item, 1),
                        'empresa3': templateEmpresa(item, 2),
                        'empresa4': templateEmpresa(item, 3),
                        'empresa5': templateEmpresa(item, 4)
                    }
                    dataToExport = [...dataToExport, row]

                } else {
                    item.subItens.map((subItem) => {
                        let row: Row = {
                            'grupo': item.identificador,
                            'item': subItem.numero,
                            'descricao': subItem.descricao,
                            'fornecimento': unidadeMedida[subItem.numero],
                            'quantidade': subItem.quantidadeSolicitada,
                            'valorEstimadoUnd': subItem.valorEstimadoUnitario,
                            'empresa1': templateEmpresa(subItem, 0),
                            'empresa2': templateEmpresa(subItem, 1),
                            'empresa3': templateEmpresa(subItem, 2),
                            'empresa4': templateEmpresa(subItem, 3),
                            'empresa5': templateEmpresa(subItem, 4)
                        }
                        dataToExport = [...dataToExport, row]
                    })
                }
            });

            dataToExport = dataToExport.sort(compareByNumero)
            
            console.log(dataToExport)

            // Create Excel workbook and worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils?.json_to_sheet(dataToExport);

            // Set column widths
            worksheet['!cols'] = [
                { width: 5 },
                { width: 5 }, // Set width for column A (numero) to 5
                { width: 20 }, // Set width for column B (descricao) to 50
                { width: 20 },
                { width: 5 },
                { width: 10 },
            ];

            XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
            // Save the workbook as an Excel file
            XLSX.writeFile(workbook, `${title}.xlsx`);
            console.log(`Exported data to ${title}.xlsx`);
        } catch (error: any) {
            console.log("#==================Export Error", error.message);
        }
    }

    return(
        <button
            onClick={() => onGetExporProduct("Product", "ProductExport")}
            className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600"
            >
            Download
        </button>
    )
}