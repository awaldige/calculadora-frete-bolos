import { supabase } from "./supabase.js";

async function carregarPedidos() {

    const { data, error } = await supabase
        .from("pedidos")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    let totalPedidos = data.length;
    let faturamento = 0;

    const tabela = document.getElementById("listaPedidos");

    tabela.innerHTML = "";

    data.forEach(pedido => {

        faturamento += Number(pedido.total);

        const dataFormatada = new Date(pedido.created_at)
            .toLocaleString("pt-BR");

        tabela.innerHTML += `
            <tr>
                <td>${pedido.nome}</td>
                <td>${pedido.bolo}</td>
                <td>R$ ${Number(pedido.total).toFixed(2)}</td>
                <td>${dataFormatada}</td>
            </tr>
        `;
    });

    const ticketMedio = faturamento / totalPedidos;

    document.getElementById("totalPedidos").innerText = totalPedidos;
    document.getElementById("totalFaturamento").innerText =
        "R$ " + faturamento.toFixed(2);
    document.getElementById("ticketMedio").innerText =
        "R$ " + ticketMedio.toFixed(2);
}

carregarPedidos();
