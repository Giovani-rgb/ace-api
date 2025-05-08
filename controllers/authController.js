const AuthModel = require('../models/authModel');

module.exports = {
  verifyAuth: async (req, res) => {
    try {
      const { accessToken, user } = req.body;

      if (!accessToken || !user) {
        return res.status(400).json({ error: 'Dados de autenticação ausentes.' });
      }

      // Aqui você poderia validar accessToken com a Pi Network futuramente

      const savedUser = await AuthModel.saveUser(user);

      res.status(200).json({
        message: 'Usuário verificado e salvo com sucesso',
        user: savedUser
      });
    } catch (error) {
      console.error('Erro na verificação:', error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
};
