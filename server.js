const express = require("express");
const cors = require('cors')

// Importa o arquivo de rotas de livros (Router) que você criou dentro de src/routes
// Observação: './' significa "a partir da pasta atual" (raiz do projeto, onde está o server.js)
const booksRoutes = require("./src/routes/booksRoutes");

const app = express();
app.use(cors())

const PORT = 3000;

// Middleware que permite o servidor entender JSON no corpo da requisição.
// Sem isso, req.body viria undefined em POST/PUT.
app.use(express.json());

// Registra (conecta) as rotas de livros no servidor com um prefixo/base path
// Tudo que começar com '/api/books' será encaminhado para o Router 'booksRoutes'
// Exemplo: se o router tiver '/livros', a URL final vira '/api/books/livros'
app.use("/api/books", booksRoutes);



// Serve apenas como feedback no terminal.
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
