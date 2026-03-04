const express = require("express");
const {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  deletarLivro,
  atualizarLivro,
  validateIdParam,
} = require("../controllers/booksController");

const logger = require("../middlewares/logger.js");

const router = express.Router();

router.use(logger)

//Cria o router. Ele vai agrupar todas as rotas de livros.
router.get("/livros", listarLivros);

router.get("/livros/:id", validateIdParam, buscarLivroPorId);

router.post("/livros", criarLivro);

router.delete("/livros/:id", validateIdParam, deletarLivro);

router.patch("/livros/:id", validateIdParam, atualizarLivro);

module.exports = router;
