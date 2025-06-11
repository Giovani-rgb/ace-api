const saldoService = require('../services/saldoServices');
const logger = require('../utils/logger');

const getSaldo = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    logger.warn('UID não fornecido na requisição de saldo');
    return res.status(400).json({ error: 'UID é obrigatório' });
  }

  try {
    let saldo = await saldoService.getSaldoByUid(uid);

    if (!saldo) {
      // Cria saldo inicial zerado
      saldo = await saldoService.setSaldoByUid(uid, { Pi: 0, CICLOS: 0 });
      logger.info(`Saldo não encontrado para UID ${uid}, criado com valores zerados.`);
    }

    return res.status(200).json(saldo);
  } catch (error) {
    logger.error(`Erro ao obter saldo para UID: ${uid} - ${error.message}`);
    return res.status(500).json({ error: 'Erro ao obter saldo' });
  }
};

const setSaldo = async (req, res) => {
  const { uid } = req.params;
  const data = req.body;

  if (!uid || !data) {
    return res.status(400).json({ error: 'UID e dados são obrigatórios' });
  }

  try {
    const saldo = await saldoService.setSaldoByUid(uid, data);
    return res.status(200).json(saldo);
  } catch (error) {
    logger.error(`Erro ao definir saldo para UID: ${uid} - ${error.message}`);
    return res.status(500).json({ error: 'Erro ao definir saldo' });
  }
};

const incrementSaldo = async (req, res) => {
  const { uid } = req.params;
  const { Pi = 0, CICLOS = 0 } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'UID é obrigatório' });
  }

  try {
    const saldoAtualizado = await saldoService.incrementSaldo(uid, { Pi, CICLOS });
    return res.status(200).json(saldoAtualizado);
  } catch (error) {
    logger.error(`Erro ao incrementar saldo para UID: ${uid} - ${error.message}`);
    return res.status(500).json({ error: 'Erro ao incrementar saldo' });
  }
};

module.exports = {
  getSaldo,
  setSaldo,
  incrementSaldo,
};
