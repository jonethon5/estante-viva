// ==========================
// DOM (Elementos da página)
// ==========================

// Pega o elemento <div id="status"> para mostrar mensagens na tela
// Ex: "Carregando livros...", "4 livros encontrados", "Erro ao carregar..."
const statusEl = document.querySelector("#status");

// Pega o elemento <div id="booksGrid"> onde os cards dos livros serão renderizados depois
const booksGridEl = document.querySelector("#booksGrid");

// ==========================
// URLs da API
// ==========================

// Base URL do backend (prefixo definido no server.js com app.use("/api/books", ...))
const API_URL = "http://localhost:3000/api/books";

// URL final para buscar os livros (GET /api/books/livros)
const BOOKS_URL = API_URL + "/livros";

// ==========================
// Função para buscar livros (GET)
// ==========================

// Função assíncrona: usa await para esperar a resposta do backend
async function fetchBooks() {
  // Faz uma requisição GET para a rota de livros
  const response = await fetch(BOOKS_URL);

  // response.ok é true quando o status HTTP é 2xx (ex: 200, 201, etc.)
  // Se for false (ex: 404, 500), lançamos um erro para ser tratado no catch da init()
  if (!response.ok) {
    // ⚠️ Observação: aqui existe um erro no seu código original:
    // response.status NÃO é uma função, então response.status(404) vai quebrar.
    // O correto seria usar response.status (número) ou response.statusText (texto).
    throw new Error("Failed to fetch books: " + response.status);
  }

  // Converte o corpo da resposta em JSON (no seu caso, um array de livros)
  const books = await response.json();

  // Retorna o array de livros para quem chamou a função
  return books;
}

// ==========================
// Start (executa o app)
// ==========================
const renderBooks = function (books) {
  // Limpa o conteúdo atual da grid de livros
  console.log("renderBooks rodou", books.length);
  booksGridEl.innerHTML = "";
  if (books.length === 0) {
    return (booksGridEl.innerHTML = "<p>Nenhum livro encontrado</p>");
  }
  let html = "";
  books.forEach(
    (item) =>
      (html += ` <div class="card" data-id="${item.id}">
               <h3> titulo: ${item.title} </h3>  
               <p> Autir: ${item.author}</p>
               <p> Preço: ${item.price}</p>
               <p> Estoque: ${item.stock}</p>
               <button data-action="delete">Deletar</button>

        </div>
      
    `),
  );

  // ==========================
  // Função init (inicializa o app)
  // ==========================

  // Essa função roda quando a página carrega e controla o fluxo inicial:
  // 1) Mostrar "Carregando..."
  // 2) Buscar os livros na API
  // 3) Mostrar quantos livros vieram
  // 4) Se der erro, mostrar mensagem de erro
  async function init() {
    // Mostra feedback imediato para o usuário
    statusEl.textContent = "Carregando livros...";

    try {
      // Busca os livros (pode dar erro e cair no catch se fetchBooks lançar erro)
      const books = await fetchBooks();

      // Loga no console para confirmar que os dados chegaram
      console.log(books);
      renderBooks(books);

      // Atualiza o status com a quantidade de livros carregados
      statusEl.textContent = `${books.length} livros encontrados.`;
    } catch (error) {
      // Se der erro (rede, backend off, CORS, response.ok false com throw, etc.)
      statusEl.textContent = "Erro ao carregar livros: ";

      // Mostra o erro detalhado no console para debug
      console.error(error);
    }
  }
};
// Chama a init para iniciar tudo quando o script rodar
// (Como seu <script> está com defer, isso roda após o HTML carregar)
init();
