// 1. imports todos no topo
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import booksRoutes from "./src/routes/booksRoutes.js";
import "./src/db.js";

// 2. cria o app
const app = express();

// 3. __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4. middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// 5. rotas
app.use("/api/books", booksRoutes);

// 6. listen
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
