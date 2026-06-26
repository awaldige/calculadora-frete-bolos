// Array global controlado pelo módulo para armazenar os bolos escolhidos
let carrinho = [];

// 1. Máscara de Telefone
function aplicarMascaraTelefone(valor) {
    if (!valor) return "";
    valor = valor.replace(/\D/g, ""); 
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2"); 
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2"); 
    return valor;
}

// Formatador de Moeda (BRL)
const moeda = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// 2. Função para renderizar a lista visual do carrinho na tela
function renderizarCarrinho() {
    const containerCarrinho = document.getElementById("lista-bolos-escolhidos");
    const listaUI = document.getElementById("itens-carrinho");
    
    listaUI.innerHTML = "";

    if (carrinho.length === 0) {
        containerCarrinho.style.display = "none";
        return;
    }

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>🎂 <strong>${item.bolo}</strong> (${item.peso}kg) - ${moeda(item.precoTotalBolo)}</span>
            <button type="button" class="btn-remover" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        listaUI.appendChild(li);
    });

    containerCarrinho.style.display = "block";

    // Adiciona evento de clique para os botões de lixeira criados dinamicamente
    document.querySelectorAll(".btn-remover").forEach(botao => {
        botao.addEventListener("click", function() {
            const indexReg = Number(this.getAttribute("data-index"));
            carrinho.splice(indexReg, 1); // Remove do array
            renderizarCarrinho();
            atualizarOrcamento();
        });
    });
}

// 3. Função principal de processamento reativo e cálculo final
function atualizarOrcamento() {
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();
    const distancia = Number(document.getElementById("distancia").value);

    const divResultado = document.getElementById("resultado");
    const whatsappBtn = document.getElementById("whatsappBtn");

    // Validação: Só calcula se houver dados do cliente e pelo menos 1 bolo no carrinho
    if (!nome || !telefone || !endereco || !bairro || distancia < 0 || carrinho.length === 0) {
        divResultado.style.display = "none";
        whatsappBtn.style.display = "none";
        return; 
    }

    // Soma do peso total de todos os bolos e preço acumulado dos bolos
    let pesoTotalAcumulado = 0;
    let precoTodosBolos = 0;
    let stringItensResumo = "";

    carrinho.forEach(item => {
        pesoTotalAcumulado += item.peso;
        precoTodosBolos += item.precoTotalBolo;
        stringItensResumo += `<p style="font-size:13px; color:#777; padding-left:10px;">• ${item.bolo} (${item.peso} kg): <span>${moeda(item.precoTotalBolo)}</span></p>`;
    });

    // Regra de Negócio: Cálculo do Frete com base no peso TOTAL somado
    const taxaBase = 8;
    const valorPorKm = 1.5;
    const adicionalPeso = 2;

    let frete = taxaBase + (distancia * valorPorKm);
    if (pesoTotalAcumulado > 2) {
        frete += (pesoTotalAcumulado - 2) * adicionalPeso;
    }

    // Definição do Prazo de Entrega
    let prazo = "2 horas";
    if (distancia <= 5) {
        prazo = "30 minutos";
    } else if (distancia <= 15) {
        prazo = "1 hora";
    }

    // Cálculo do Total Geral
    const total = precoTodosBolos + frete;
    const dataPedido = new Date().toLocaleString("pt-BR");

    // Renderizando o resumo estruturado na interface
    divResultado.innerHTML = `
        <div class="resultado-card">
            <h2>📋 Resumo do Pedido</h2>
            <p><strong>Cliente:</strong> <span>${nome}</span></p>
            <p><strong>Telefone:</strong> <span>${telefone}</span></p>
            <p><strong>Endereço:</strong> <span>${endereco}, ${bairro}</span></p>
            <hr>
            <p><strong>Bolos Escolhidos:</strong> <span>${carrinho.length} item(ns)</span></p>
            ${stringItensResumo}
            <p><strong>Peso Total do Pedido:</strong> <span>${pesoTotalAcumulado} kg</span></p>
            <p><strong>Distância da Entrega:</strong> <span>${distancia} km</span></p>
            <hr>
            <p><strong>Subtotal dos Bolos:</strong> <span>${moeda(precoTodosBolos)}</span></p>
            <p><strong>Frete:</strong> <span>${moeda(frete)}</span></p>
            <p><strong>Prazo Estimado:</strong> <span>${prazo}</span></p>
            <hr>
            <p style="font-size: 22px; color: #2ecc71; margin-top: 10px;">
                <strong>Total:</strong> <strong>${moeda(total)}</strong>
            </p>
        </div>
    `;
    divResultado.style.display = "block";

    // Criando a string de itens limpa para o WhatsApp
    let textoItensWhats = "";
    carrinho.forEach((item, idx) => {
        textoItensWhats += `${idx + 1}. ${item.bolo} (${item.peso} kg) - ${moeda(item.precoTotalBolo)}\n`;
    });

    // Configurando a mensagem estruturada para a API do WhatsApp
    const numeroWhatsapp = "5511985878638";
    const message = `🎂 *NOVO PEDIDO MULTIPLO*

👤 *Cliente:* ${nome}
📞 *Telefone:* ${telefone}
🏠 *Endereço:* ${endereco}
📍 *Bairro:* ${bairro}

🛒 *ITENS DO PEDIDO:*
${textoItensWhats}
⚖️ *Peso Total:* ${pesoTotalAcumulado} kg
📍 *Distância:* ${distancia} km

💵 *Subtotal Bolos:* ${moeda(precoTodosBolos)}
🚚 *Frete:* ${moeda(frete)}
💰 *Total Geral:* ${moeda(total)}

⏱️ *Prazo:* ${prazo}
📅 *Data:* ${dataPedido}
📝 *Obs:* ${observacoes || "Nenhuma"}`;

    whatsappBtn.href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(message)}`;
    whatsappBtn.style.display = "block";
}

// --- MAPEAMENTO DOS EVENTOS ---

// Evento de clique para o botão de Adicionar Bolo ao Carrinho
document.getElementById("btn-adicionar-bolo").addEventListener("click", function() {
    const selectBolo = document.getElementById("bolo");
    const bolo = selectBolo.options[selectBolo.selectedIndex].value;
    const precoBaseBolo = Number(selectBolo.options[selectBolo.selectedIndex].dataset.preco);
    const peso = Number(document.getElementById("peso").value);

    if (peso <= 0) {
        alert("Por favor, digite um peso válido acima de 0kg.");
        return;
    }

    // Insere o objeto estruturado no array do carrinho
    carrinho.push({
        bolo,
        peso,
        precoTotalBolo: precoBaseBolo * peso
    });

    // Dá o feedback na UI, limpa o campo peso para o padrão e roda o recalculador
    renderizarCarrinho();
    atualizarOrcamento();
    document.getElementById("peso").value = "1"; 
});

// Formata o campo de telefone dinamicamente enquanto digita
document.getElementById("telefone").addEventListener("input", function (e) {
    e.target.value = aplicarMascaraTelefone(e.target.value);
});

// Monitora alterações nos dados do cliente e distância para recalcular em tempo real
const inputsCliente = ["nome", "telefone", "endereco", "bairro", "observacoes", "distancia"];
inputsCliente.forEach(id => {
    document.getElementById(id).addEventListener("input", atualizarOrcamento);
});

// Bloqueia recarregamento acidental do Form
document.getElementById("form-pedido").addEventListener("submit", function (event) {
    event.preventDefault();
    atualizarOrcamento();
});
