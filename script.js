javascript
function calcularFrete() {

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (!nome) {
        alert("Informe o nome do cliente.");
        return;
    }

    const selectBolo = document.getElementById("bolo");

    const bolo =
        selectBolo.options[
            selectBolo.selectedIndex
        ].value;

    const precoBolo = Number(
        selectBolo.options[
            selectBolo.selectedIndex
        ].dataset.preco
    );

    const peso = Number(
        document.getElementById("peso").value
    );

    const distancia = Number(
        document.getElementById("distancia").value
    );

    // Configuração do frete
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

    document.getElementById("resultado").innerHTML = `
        <div class="resultado-card">

            <h2>Resumo do Pedido</h2>

            <p><strong>Cliente:</strong> ${nome}</p>

            <p><strong>Telefone:</strong> ${telefone}</p>

            <p><strong>Bolo:</strong> ${bolo}</p>

            <p><strong>Peso:</strong> ${peso} kg</p>

            <p><strong>Distância:</strong> ${distancia} km</p>

            <p><strong>Valor do Bolo:</strong>
               R$ ${precoBolo.toFixed(2)}
            </p>

            <p><strong>Frete:</strong>
               R$ ${frete.toFixed(2)}
            </p>

            <p><strong>Prazo:</strong>
               ${prazo}
            </p>

            <hr style="margin:15px 0;">

            <p style="font-size:20px;">
                <strong>Total:</strong>
                R$ ${total.toFixed(2)}
            </p>

        </div>
    `;

    const numeroWhatsapp = "5511985878638";

    const mensagem = `
Olá!

Gostaria de fazer um pedido.

👤 Cliente: ${nome}

📞 Telefone: ${telefone}

🎂 Bolo: ${bolo}

⚖️ Peso: ${peso} kg

📍 Distância: ${distancia} km

🚚 Frete: R$ ${frete.toFixed(2)}

💰 Total: R$ ${total.toFixed(2)}

⏱️ Prazo estimado: ${prazo}
`;

    const whatsappBtn =
        document.getElementById("whatsappBtn");

    whatsappBtn.href =
        `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

    whatsappBtn.style.display = "block";
}

