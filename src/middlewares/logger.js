// Middleware de logger para registrar as requisições e respostas
function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const ms = Date.now() - start;

    console.log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`,
    );
  });
  return next();
}

export default logger;
