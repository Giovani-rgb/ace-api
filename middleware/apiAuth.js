// middlewares/apiAuth.js
const API_KEY = process.env.API_KEY || 'minha-chave-secreta';

module.exports = (req, res, next) => {
  const key = req.headers['x-api-key'];

  if (!key || key !== API_KEY) {
    return res.status(403).json({ error: 'Acesso negado: chave inválida' });
  }

  next();
};
