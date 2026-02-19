const express = require("express");
const {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
 deletarLivro,
 atualizarLivro 
} = require("../controllers/booksController");

const router = express.Router();

//Cria o router. Ele vai agrupar todas as rotas de livros.
router.get("/livros", listarLivros);

router.get("/livros/:id", buscarLivroPorId);

router.post("/livros", criarLivro);

router.delete("/livros/:id", deletarLivro);

router.patch("/livros/:id", atualizarLivro);

module.exports = router;
