import { Textarea, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip } from '@nextui-org/react';
import React from 'react'
import { formatarParaReais } from '../../../../../components/Utils/Utils';

interface CompraItem {
    codigoRegistroImobiliario: null;
    criterioJulgamentoId: number;
    criterioJulgamentoNome: string;
    dataAtualizacao: string;
    dataInclusao: string;
    descricao: string;
    imagem: number;
    incentivoProdutivoBasico: boolean;
    itemCategoriaId: number;
    itemCategoriaNome: string;
    materialOuServico: string;
    materialOuServicoNome: string;
    numeroItem: number;
    orcamentoSigiloso: boolean;
    patrimonio: null;
    quantidade: number;
    situacaoCompraItem: number;
    situacaoCompraItemNome: string;
    temResultado: boolean;
    tipoBeneficio: number;
    tipoBeneficioNome: string;
    unidadeMedida: string;
    valorTotal: number;
    valorUnitarioEstimado: number;
}

const situacaoItem = {
    'Em andamento' : 'success',
    'Homologado' : 'success',
    'Deserto' : 'warning',
    'Fracassado' : 'danger',
    'Anulado/Revogado/Cancelado' : 'primary'
  }
  
const TabelaItens: React.FC<EditalViewProps> = ({ itens }: CompraItem[]) => {

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(itens.length / rowsPerPage);
  
    const itensPage = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return itens.slice(start, end);
    }, [page]);

    return (
      <div className='sm gap-5'>
        <Table
            color='secondary'
            selectionMode="single"
            aria-label="Example static collection table"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
                wrapper: "min-h-150"
            }}>
            <TableHeader>
                <TableColumn style={{ width: '10%' }}>Item</TableColumn>
                <TableColumn style={{ width: '30%' }}>Descrição</TableColumn>
                <TableColumn style={{ width: '10%' }}>Unidade de medida</TableColumn>
                <TableColumn style={{ width: '10%' }}>Quantidade</TableColumn>
                <TableColumn style={{ width: '10%' }}>Valor unitário(Estimado)</TableColumn>
                <TableColumn style={{ width: '10%' }}>Valor total(Estimado)</TableColumn>
                <TableColumn style={{ width: '15%' }}>Situação</TableColumn>
                <TableColumn style={{ width: '5%' }}>Crit. Julg</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
                {itensPage.map((item) => (
                    <TableRow key={item.numeroItem}>

                        <TableCell
                            className='animate-none text-center'
                            >
                            <p className='font-bold'>{item.numeroItem}</p>
                        </TableCell>

                        <TableCell>
                            <Textarea
                                isReadOnly
                                color='default'
                                labelPlacement="outside"
                                defaultValue={item.descricao}
                                maxRows={2}
                                className="max-w-full text-small text-default-600"
                            />
                        </TableCell>
                        
                        <TableCell
                            style={{
                                textAlign: 'center'
                            }}
                            >
                            {item.unidadeMedida}
                        </TableCell>

                        <TableCell
                            style={{
                                textAlign: 'center'
                            }}
                            >
                            {item.quantidade}
                        </TableCell>

                        <TableCell
                            style={{
                                textAlign: 'center'
                            }}
                            >
                            {formatarParaReais(item.valorUnitarioEstimado)}
                        </TableCell>
                        
                        <TableCell
                            style={{
                                textAlign: 'center'
                            }}
                            >
                            {formatarParaReais(item.valorTotal)}
                        </TableCell>

                        <TableCell
                            className='text-small text-center'
                            >
                            <Chip
                                color={situacaoItem[item.situacaoCompraItemNome]}
                                variant='flat'>
                                {item.situacaoCompraItemNome}
                            </Chip>
                        </TableCell>

                        <TableCell
                            className='text-small text-center'
                            >
                            {item.criterioJulgamentoNome}
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
            </Table>
      </div>
    );
  };
  
  export default TabelaItens;