function calcularFrete() {

    const nome = document.getElementById("nome").value;
    const bolo = document.getElementById("bolo").value;
    const peso = Number(document.getElementById("peso").value);
    const distancia = Number(document.getElementById("distancia").value);

    let frete = 8 + (distancia * 1.5);

    if (peso > 2) {
        frete += (peso - 2) * 2;
    }

    const total = 50 + frete;

    document.getElementById("resultado").innerHTML = `
        <hr><br>

        <h2>Resumo do Pedido</h2>

        <p><strong>Cliente:</strong> ${nome}</p>

        <p><strong>Bolo:</strong> ${bolo}</p>

        <p><strong>Frete:</strong> R$ ${frete.toFixed(2)}</p>

        <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
    `;
}
