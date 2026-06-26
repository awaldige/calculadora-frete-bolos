// Escuta o evento de envio do formulário
document.getElementById("form-pedido").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o reload da página

    // Capturando e limpando as entradas
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();
    
    const peso = Number(document.getElementById("peso").value);
    const distancia = Number(document.getElementById("distancia").value);

    // Validações básicas de segurança
    if (!nome || !telefone || !endereco || !bairro) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    if (peso <= 0 || distancia < 0) {
        alert("Por favor, insira valores válidos para peso e distância.");
        return;
    }

    // Capturando os dados do Select de Bolos
    const selectBolo = document.getElementById("bolo");
    const bolo = selectBolo.options[selectBolo.selectedIndex].value;
    const precoBaseBolo = Number(selectBolo.options[selectBolo.selectedIndex].dataset.preco);

    // Regra de Negócio: Preço base multiplicado pelo peso do bolo
    const precoTotalBolo = precoBaseBolo * peso;

    // Regra de Negócio: Cálculo do Frete
    const taxaBase = 8;
    const valorPorKm = 1.5;
    const adicionalPeso = 2;

    let frete = taxaBase + (distancia * valorPorKm);
    if (peso > 2) {
        frete += (peso - 2) * adicionalPeso;
    }

    // Definição do Prazo de Entrega
    let prazo = "2 horas";
    if (distancia <= 5) {
        prazo = "30 minutos";
    } else if (distancia <= 15) {
        prazo = "1 hora";
    }

    // Cálculo do Montante Total
    const total = precoTotalBolo + frete;

    // Formatador de Moeda (R$)
    const moeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    const dataPedido = new Date().toLocaleString("pt-BR");

    // Inserindo o resultado na tela e exibindo o card
    const divResultado = document.getElementById("resultado");
    divResultado.innerHTML = `
        <div class="resultado-card">
            <h2>📋 Resumo do Pedido</h2>
            <p><strong>Cliente:</strong> ${nome}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Endereço:</strong> ${endereco}, ${bairro}</p>
            <hr>
            <p><strong>Bolo:</strong> ${bolo} (${peso} kg)</p>
            <p><strong>Distância:</strong> ${distancia} km</p>
            <p><strong>Valor do Bolo:</strong> ${moeda(precoTotalBolo)}</p>
            <p><strong>Frete:</strong> ${moeda(frete)}</p>
            <p><strong>Prazo Estimado:</strong> ${prazo}</p>
            <hr>
            <p style="font-size: 22px; color: #2ecc71; margin-top: 10px;">
                <strong>Total:</strong> ${moeda(total)}
            </p>
        </div>
    `;
    divResultado.style.display = "block";

    // Configuração e disparo da API do WhatsApp
    const numeroWhatsapp = "5511985878638";
    const mensagem = `🎂 *NOVO PEDIDO*

👤 *Cliente:* ${nome}
📞 *Telefone:* ${telefone}
🏠 *Endereço:* ${endereco}
📍 *Bairro:* ${bairro}

🎂 *Bolo:* ${bolo}
⚖️ *Peso:* ${peso} kg
📍 *Distância:* ${distancia} km

💵 *Bolo:* ${moeda(precoTotalBolo)}
🚚 *Frete:* ${moeda(frete)}
💰 *Total:* ${moeda(total)}

⏱️ *Prazo:* ${prazo}
📅 *Data:* ${dataPedido}
📝 *Obs:* ${observacoes || "Nenhuma"}`;

    const whatsappBtn = document.getElementById("whatsappBtn");
    whatsappBtn.href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    whatsappBtn.style.display = "block";
});
