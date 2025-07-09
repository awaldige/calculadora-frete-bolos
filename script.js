document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos HTML
    const distanciaKmInput = document.getElementById('distanciaKm');
    const pesoKgInput = document.getElementById('pesoKg');
    const calcularFreteBtn = document.getElementById('calcularFreteBtn'); // O botão de cálculo
    const valorFreteSpan = document.getElementById('valorFrete');
    const prazoEstimadoP = document.getElementById('prazoEstimado');

    // Constantes para o cálculo do frete (você pode ajustar estes valores conforme a necessidade da loja)
    const taxaBase = 10.00; // Valor fixo cobrado por qualquer entrega
    const custoPorKm = 2.00; // Custo adicional por quilômetro
    const custoPorKg = 3.00; // Custo adicional por quilograma do pedido

    /**
     * Função principal para calcular o valor do frete e exibir o resultado.
     * Inclui validação de entrada e simulação de prazo.
     */
    function calcularFrete() {
        // 1. Obter os valores inseridos pelo usuário e convertê-los para números decimais
        const distancia = parseFloat(distanciaKmInput.value);
        const peso = parseFloat(pesoKgInput.value);

        // 2. Realizar validação básica das entradas
        // Verifica se a distância é um número válido e não é negativa
        if (isNaN(distancia) || distancia < 0) {
            alert('Por favor, insira uma distância válida em quilômetros (somente números e não negativa).');
            // Limpa os resultados se a entrada for inválida
            valorFreteSpan.textContent = 'R$ 0,00';
            prazoEstimadoP.textContent = '';
            return; // Interrompe a execução da função
        }

        // Verifica se o peso é um número válido e é maior que zero
        if (isNaN(peso) || peso <= 0) {
            alert('Por favor, insira um peso válido em quilogramas (somente números e maior que zero).');
            // Limpa os resultados se a entrada for inválida
            valorFreteSpan.textContent = 'R$ 0,00';
            prazoEstimadoP.textContent = '';
            return; // Interrompe a execução da função
        }

        // 3. Aplicar a lógica de cálculo do frete
        // Soma a taxa base, o custo por distância e o custo por peso
        let totalFrete = taxaBase + (distancia * custoPorKm) + (peso * custoPorKg);

        // 4. Exibir o valor total do frete formatado em Reais (R$) com duas casas decimais
        valorFreteSpan.textContent = `R$ ${totalFrete.toFixed(2)}`;

        // 5. Simular um prazo de entrega com base na distância
        let prazoDias;
        if (distancia < 5) {
            prazoDias = '1 dia útil';
        } else if (distancia < 20) {
            prazoDias = '1-2 dias úteis';
        } else if (distancia < 50) {
            prazoDias = '2-4 dias úteis';
        } else {
            prazoDias = '4-7 dias úteis'; // Para distâncias maiores
        }
        prazoEstimadoP.textContent = `Entrega estimada em: ${prazoDias}`;
    }

    // Adiciona um "ouvinte de evento" ao botão de calcular frete.
    // A função 'calcularFrete' será executada SOMENTE quando o botão for clicado.
    calcularFreteBtn.addEventListener('click', calcularFrete);

    // OPCIONAL: Se você quisesse que o cálculo fosse automático ao digitar,
    // você adicionaria listeners aqui:
    // distanciaKmInput.addEventListener('input', calcularFrete);
    // pesoKgInput.addEventListener('input', calcularFrete);

    // OPCIONAL: Se você quisesse que um valor inicial fosse exibido ao carregar a página,
    // você chamaria a função aqui:
    // calcularFrete();
});