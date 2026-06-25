

async function salvarPedido(dados) {

    const { error } = await supabase
        .from("pedidos")
        .insert([dados]);

    if (error) {
        console.error("Erro ao salvar pedido:", error);
    } else {
        console.log("Pedido salvo com sucesso!");
    }
}

window.calcularFrete = async function calcularFrete() {

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    const endereco = document.getElementById("endereco").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    if (!nome) {
        alert("Informe o nome do cliente.");
        return;
    }

    if (!telefone) {
        alert("Informe o telefone.");
        return;
    }

    const selectBolo = document.getElementById("bolo");

    const bolo =
        selectBolo.options[selectBolo.selectedIndex].value;

    const precoBolo = Number(
        selectBolo.options[selectBolo.selectedIndex].dataset.preco
    );

    const peso = Number(document.getElementById("peso").value);
    const distancia = Number(document.getElementById("distancia").value);

    if (peso <= 0) {
        alert("Peso inválido.");
        return;
    }

    if (distancia < 0) {
        alert("Distância inválida.");
        return;
    }

    const taxaBase = 8;
    const valorPorKm = 1.5;
    const adicionalPeso = 2;

    let frete = taxaBase + (distancia * valorPorKm);

    if (peso > 2) {
        frete += (peso - 2) * adicionalPeso;
    }

    let prazo = "";

    if (distancia <= 5) {
        prazo = "30 minutos";
    } else if (distancia <= 15) {
        prazo = "1 hora";
    } else {
        prazo = "2 horas";
    }

    const total = precoBolo + frete;

    const moeda = (valor) =>
        valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    const dataPedido = new Date().toLocaleString("pt-BR");

    document.getElementById("resultado").innerHTML = `
        <div class="resultado-card">

            <h2>📋 Resumo do Pedido</h2>

            <p><strong>Cliente:</strong> ${nome}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Endereço:</strong> ${endereco}</p>
            <p><strong>Bairro:</strong> ${bairro}</p>

            <p><strong>Bolo:</strong> ${bolo}</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
            <p><strong>Distância:</strong> ${distancia} km</p>

            <p><strong>Valor do Bolo:</strong> ${moeda(precoBolo)}</p>
            <p><strong>Frete:</strong> ${moeda(frete)}</p>

            <p><strong>Prazo:</strong> ${prazo}</p>

            <hr>

            <p style="font-size:22px;">
                <strong>Total:</strong> ${moeda(total)}
            </p>

        </div>
    `;

    const numeroWhatsapp = "5511985878638";

    const mensagem = `
🎂 *NOVO PEDIDO*

👤 Cliente: ${nome}
📞 Telefone: ${telefone}

🏠 Endereço: ${endereco}
📍 Bairro: ${bairro}

🎂 Bolo: ${bolo}
⚖️ Peso: ${peso} kg
📍 Distância: ${distancia} km

💵 Bolo: ${moeda(precoBolo)}
🚚 Frete: ${moeda(frete)}
💰 Total: ${moeda(total)}

⏱️ Prazo: ${prazo}
📅 Data: ${dataPedido}

📝 Obs: ${observacoes || "Nenhuma"}
`;

    const whatsappBtn = document.getElementById("whatsappBtn");

    whatsappBtn.href =
        `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

    whatsappBtn.style.display = "block";

    // 🔥 SALVAR NO SUPABASE
    const pedido = {
        nome,
        telefone,
        endereco,
        bairro,
        observacoes,
        bolo,
        peso,
        distancia,
        preco_bolo: precoBolo,
        frete,
        total,
        prazo
    };

    await salvarPedido(pedido);
};

