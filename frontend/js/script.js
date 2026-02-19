// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona a div onde os livros vão aparecer
  const productsGrid = document.querySelector(".products-grid");

  // Função assíncrona para buscar (GET) os dados no seu Node.js
  async function loadBooks() {
    try {
      // ⚠️ ATENÇÃO: Substitua essa URL pela rota GET do seu backend Node!
      // Exemplo: se seu servidor roda na porta 3000, seria algo assim:
      const response = await fetch("http://localhost:3000/api/livros");

      // Verifica se a resposta do servidor deu certo (Status 200)
      if (!response.ok) {
        throw new Error("Erro ao buscar os livros da API");
      }

      // Converte a resposta em um array de objetos JavaScript
      const books = await response.json();

      // Limpa o HTML estático que estava lá como esqueleto
      productsGrid.innerHTML = "";

      // Verifica se o banco está vazio
      if (books.length === 0) {
        productsGrid.innerHTML = "<p>Nenhum livro encontrado no momento.</p>";
        return;
      }

      // Percorre cada livro recebido do banco de dados
      books.forEach((book) => {
        // Monta o HTML do card dinamicamente usando Template Literals (crases)
        // Adapte book.titulo, book.autor e book.preco para os nomes exatos das colunas no seu banco!
        const cardHTML = `
                    <div class="product-card">
                        <h4>${book.titulo}</h4>
                        <p>${book.autor}</p>
                        <strong>R$ ${book.preco}</strong>
                    </div>
                `;

        // Injeta o novo card dentro da grid de produtos
        productsGrid.innerHTML += cardHTML;
      });
    } catch (error) {
      console.error("Erro de conexão:", error);
      productsGrid.innerHTML =
        "<p>Erro ao carregar os livros. Verifique se o servidor Node está rodando.</p>";
    }
  }

  // Chama a função logo que a página abre
  loadBooks();
});
