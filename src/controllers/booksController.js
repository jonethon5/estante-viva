// Importa a função da camada data.
// Essa função devolve TODOS os livros (array),
// sem aplicar regra de negócio nenhuma.
const { todosOsLivros, adicionarLivro } = require("../data/booksData");

// Controller responsável por lidar com a rota GET /livros
// Ele recebe req (requisição) e res (resposta)
const listarLivros = function (req, res) {
  // 1️⃣ Busca os dados brutos na camada data
  // Neste momento, 'livros' é um ARRAY com todos os livros
  const livros = todosOsLivros();

  // 2️⃣ Extrai os filtros vindos da query string da URL
  // Exemplo de URL:
  // /api/books/livros?category=Fantasia&stock=true
  const { category, stock } = req.query;

  // 3️⃣ Cria uma variável que começa com todos os livros
  // Ela será atualizada conforme os filtros forem aplicados
  let filtrados = livros;

  // 4️⃣ Filtro por categoria
  // Só aplica o filtro SE category existir na query
  if (category) {
    filtrados = filtrados.filter((item) => item.category === category);
  }

  // 5️⃣ Filtro por estoque (regra: "tem estoque")
  // Query params sempre vêm como STRING,
  // então comparamos com "true"
  if (stock === "true") {
    filtrados = filtrados.filter((item) => item.stock > 0);
  }
  return res.status(200).json(filtrados);
};

const buscarLivroPorId = function (req, res) {
  const livros = todosOsLivros();

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const livroEncontrado = livros.find((item) => item.id === id);

  if (!livroEncontrado) {
    return res.status(404).json({ erro: "Livro não disponível" });
  }
  // 6️⃣ Retorna o resultado final (array filtrado ou não
  // Sempre retorna um objeto,
  return res.status(200).json(livroEncontrado);
};

const criarLivro = function (req, res) {
  // 1) Pega os dados enviados pelo cliente no body (JSON)
  const { title, author, price, stock, category, image } = req.body;

  // 2) Validação mínima (MVP):
  //    - Strings obrigatórias: precisam ser string e não vazias (trim remove espaços)
  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ erro: "title deve ser uma string não vazia" });
  }

  if (typeof author !== "string" || author.trim() === "") {
    return res
      .status(400)
      .json({ erro: "author deve ser uma string não vazia" });
  }

  if (typeof category !== "string" || category.trim() === "") {
    return res
      .status(400)
      .json({ erro: "category deve ser uma string não vazia" });
  }

  //    - Números obrigatórios: não podem ser null/undefined, devem ser number e não negativos
  if (stock == null || typeof stock !== "number" || stock < 0) {
    return res.status(400).json({
      erro: "stock não pode ser negativo e tem que ser um numero valido",
    });
  }

  if (price == null || typeof price !== "number" || price < 0) {
    return res.status(400).json({
      erro: "preço não pode ser negativo e tem que ser um número válido",
    });
  }

  // 3) Cria o livro chamando a camada data (ela gera o id e salva no array)
  const livroCriado = adicionarLivro({
    title,
    author,
    price,
    stock,
    category,
    image,
  });

  // 4) Retorna 201 (Created) + o recurso recém-criado
  return res.status(201).json(livroCriado);
};
// Exporta o controller para ser usado pela rota
module.exports = { listarLivros, buscarLivroPorId, criarLivro };
