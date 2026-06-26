let carrinho = [];

// 1. Máscara de Telefone
function aplicarMascaraTelefone(valor) {
    if (!valor) return "";
    valor = valor.replace(/\D/g, ""); 
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2"); 
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2"); 
    return valor;
}

const moeda = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// 2. Renderizar Carrinho Visual
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

    document.querySelectorAll(".btn-remover").forEach(botao => {
        botao.addEventListener("click", function() {
            const indexReg = Number(this.getAttribute("data-index"));
            carrinho.splice(indexReg, 1);
            renderizarCarrinho();
            atualizarOrcamento();
        });
    });
}

// 3. Função Principal de Cálculo e Atualização Reativa
function atualizarOrcamento() {
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    const divResultado = document.getElementById("resultado");
    const whatsappBtn = document.getElementById("whatsappBtn");

    // Validação reativa sem a distância
    if (!nome || !telefone || !endereco || !bairro || carrinho.length === 0) {
        divResultado.style.display = "none";
        whatsappBtn.style.display = "none";
        return; 
    }

    let pesoTotalAcumulado = 0;
    let precoTodosBolos = 0;
    let stringItensResumo = "";

    carrinho.forEach(item => {
        pesoTotalAcumulado += item.peso;
        precoTodosBolos += item.precoTotalBolo;
        stringItensResumo += `<p style="font-size:13px; color:#777; padding-left:10px;">• ${item.bolo} (${item.peso} kg): <span>${moeda(item.precoTotalBolo)}</span></p>`;
    });

    // Nova Regra de Negócio: Frete Fixo + Adicional por peso total da carga
    const freteFixo = 12; // Valor de entrega padrão estabelecido
    const adicionalPeso = 2;

    let frete = freteFixo;
    if (pesoTotalAcumulado > 2) {
        frete += (pesoTotalAcumulado - 2) * adicionalPeso;
    }

    const total = precoTodosBolos + frete;
    const dataPedido = new Date().toLocaleString("pt-BR");

    // Renderizando o resumo na tela
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
            <hr>
            <p><strong>Subtotal dos Bolos:</strong> <span>${moeda(precoTodosBolos)}</span></p>
            <p><strong>Frete de Entrega:</strong> <span>${moeda(frete)}</span></p>
            <hr>
            <p style="font-size: 22px; color: #2ecc71; margin-top: 10px;">
                <strong>Total Geral:</strong> <strong>${moeda(total)}</strong>
            </p>
        </div>
    `;
    divResultado.style.display = "block";

    // Criando a string de itens limpa para o WhatsApp
    let textoItensWhats = "";
    carrinho.forEach((item, idx) => {
        textoItensWhats += `${idx + 1}. ${item.bolo} (${item.peso} kg) - ${moeda(item.precoTotalBolo)}\n`;
    });

    const numeroWhatsapp = "5511985878638";
    const message = `🎂 *NOVO PEDIDO MULTIPLO*

👤 *Cliente:* ${nome}
📞 *Telefone:* ${telefone}
🏠 *Endereço:* ${endereco}
📍 *Bairro:* ${bairro}

🛒 *ITENS DO PEDIDO:*
${textoItensWhats}
⚖️ *Peso Total:* ${pesoTotalAcumulado} kg

💵 *Subtotal Bolos:* ${moeda(precoTodosBolos)}
🚚 *Frete:* ${moeda(frete)}
💰 *Total Geral:* ${moeda(total)}

📅 *Data:* ${dataPedido}
📝 *Obs:* ${observacoes || "Nenhuma"}`;

    whatsappBtn.href = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(message)}`;
    whatsappBtn.style.display = "block";
}

// --- MAPEAMENTO DOS EVENTOS ---

document.getElementById("btn-adicionar-bolo").addEventListener("click", function() {
    const selectBolo = document.getElementById("bolo");
    const bolo = selectBolo.options[selectBolo.selectedIndex].value;
    const precoBaseBolo = Number(selectBolo.options[selectBolo.selectedIndex].dataset.preco);
    const peso = Number(document.getElementById("peso").value);

    if (peso <= 0) {
        alert("Por favor, digite um peso válido acima de 0kg.");
        return;
    }

    carrinho.push({
        bolo,
        peso,
        precoTotalBolo: precoBaseBolo * peso
    });

    renderizarCarrinho();
    atualizarOrcamento();
    document.getElementById("peso").value = "1"; 
});

document.getElementById("telefone").addEventListener("input", function (e) {
    e.target.value = aplicarMascaraTelefone(e.target.value);
});

// Monitora apenas os dados cadastrais do cliente para reatividade
const inputsCliente = ["nome", "telefone", "endereco", "bairro", "observacoes"];
inputsCliente.forEach(id => {
    document.getElementById(id).addEventListener("input", atualizarOrcamento);
});

document.getElementById("form-pedido").addEventListener("submit", function (event) {
    event.preventDefault();
    atualizarOrcamento();
});

// Evento para limpar o pedido e resetar a tela após o envio
document.getElementById("whatsappBtn").addEventListener("click", function () {
    // 1. Reseta o array de bolos escolhidos
    carrinho = [];

    // 2. Reseta todos os campos do formulário para o estado inicial
    document.getElementById("form-pedido").reset();

    // 3. Força o peso a voltar para o valor padrão de 1kg
    document.getElementById("peso").value = "1";

    // 4. Atualiza os componentes visuais para esconder o carrinho e o resumo vazios
    renderizarCarrinho();
    atualizarOrcamento();
});
