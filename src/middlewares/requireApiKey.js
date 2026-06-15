// Middleware para exigir a chave de API
function requireApiKey(req, res, next) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ error: "Faltou o header x-api-key" });
  }
  if (apiKey !== "123"){
   return res.status(401).json({ error: "x-api-key inválida" });
  }

  return next();
}

export default requireApiKey;