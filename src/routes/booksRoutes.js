const express = require("express");
const {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
} = require("../controllers/booksController");

const router = express.Router();

//Cria o router. Ele vai agrupar todas as rotas de livros.
router.get("/livros", listarLivros);

router.get("/livros/:id", buscarLivroPorId);

router.post("/livros", criarLivro)

module.exports = router;
