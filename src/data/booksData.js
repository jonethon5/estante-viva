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

const todosOsLivros = function () {
  return books;
};

const adicionarLivro = function (dados) {
  const novoId = Math.max(...books.map((item) => item.id)) + 1;
  const livroCriado = { id: novoId, ...dados };
  books.push(livroCriado);
  return books
};

module.exports = { todosOsLivros, adicionarLivro };
