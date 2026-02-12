const books = [
  {
    id: 1,
    title: "O Código do Dragão",
    author: "Rafael Monteiro",
    price: 59.9,
    stock: 12,
    category: "Fantasia",
    image: "https://fakeimg.pl/300x450/?text=O+Codigo+do+Dragao",
  },
  {
    id: 2,
    title: "JavaScript Além do Básico",
    author: "Mariana Alves",
    price: 89.9,
    stock: 7,
    category: "Tecnologia",
    image: "https://fakeimg.pl/300x450/?text=JavaScript+Avancado",
  },
  {
    id: 3,
    title: "Mistérios da Cidade Cinza",
    author: "Lucas Ferreira",
    price: 49.9,
    stock: 20,
    category: "Suspense",
    image: "https://fakeimg.pl/300x450/?text=Misterios+da+Cidade",
  },
  {
    id: 4,
    title: "Node.js na Prática",
    author: "Ana Souza",
    price: 99.9,
    stock: 5,
    category: "Programação",
    image: "https://fakeimg.pl/300x450/?text=Node.js+na+Pratica",
  },
];

// 1) Devolve o "banco" atual (array em memória).
// OBS: como é mock, reiniciar o servidor reseta esse array.
const todosOsLivros = function () {
  return books;
};

// 2) Recebe os dados do livro (title, author, price...)
// e devolve o livro criado com ID gerado pelo backend.
const adicionarLivro = function (dados) {

  // 2.1) Caso especial: se o array estiver vazio,
  // o primeiro ID começa em 1 (evita Math.max em array vazio).
  if (books.length === 0) {
    const novoId = 1;

    // Monta o livro final: pega tudo de dados e força o id por último.
    const livroCriado = { ...dados, id: novoId };

    // Adiciona no array principal.
    books.push(livroCriado);

    // Retorna o recurso criado (útil pro controller responder 201).
    return livroCriado;
  }

  // 2.2) Caso normal: pega o maior ID existente e soma 1.
  // books.map(item => item.id) cria um array só com os ids.
  // Math.max(...) pega o maior id.
  const novoId = Math.max(...books.map((item) => item.id)) + 1;

  // Monta o livro final. "id" por último garante que ninguém sobrescreve.
  const livroCriado = { ...dados, id: novoId };

  // Salva no array e devolve o livro criado.
  books.push(livroCriado);
  return livroCriado;
};

// 3) Exporta as funções (data layer).
// Depois, no MySQL, você mantém esses nomes e troca a implementação.
module.exports = { todosOsLivros, adicionarLivro };
