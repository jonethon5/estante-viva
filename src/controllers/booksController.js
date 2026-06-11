// Importa a função da camada data.
// Essa função devolve TODOS os livros (array),
// sem aplicar regra de negócio nenhuma.
import * as booksService from "../services/booksService.js";
// Middleware para validar o parâmetro "id" nas rotas que precisam de um id de livro
function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  req.bookId = id;
  return next();
}

// Controller responsável por lidar com a rota GET /livros
// Ele recebe req (requisição) e res (resposta)
async function listarLivros(req, res) {
  const livros = await booksService.listarLivros();
  if (livros.length > 0) {
    return res.status(200).json(livros);
  }
  return res.status(404).json({ erro: "Nenhum livro encontrado" });
}

// Controller responsável por lidar com a rota GET /livros/:id
// Ele busca um livro pelo id enviado como parâmetro na URL (req.params.id)
async  function buscarLivroPorId (req, res) {
  try {
    const id = req.bookId;
    const livro = await booksService.buscarLivroPorId(id);

    return res.status(200).json(livro);
  } catch (error) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
};

// Controller responsável por lidar com a rota POST /livros
// Ele cria um novo livro com os dados enviados no corpo da requisição (req.body)
async function criarLivro(req, res) {
  const livro = req.body;
  try {
    const novoLivro = await booksService.criarLivro(livro);
    res.status(201).json(novoLivro);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

// Controller responsável por lidar com a rota DELETE /livros/:id
// Ele deleta um livro pelo id enviado como parâmetro na URL (req.params.id)
async function deletarLivro(req, res) {
  const id = req.bookId;
  try {
    const livroDeletato = await booksService.deletarLivro(id);
    return res.status(200).json({ deleted: livroDeletato });
  } catch (error) {
    return res.status(404).json({ erro: error.message });
  }
};

// Controller responsável por lidar com a rota PATCH /livros/:id
async function atualizarLivro(req, res) {
  const id = req.bookId;
  const dados = req.body;

  try {
    const livroAtualizado = await booksService.atualizarLivro(id, dados);
    return res.status(200).json(livroAtualizado);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

// Exporta o controller para ser usado pela rota
export {
  deletarLivro,
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  validateIdParam,
};
