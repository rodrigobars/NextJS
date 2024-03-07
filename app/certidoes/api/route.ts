export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const cnpj = searchParams.get('cnpj')
    
    let tentativas = 0;
    const maxTentativas = 5; // Defina o número máximo de tentativas desejado

    while (tentativas < maxTentativas) {
        try {
            const res = await fetch(`/certidoes/${cnpj}?seEmitirPDF=true`)
            
            if (res.status === 500) {
                // Se o status for 500, aumente o número de tentativas
                tentativas++;
                console.warn(`Tentativa ${tentativas} - Erro 500. Tentando novamente...`);
            } else if (res.status == 502){
                tentativas++;
                console.warn(`Tentativa ${tentativas} - Erro 502. Tentando novamente...`);
            } else {
                const data = await res.json();
                console.log(data)
                return data
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            break; // Sai do loop se houver um erro que não seja relacionado ao status 500
        }
    }

    if (tentativas === maxTentativas) {
        console.error(`Número máximo de tentativas (${maxTentativas}) atingido. A requisição não pôde ser concluída.`);
    }
}