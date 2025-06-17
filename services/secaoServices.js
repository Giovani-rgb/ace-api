const SecaoDTO = require('../models/secaoDTO');
const db = require('./firebase');
const logger = require('../utils/logger');

const collection = db.collection('secoes');

const createSecao = async (data) => {
  try {
    const secao = new SecaoDTO(data);
    
    const subCollection = collection.doc(secao.uidUsuario).collection('secoes');
    
    const newDocRef = subCollection.doc(); // gera idSecao automático

    await newDocRef.set(secao.toJSON());

    logger.info(`[Seção-(Servico)] criada para UID: ${secao.uidUsuario}, ID Secao: ${newDocRef.id}`);
    return { idSecao: newDocRef.id, ...secao.toJSON() };
  } catch (error) {
    logger.error(`Erro ao criar [Seção-(Servico)]: ${error.message}`);
    throw error;
  }
};

const getSecaoById = async (uid, idSecao) => {
  try {
    const docRef = collection.doc(uid).collection('secoes').doc(idSecao);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`[Seção-(Servico)] não encontrada para UID: ${uid}, ID: ${idSecao}`);
      return null;
    }

    logger.info(`[Seção-(Servico)] recuperada para UID: ${uid}, ID: ${idSecao}`);
    return doc.data();
  } catch (error) {
    logger.error(`Erro ao buscar [Seção-(Servico)]: ${error.message}`);
    throw error;
  }
};

const updateSecao = async (uid, idSecao, updates) => {
  try {
    const docRef = collection.doc(uid).collection('secoes').doc(idSecao);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`Não foi possível atualizar, [Seção-(Servico)] não encontrada para UID: ${uid}, ID: ${idSecao}`);
      return null;
    }

    await docRef.update(updates);
    const updated = await docRef.get();

    logger.info(`[Seção-(Servico)] atualizada para UID: ${uid}, ID: ${idSecao}`);
    return updated.data();
  } catch (error) {
    logger.error(`Erro ao atualizar [Seção-(Servico)]: ${error.message}`);
    throw error;
  }
};

const deleteSecao = async (uid, idSecao) => {
  try {
    const docRef = collection.doc(uid).collection('secoes').doc(idSecao);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`Tentativa de deletar [Seção-(Servico)] inexistente para UID: ${uid}, ID: ${idSecao}`);
      return false;
    }

    await docRef.delete();

    logger.info(`[Seção-(Servico)] deletada para UID: ${uid}, ID: ${idSecao}`);
    return true;
  } catch (error) {
    logger.error(`Erro ao deletar [Seção-(Servico)]: ${error.message}`);
    throw error;
  }
};

const listSecoesByUid = async (uid) => {
  try {
    const snapshot = await collection.doc(uid).collection('secoes').get();
   
    if (snapshot.empty) {
      logger.warn(`Nenhuma [Seção-(Servico)] encontrada para UID: ${uid}`);
      return [];
    }

    const secoes = snapshot.docs.map(doc => ({ idSecao: doc.id, ...doc.data() }));

    logger.info(`[Seção-(Servico)] listadas para UID: ${uid}`);
    return secoes;
  } catch (error) {
    logger.error(`Erro ao listar [Seção-(Servico)]: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createSecao,
  getSecaoById,
  updateSecao,
  deleteSecao,
  listSecoesByUid
};
