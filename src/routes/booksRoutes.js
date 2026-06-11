import express from "express";
import {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  deletarLivro,
  atualizarLivro,
  validateIdParam,
} from "../controllers/booksController.js";


import logger from "../middlewares/logger.js";
import requireApiKey from "../middlewares/requireApiKey.js";

const router = express.Router();

router.use(logger);

//Cria o router. Ele vai agrupar todas as rotas de livros.
router.get("/livros", listarLivros);

router.get("/livros/:id", validateIdParam, buscarLivroPorId);

router.post("/livros", requireApiKey, criarLivro);

router.delete("/livros/:id", requireApiKey, validateIdParam, deletarLivro);

router.patch("/livros/:id", requireApiKey, validateIdParam, atualizarLivro);

export default router;
