Markdown
# 🎂 Cake Delivery Pro

Uma aplicação web moderna e reativa para **gestão de pedidos e cálculo automatizado de entregas** voltada para confeitarias e comércio de bolos artesanais. 

O sistema simula a experiência de um carrinho de compras de e-commerce, permitindo a adição de múltiplos produtos no mesmo pedido, validação dinâmica de dados de entrega e geração de mensagens estruturadas integradas diretamente à API do WhatsApp.

👉 **Acesse a aplicação online:** [https://cake-delivery-pro.vercel.app](https://cake-delivery-pro.vercel.app)

---

## 💡 Sobre o Projeto

O **Cake Delivery Pro** foi desenvolvido para solucionar gargalos logísticos e de atendimento em pequenas confeitarias. Ele elimina processos manuais ao centralizar a escolha dos produtos e automatizar as regras de negócio em uma única interface fluida e de alta conversão.

### 🧠 Regras de Negócio Implementadas:
- **Precificação Dinâmica:** O custo base do bolo multiplica-se automaticamente de acordo com o peso fracionado (kg) inserido pelo usuário.
- **Logística Fretada Acumulativa:** Aplicação de uma taxa base fixa de entrega com acréscimo de valor adicional por quilo excedente, calculada sobre o peso total da carga contida no carrinho.
- **Automação de Atendimento:** Serialização de objetos do array de compras em uma string limpa e formatada para o fechamento do pedido via WhatsApp.

---

## ✨ Funcionalidades Correntes

- 🛒 **Carrinho Multitestável:** Adição de múltiplos sabores de bolos e pesos do mesmo tipo em um único pedido com persistência em memória (`state-driven`).
- 🗑️ **Manipulação Dinâmica:** Remoção de itens individualmente com recálculo instantâneo de subtotais, frete e total geral.
- 📞 **Máscara Input Pattern:** Formatação reativa em tempo real para campos de telefone no padrão brasileiro `(XX) XXXXX-XXXX`.
- ⚡ **UI/UX Reativa (`Zero-Click`):** Exibição do card de resumo de valores e botões de ação apenas após a validação total de dados compulsórios, limpando a tela automaticamente pós-envio.
- 🎨 **Visual Moderno:** Layout responsivo otimizado para dispositivos móveis com foco na experiência do usuário.

---

## 🛠 Tecnologias Utilizadas

- **HTML5 Semantic** — Estruturação semântica da interface.
- **CSS3 Modern** — Estilização, efeitos de transição e responsividade.
- **JavaScript (ES6+)** — Manipulação assíncrona do DOM, gerenciamento de estados (`Array Architecture`), lógica matemática e integração com a API do WhatsApp.
- **Font Awesome** — Arquitetura de ícones vetoriais.

---

## 📂 Estrutura do Projeto

```text
Cake-Delivery-Pro/
│
├── index.html        # Estrutura e marcação da aplicação
├── style.css         # Identidade visual e regras de responsividade
├── script.js        # Motor de lógica, carrinho e controle do DOM
├── favicon.png       # Ícone de identificação da aba do navegador
└── README.md         # Documentação técnica do repositório
🚀 Como Executar Localmente
1. Clonar o repositório
Bash
git clone [https://github.com/awaldige/Cake-Delivery-Pro.git](https://github.com/awaldige/Cake-Delivery-Pro.git)
cd Cake-Delivery-Pro
2. Inicializar o projeto
Como a aplicação foi construída em Vanilla Architecture (JavaScript Puro), nenhuma instalação de pacotes ou inicialização de servidores adicionais é requerida. Basta abrir o arquivo index.html em qualquer navegador moderno.

📸 Demonstração da Interface





Fechamento e Resumo
🔮 Roadmap / Melhorias Futuras
[ ] Integração com banco de dados (Ex: Supabase / PostgreSQL) para persistência permanente.

[ ] Implementação de um painel administrativo (Dashboard) para controle interno de produção das receitas.

[ ] Integração nativa com APIs de mapas para geolocalização e cálculo por zonas de bairro.

[ ] Autenticação de clientes via NextAuth / Supabase Auth.

🤝 Contribuições
Sinta-se à vontade para abrir uma Issue ou enviar um Pull Request se encontrar falhas ou tiver sugestões de novas funcionalidades.

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo para mais detalhes.

👨‍💻 Autor
Desenvolvido por André Waldige — Analista e Desenvolvedor de Sistemas.

GitHub: github.com/awaldige

LinkedIn: linkedin.com/in/andre-waldige-dev

Projeto construído com foco na demonstração de habilidades práticas em arquitetura de dados no Front-end e UX reativo.
