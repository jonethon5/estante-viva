import connection from "../db.js";

// 1) Devolve o "banco" atual (array em memória).
// OBS: como é mock, reiniciar o servidor reseta esse array.
async function todosOsLivros() {
  const [rows] = await connection.execute("SELECT * FROM livros");
  console.log(rows);
  return rows;
}

// 2) Busca um livro por ID. Se não encontrar, devolve null (tratado no service).
async function buscarLivroPorIdData(id) {
  const [livro] = await connection.execute(
    "SELECT * FROM livros WHERE id = ? ",
    [id],
  );
  return livro[0];
}

// 3) Adiciona um livro novo. Recebe os dados do livro (title, author, price...)
async function adicionarLivro(dados) {
  console.log("adicionarLivro chamado com:", dados);
  const [livro] = await connection.execute(
    "INSERT INTO livros (title, author, price, stock,category, image) VALUES (?,?,?, ?,?,?)",
    [
      dados.title,
      dados.author,
      dados.price,
      dados.stock,
      dados.category,
      dados.image,
    ],
  );
  const id = livro.insertId;

  const [rows] = await connection.execute("SELECT * FROM livros WHERE id = ?", [
    id,
  ]);

  return rows[0];
}

// 4) Deleta um livro por ID. Se não encontrar, lança erro (tratado no service).
async function deletarLivroData(id) {
  console.log("deletarLivroData chamado com id:", id, typeof id);
  const [livro] = await connection.execute(
    "SELECT * FROM livros WHERE id = ?",
    [id],
  );
  await connection.execute("DELETE FROM livros WHERE id = ?", [id]);
  return livro[0];
}

// 5) Atualiza um livro por ID. Recebe o id do livro a ser atualizado e os dados novos. Se não encontrar, lança erro (tratado no service).
async function atualizarLivroData(id, dados) {
  const [rows] = await connection.execute("SELECT * FROM livros WHERE id = ?", [
    id,
  ]);
  const livroAtual = rows[0];
  const livroAtualizado = { ...livroAtual, ...dados };
  await connection.execute(
    "UPDATE livros  SET title = ?, author = ?,  price = ?, stock = ?, category =  ?, image = ? WHERE id = ?",
    [
      livroAtualizado.title,
      livroAtualizado.author,
      livroAtualizado.price,
      livroAtualizado.stock,
      livroAtualizado.category,
      livroAtualizado.image,
      id,
    ],
  );

  return livroAtualizado;
}

// Exporta as funções para serem usadas em outros arquivos (services, controllers).
export {
  todosOsLivros,
  adicionarLivro,
  deletarLivroData,
  buscarLivroPorIdData,
  atualizarLivroData,
};
