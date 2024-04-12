export function formatarParaReais(valorFloat: number) {
    // Arredonda para duas casas decimais e converte para string
    const valorFormatado = valorFloat.toFixed(2).toString();
  
    // Separa a parte inteira e a parte decimal
    const [parteInteira, parteDecimal] = valorFormatado.split('.');
  
    // Adiciona a formatação de Reais (R$) com a vírgula
    const valorEmReais = `R$ ${parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${parteDecimal}`;
  
    return valorEmReais;
}

export function formatarCnpj(cnpj: string) {
    // Remove qualquer caractere não numérico
    const cnpjLimpo = cnpj.replace(/\D/g, '');

    // Aplica a máscara padrão de CNPJ
    return cnpjLimpo.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
    );
}