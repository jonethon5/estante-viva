import {
  todosOsLivros,
  adicionarLivro,
  deletarLivroData,
  buscarLivroPorIdData,
  atualizarLivroData,
} from "../data/booksData.js";

// Mock do banco de dados (array em memória).
// Cada livro tem id, title, author, price, stock, category e image.
async function listarLivros() {
  const livros = await todosOsLivros();
  return livros;
}

// Busca um livro por ID. Se não encontrar, lança erro (tratado no controller).
async function buscarLivroPorId(id) {
  const livroEncontrado = await buscarLivroPorIdData(id);
  if (livroEncontrado) {
    return livroEncontrado;
  }
  throw new Error("livro não encontrado");
}

// Cria um livro novo. Recebe os dados do livro (title, author, price...)
async function criarLivro(livro) {
  if (typeof livro.title !== "string" || livro.title.trim() === "") {
    throw new Error("O titlo deve ser uma string não vazia");
  }
  if (typeof livro.author !== "string" || livro.author.trim() === "") {
    throw new Error("O author deve ser uma string não vazia");
  }
  if (typeof livro.category !== "string" || livro.category.trim() === "") {
    throw new Error("A category deve ser uma string não vazia");
  }
  if (
    livro.price == null ||
    typeof livro.price != "number" ||
    livro.price < 0
  ) {
    throw new Error(
      "O price não pode ser negativo e tem que ser um numero valido",
    );
  }
  if (
    livro.stock == null ||
    typeof livro.stock !== "number" ||
    livro.stock < 0
  ) {
    throw new Error(
      "stock não pode ser negativo e tem que ser um numero valido",
    );
  }

  const livroCriado = adicionarLivro(livro);

  return livroCriado;
}

// Deleta um livro. Recebe o livro a ser deletado (encontrado pelo controller).
async function deletarLivro(id) {
  const livros = await todosOsLivros(); // Pega o "banco" atual (array em memória)
  const index = livros.findIndex((item) => item.id === id); // Encontra o índice do livro com o ID dado
  if (index < 0) {
    throw new Error("Esse livro não existe");
  }
  const livroDeletado = deletarLivroData(id);
  return livroDeletado;
}

// Atualiza um livro. Recebe o id do livro a ser atualizado e os dados para atualizar (title, author, price...)
async function atualizarLivro(id, dados) {
  // 1. buscar o livro pelo id
  const livro = await buscarLivroPorIdData(id);
  // 2. se não encontrar, lançar erro
  if (!livro) {
    throw new Error("livro não Encontrado");
  }
  // 3. verificar se dados veio preenchido
  if (!dados || Object.keys(dados).length === 0) {
    throw new Error("Nenhum dado para atualizar");
  }
  return await atualizarLivroData(id, dados); // Retorna o livro atualizado (útil pro controller responder 200 com o recurso atualizado)
}

export {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  deletarLivro,
  atualizarLivro,
};
