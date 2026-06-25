function calcularFrete() {

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;

    const selectBolo =
        document.getElementById("bolo");

    const bolo =
        selectBolo.options[
            selectBolo.selectedIndex
        ].value;

    const precoBolo =
        Number(
            selectBolo.options[
                selectBolo.selectedIndex
            ].dataset.preco
        );

    const peso =
        Number(document.getElementById("peso").value);

    const distancia =
        Number(document.getElementById("distancia").value);

    let frete = 8 + (distancia * 1.5);

    if (peso > 2) {
        frete += (peso - 2) * 2;
    }

    const total = precoBolo + frete;

    document.getElementById("resultado").innerHTML = `
    
    <div class="resultado-card">

        <h2>Resumo do Pedido</h2>

        <p><strong>Cliente:</strong> ${nome}</p>

        <p><strong>Telefone:</strong> ${telefone}</p>

        <p><strong>Bolo:</strong> ${bolo}</p>

        <p><strong>Valor do Bolo:</strong>
           R$ ${precoBolo.toFixed(2)}
        </p>

        <p><strong>Frete:</strong>
           R$ ${frete.toFixed(2)}
        </p>

        <p><strong>Total:</strong>
           R$ ${total.toFixed(2)}
        </p>

    </div>
    `;

    const numeroWhatsapp = "5511985878638";

    const mensagem = `
Olá!

Gostaria de fazer um pedido.

Cliente: ${nome}

Telefone: ${telefone}

Bolo: ${bolo}

Valor do Bolo: R$ ${precoBolo.toFixed(2)}

Frete: R$ ${frete.toFixed(2)}

Total: R$ ${total.toFixed(2)}
`;

    document.getElementById("whatsappBtn").href =
        `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;

    document.getElementById("whatsappBtn").style.display =
        "block";
}

    document.getElementById("resultado").innerHTML = `
        <hr><br>

        <h2>Resumo do Pedido</h2>

        <p><strong>Cliente:</strong> ${nome}</p>

        <p><strong>Bolo:</strong> ${bolo}</p>

        <p><strong>Frete:</strong> R$ ${frete.toFixed(2)}</p>

        <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
    `;
}
