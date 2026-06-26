// 1. Função para aplicar a máscara de telefone dinamicamente
function aplicarMascaraTelefone(valor) {
    if (!valor) return "";
    valor = valor.replace(/\D/g, ""); 
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2"); 
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2"); 
    return valor;
}

// 2. Função principal de processamento reativo
function atualizarOrcamento() {
    // Capturando e limpando as entradas
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();
    
    const peso = Number(document.getElementById("peso").value);
    const distancia = Number(document.getElementById("distancia").value);

    const divResultado = document.getElementById("resultado");
    const whatsappBtn = document.getElementById("whatsappBtn");

    // Validação reativa: Só exibe o card se os dados necessários forem válidos
    if (!nome || !telefone || !endereco || !bairro || peso <= 0 || distancia < 0) {
        divResultado.style.display = "none";
        whatsappBtn.style.display = "none";
        return; 
    }

    // Capturando os dados do Select de Bolos
    const selectBolo = document.getElementById("bolo");
    const bolo = selectBolo.options[selectBolo.selectedIndex].value;
    const precoBaseBolo = Number(selectBolo.options[selectBolo.selectedIndex].dataset.preco);

    // Regra de Negócio: Preço proporcional ao peso do bolo
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

    // Cálculo do Total Geral
    const total = precoTotalBolo + frete;

    // Formatador de Moeda (BRL)
    const moeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    const dataPedido = new Date().toLocaleString("pt-BR");

    // Renderizando o resumo na interface
    divResultado.innerHTML = `
        <div class="resultado-card">
            <h2>📋 Resumo do Pedido</h2>
            <p><strong>Cliente:</strong> <span>${nome}</span></p>
            <p><strong>Telefone:</strong> <span>${telefone}</span></p>
            <p><strong>Endereço:</strong> <span>${endereco}, ${bairro}</span></p>
            <hr>
            <p><strong>Bolo:</strong> <span>${bolo} (${peso} kg)</span></p>
            <p><strong>Distância:</strong> <span>${distancia} km</span></p>
            <p><strong>Valor do Bolo:</strong> <span>${moeda(precoTotalBolo)}</span></p>
            <p><strong>Frete:</strong> <span>${moeda(frete)}</span></p>
            <p><strong>Prazo Estimado:</strong> <span>${prazo}</span></p>
            <hr>
            <p style="font-size: 22px; color: #2ecc71; margin-top: 10px;">
                <strong>Total:</strong> <strong>${moeda(total)}</strong>
            </p>
        </div>
    `;
    divResultado.style.display = "block";

    // Configurando a mensagem estruturada para a API do WhatsApp
    const numeroWhatsapp = "5511985878638";
    const message = `🎂 *NOVO PEDIDO*

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

    whatsappBtn.href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(message)}`;
    whatsappBtn.style.display = "block";
}

// --- MAPEAMENTO DOS LISTENERS (OUVINTES) ---

// Formata o campo de telefone dinamicamente enquanto digita
document.getElementById("telefone").addEventListener("input", function (e) {
    e.target.value = aplicarMascaraTelefone(e.target.value);
});

// Atualiza o orçamento automaticamente a cada alteração em qualquer campo
const camposMonitorados = ["nome", "telefone", "endereco", "bairro", "observacoes", "bolo", "peso", "distancia"];
camposMonitorados.forEach(id => {
    document.getElementById(id).addEventListener("input", atualizarOrcamento);
});

// Evento disparado pelo clique do botão ou pressionando 'Enter'
document.getElementById("form-pedido").addEventListener("submit", function (event) {
    event.preventDefault();

    // Validação de barreira final com feedback via alerts caso falte preenchimento compulsório
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const distancia = Number(document.getElementById("distancia").value);

    if (!nome || !telefone || !endereco || !bairro) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    if (peso <= 0 || distancia < 0) {
        alert("Por favor, insira valores válidos para peso e distância.");
        return;
    }

    atualizarOrcamento();
});
