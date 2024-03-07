import { Textarea, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip } from '@nextui-org/react';
import React from 'react'

interface Edital {
    id: string;
    index: string;
    doc_type: string;
    title: string;
    description: string;
    item_url: string;
    document_type: string;
    createdAt: string;
    numero: number | null;
    ano: string;
    numero_sequencial: string;
    numero_sequencial_compra_ata: string | null;
    numero_controle_pncp: string;
    orgao_id: string;
    orgao_cnpj: string;
    orgao_nome: string;
    orgao_subrogado_id: string | null;
    orgao_subrogado_nome: string | null;
    unidade_id: string;
    unidade_codigo: string;
    unidade_nome: string;
    esfera_id: string;
    esfera_nome: string;
    poder_id: string;
    poder_nome: string;
    municipio_id: string;
    municipio_nome: string;
    uf: string;
    modalidade_licitacao_id: string;
    modalidade_licitacao_nome: string;
    situacao_id: string;
    situacao_nome: string;
    data_publicacao_pncp: string;
    data_atualizacao_pncp: string;
    data_assinatura: string | null;
    data_inicio_vigencia: string;
    data_fim_vigencia: string;
    cancelado: boolean;
    valor_global: number | null;
    tem_resultado: boolean;
    tipo_id: string;
    tipo_nome: string;
    tipo_contrato_id: string | null;
    tipo_contrato_nome: string | null;
}

interface EditalViewProps {
    editais: Edital[];
    onTitleClick: (id: string) => void; // Função para lidar com o clique no título
  }

function extrairNumeros(input: string): string {
    // Encontrar todos os grupos de números na string
    const numerosEncontrados = input.match(/\d+/g);
  
    // Se houver números encontrados, retornar a string formatada
    if (numerosEncontrados) {
        const numerosConcatenados = numerosEncontrados.join('/');
        return numerosConcatenados.replace(/^0+/, ''); // Remover zeros à esquerda
    }
  
    // Se nenhum número for encontrado, retornar uma string vazia
    return '';
}
  
const EditalView: React.FC<EditalViewProps> = ({ editais, filtro, onTitleClick }) => {

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;
  
    const filteredEditais = React.useMemo(() => {
        if (filtro) {
          return editais.filter((item) =>
            item.title.toLowerCase().includes(filtro.toLowerCase())
          );
        } else {
          return editais;
        }
    }, [editais, filtro]);

    const pages = Math.ceil(editais.length / rowsPerPage);
  
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return filteredEditais.slice(start, end);
    }, [page, filteredEditais]);

    return (
      <div className='sm gap-5'>
        <Table
            color='secondary'
            selectionMode="single"
            aria-label="Example table with client side pagination"
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
              wrapper: "min-h-[222px]",
            }}>
            <TableHeader>
                <TableColumn style={{ width: '10%' }}>Número</TableColumn>
                <TableColumn style={{ width: '10%' }}>Tipo</TableColumn>
                <TableColumn style={{ width: '70%' }}>Descrição do Objeto</TableColumn>
                <TableColumn style={{ width: '10%' }}>Situação</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
                {items.map((item) => (
                    <TableRow key={item.id}>

                        <TableCell
                            style={{
                                cursor: 'pointer',
                                textAlign: 'right'
                            }}
                            onClick={() => onTitleClick( item.orgao_cnpj, item.ano, item.numero_sequencial )}
                            className='animate-none'
                            >
                            <Chip variant='flat' color='success'>
                                {extrairNumeros(item.title)}
                            </Chip>
                        </TableCell>

                        <TableCell
                            style={{
                                textAlign: 'center'
                            }}
                            >
                            {item.tipo_nome}
                        </TableCell>

                        <TableCell>
                            <Textarea
                                isReadOnly
                                color='default'
                                labelPlacement="outside"
                                defaultValue={item.description}
                                maxRows={2}
                                className="max-w-full text-small text-default-600"
                            />
                        </TableCell>

                        <TableCell
                            style={{
                                textAlign: 'center'
                            }}
                            >
                            {item.situacao_nome}
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
            </Table>
      </div>
    );
  };
  
  export default EditalView;