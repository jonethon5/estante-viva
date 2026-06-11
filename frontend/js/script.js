// ==========================
// DOM (Elementos da página)
// ==========================

// Pega o elemento <div id="status"> para mostrar mensagens na tela
const statusEl = document.querySelector("#status");

// Pega o elemento <div id="booksGrid"> onde os cards serão renderizados
const booksGridEl = document.querySelector("#booksGrid");

// ==========================
// URLs da API
// ==========================

// Base URL do backend
const API_URL = "http://localhost:3000/api/books";

// URL final para buscar os livros (GET /api/books/livros)
const BOOKS_URL = API_URL + "/livros";

// ==========================
// fetchBooks — busca livros na API (GET)
// ==========================

// Função assíncrona: usa await para esperar a resposta do backend
async function fetchBooks() {
  // Faz a requisição GET para o backend
  const response = await fetch(BOOKS_URL);

  // response.ok é true quando o status é 2xx (200, 201, etc.)
  // Se vier 404, 500, etc., lançamos um erro para o catch da init() capturar
  if (!response.ok) {
    throw new Error("Failed to fetch books: " + response.status);
  }

  // Converte o corpo da resposta de JSON para objeto JavaScript
  const books = await response.json();

  // Retorna o array de livros para quem chamou a função
  return books;
}

// ==========================
// renderBooks — renderiza os cards no grid
// ==========================

const renderBooks = function (books) {
  // Limpa o grid antes de renderizar (evita duplicar cards)
  booksGridEl.innerHTML = "";

  // Se não vier nenhum livro, mostra mensagem e para aqui
  if (books.length === 0) {
    booksGridEl.innerHTML = "<p>Nenhum livro encontrado</p>";
    return;
  }

  // Monta uma string HTML com todos os cards
  let html = "";
  books.forEach((item) => {
    html += `
      <div class="card" data-id="${item.id}">
        <h3>${item.title}</h3>
        <p>Autor: ${item.author}</p>
        <p>Preço: ${item.price}</p>
        <p>Estoque: ${item.stock}</p>
        <button data-action="delete">Deletar</button>
      </div>
    `;
    // data-id → guarda o id do livro no card (usado depois no event delegation)
    // data-action="delete" → identifica que esse botão é de deletar
  });

  // Coloca o HTML montado dentro do grid
  // IMPORTANTE: isso estava faltando antes — você montava o html mas nunca jogava no DOM
  booksGridEl.innerHTML = html;
};
// ← renderBooks fecha AQUI, fora da init

// ==========================
// init — inicializa o app
// ==========================

// Controla o fluxo inicial:
// 1) Mostra "Carregando..."
// 2) Busca os livros na API
// 3) Renderiza os cards
// 4) Atualiza o status com a quantidade
// 5) Se der erro, mostra mensagem no status
async function init() {
  // Feedback imediato para o usuário enquanto a requisição acontece
  statusEl.textContent = "Carregando livros...";

  try {
    // Aguarda os livros chegarem do backend
    const books = await fetchBooks();

    // Loga no console para confirmar que os dados chegaram corretamente
    console.log(books);

    // Renderiza os cards no grid
    renderBooks(books);

    // Atualiza o status com a quantidade de livros carregados
    statusEl.textContent = `${books.length} livros encontrados.`;
  } catch (error) {
    // Se der erro (rede, backend off, CORS, etc.), mostra no status
    statusEl.textContent = "Erro ao carregar livros.";

    // Detalhe do erro no console para debug
    console.error(error);
  }
}
// ← init fecha AQUI, fora e depois de renderBooks

function handleGridClick (event) {

  
}

// Chama o init para iniciar tudo quando o script rodar
// (o <script defer> garante que o HTML já foi carregado antes disso)
init();