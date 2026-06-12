import connection from "../db.js";

// 1) Devolve o "banco" atual (array em memória).
// OBS: como é mock, reiniciar o servidor reseta esse array.
async function todosOsLivros() {
  const [rows] = await connection.execute("SELECT * FROM livros");
  console.log(rows);
  return rows;
}

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

async function deletarLivro(id) {
  const [livro] = await connection.execute(
    `SELECT * FROM livros WHERE id = ?`.id,
  );
}

// 3) Exporta as funções (data layer).
// Depois, no MySQL, você mantém esses nomes e troca a implementação.
export { todosOsLivros, adicionarLivro };
