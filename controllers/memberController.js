const Member = require('../models/memberModel');

module.exports = {
  async list(req, res) {
    const members = await Member.getAll();
    res.json(members);
  },

  async create(req, res) {
    const newMember = await Member.create(req.body);
    res.status(201).json(newMember);
  },

  async get(req, res) {
    const member = await Member.getById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    res.json(member);
  }
};
