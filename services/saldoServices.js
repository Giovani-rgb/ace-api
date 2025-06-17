const SaldoDTO = require('../models/saldoDTO');
const db = require('./firebase');
const logger = require('../utils/logger');

const collection = db.collection('saldos');

// Busca saldo de um usuário pelo UID
const getSaldoByUid = async (uid) => {
  try {
    const docRef = collection.doc(uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`[Saldo-(Servico)] não encontrado para UID: ${uid}`);
      return new SaldoDTO(); // Retorna saldo zerado
    }

    logger.info(`[Saldo-(Servico)] recuperado para UID: ${uid}`);
    return new SaldoDTO(doc.data());
  } catch (error) {
    logger.error(`Erro ao buscar Saldo-(Servico) para UID: ${uid} - ${error.message}`);
    throw error;
  }
};

// Cria ou atualiza saldo do usuário
const setSaldoByUid = async (uid, data) => {
  try {
    const saldo = new SaldoDTO(data);
    await collection.doc(uid).set(saldo.toJSON(), { merge: true });

    logger.info(`[Saldo-(Servico)] atualizado para UID: ${uid}`);
    return saldo.toJSON();
  } catch (error) {
    logger.error(`Erro ao atualizar Saldo-(Servico) para UID: ${uid} - ${error.message}`);
    throw error;
  }
};

// Incrementa saldo (útil se quiser acumular Pi/CICLOS)
const incrementSaldo = async (uid, { Pi = 0, CICLOS = 0 }) => {
  try {
    const docRef = collection.doc(uid);
    await docRef.set(
      {
        Pi: db.FieldValue.increment(Pi),
        CICLOS: db.FieldValue.increment(CICLOS)
      },
      { merge: true }
    );

    logger.info(`[Saldo-(Servico)] incrementado para UID: ${uid} (+${Pi} Pi, +${CICLOS} CICLOS)`);
    const updatedDoc = await docRef.get();
    return updatedDoc.data();
  } catch (error) {
    logger.error(`Erro ao incrementar Saldo-(Servico) para UID: ${uid} - ${error.message}`);
    throw error;
  }
};

module.exports = {
  getSaldoByUid,
  setSaldoByUid,
  incrementSaldo
};
