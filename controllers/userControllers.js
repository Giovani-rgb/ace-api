const userService = require('../services/userServices');

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ message: 'Usuário criado', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.uid);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.uid, req.body);
      if (!updatedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json({ message: 'Usuário atualizado', user: updatedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deleted = await userService.deleteUser(req.params.uid);
      if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
