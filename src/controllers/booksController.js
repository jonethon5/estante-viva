// Importa a função da camada data.
// Essa função devolve TODOS os livros (array),
// sem aplicar regra de negócio nenhuma.
const { todosOsLivros, adicionarLivro } = require("../data/booksData");

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  req.bookId = id;
  return next();
}

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
  // Controller: busca 1 livro pelo id da URL
  const livros = todosOsLivros(); // Pega o "banco" atual (array de livros) da camada data

  const id = req.bookId;

  const livroEncontrado = livros.find((item) => item.id === id); // Procura o livro com esse id (retorna 1 objeto ou undefined)

  if (!livroEncontrado) {
    // Se não achou nenhum livro com esse id
    return res.status(404).json({ erro: "Livro não disponível" }); // 404 = recurso não encontrado
  }

  return res.status(200).json(livroEncontrado); // 200 = sucesso, devolve o livro encontrado
};

const criarLivro = function (req, res) {
  // Controller: cria um livro novo (POST)
  const { title, author, price, stock, category, image } = req.body; // Desestrutura os campos enviados no JSON do body

  // Validação mínima do MVP: garantir que os dados básicos existem e têm tipo correto
  if (typeof title !== "string" || title.trim() === "") {
    // title precisa ser string e não pode ser vazio/espacos
    return res
      .status(400)
      .json({ erro: "title deve ser uma string não vazia" }); // Se inválido, retorna 400
  }

  if (typeof author !== "string" || author.trim() === "") {
    // author precisa ser string e não pode ser vazio
    return res
      .status(400)
      .json({ erro: "author deve ser uma string não vazia" }); // 400 se inválido
  }

  if (typeof category !== "string" || category.trim() === "") {
    // category precisa ser string e não pode ser vazio
    return res
      .status(400)
      .json({ erro: "category deve ser uma string não vazia" }); // 400 se inválido
  }

  if (stock == null || typeof stock !== "number" || stock < 0) {
    // stock não pode ser null/undefined, precisa ser number e >= 0
    return res.status(400).json({
      // Responde erro 400
      erro: "stock não pode ser negativo e tem que ser um numero valido", // Mensagem de validação
    });
  }

  if (price == null || typeof price !== "number" || price < 0) {
    // price não pode ser null/undefined, precisa ser number e >= 0
    return res.status(400).json({
      // Responde erro 400
      erro: "preço não pode ser negativo e tem que ser um número válido", // Mensagem de validação
    });
  }

  const livroCriado = adicionarLivro({
    // Chama a camada data para criar e salvar o livro (aqui gera o id também)
    title, // Envia title
    author, // Envia author
    price, // Envia price
    stock, // Envia stock
    category, // Envia category
    image, // Envia image
  });

  // OBS: o mais correto no POST é 201 (Created). Você pode trocar 200 por 201 depois.
  return res.status(200).json(livroCriado); // Retorna sucesso e devolve o livro criado
};

const deletarLivro = function (req, res) {
  const id = req.bookId;

  const db = todosOsLivros(); // Pega o array de livros atual (mock)
  const index = db.findIndex((item) => item.id === id); // Procura o índice do livro no array (posição), ou -1 se não existir

  if (index < 0) {
    // Se não achou o livro (findIndex devolveu -1)
    return res.status(404).json({ error: "Livro não encontrado." }); // 404 = não existe livro com esse id
  }

  const [livroDeletado] = db.splice(index, 1); // Remove 1 item na posição index e pega o livro removido

  return res.status(200).json({ deleted: livroDeletado }); // Retorna sucesso e devolve qual livro foi deletado
};

const atualizarLivro = function (req, res) {
  // Controller: atualiza parcialmente (PATCH) um livro pelo id
  const id = req.bookId;

  const livros = todosOsLivros(); // Pega o array atual de livros
  const livro = livros.find((item) => item.id === id); // Procura o livro pelo id (objeto)

  if (!livro) {
    // Se não achou livro com esse id
    return res.status(404).json({ erro: "Esse ID não existe!" }); // 404 = recurso não encontrado
  }

  const dados = req.body; // Pega os dados enviados (patch parcial)
  if (!dados || Object.keys(dados).length === 0) {
    // Se body não existe ou veio vazio {}
    return res.status(400).json({ erro: "Nenhum dado para atualizar" }); // 400 = o cliente não mandou nada pra mudar
  }

  const allowed = ["title", "author", "price", "stock", "category", "image"]; // Lista de campos permitidos no PATCH
  const invalidField = Object.keys(dados).find((k) => !allowed.includes(k)); // Procura alguma chave no body que não é permitida
  if (invalidField) {
    // Se encontrou campo não permitido
    return res.status(400).json({ erro: `Campo inválido: ${invalidField}` }); // 400 = cliente tentou mandar campo proibido
  }

  if (dados.title !== undefined) {
    // Se o cliente mandou title (mesmo que vazio, vai cair na validação)
    if (typeof dados.title !== "string" || dados.title.trim() === "") {
      // title precisa ser string e não vazio
      return res
        .status(400)
        .json({ erro: "title deve ser uma string não vazia" }); // 400 se inválido
    }
    livro.title = dados.title.trim(); // Atualiza title no livro (trim pra salvar limpo)
  }

  if (dados.author !== undefined) {
    // Se o cliente mandou author
    if (typeof dados.author !== "string" || dados.author.trim() === "") {
      // valida author
      return res
        .status(400)
        .json({ erro: "author deve ser uma string não vazia" }); // 400 se inválido
    }
    livro.author = dados.author.trim(); // Atualiza author
  }

  if (dados.category !== undefined) {
    // Se o cliente mandou category
    if (typeof dados.category !== "string" || dados.category.trim() === "") {
      // valida category
      return res
        .status(400)
        .json({ erro: "category deve ser uma string não vazia" }); // 400 se inválido
    }
    livro.category = dados.category.trim(); // Atualiza category
  }

  if (dados.stock !== undefined) {
    // Se o cliente mandou stock (pode ser 0)
    if (typeof dados.stock !== "number" || dados.stock < 0) {
      // valida stock: number e >= 0
      return res.status(400).json({
        erro: "stock não pode ser negativo e tem que ser um numero valido",
      }); // 400 se inválido
    }
    livro.stock = dados.stock; // Atualiza stock
  }

  if (dados.price !== undefined) {
    // Se o cliente mandou price
    if (typeof dados.price !== "number" || dados.price < 0) {
      // valida price: number e >= 0
      return res.status(400).json({
        erro: "preço não pode ser negativo e tem que ser um número válido",
      }); // 400 se inválido
    }
    livro.price = dados.price; // Atualiza price
  }

  if (dados.image !== undefined) {
    // Se o cliente mandou image (aqui não tem validação)
    livro.image = dados.image; // Atualiza image do livro
  }

  return res.status(200).json(livro); // Retorna sucesso e devolve o livro atualizado
};

// Exporta o controller para ser usado pela rota
module.exports = {
  deletarLivro,
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  validateIdParam,
};
