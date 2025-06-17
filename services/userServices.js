const UserDTO = require('../models/userDTO');
const db = require('./firebase');
const logger = require('../utils/logger');
const collection = db.collection('users');

// Cria novo usuário no Firestore
const createUser = async (data) => {
  try {
    const user = new UserDTO(data);
    await collection.doc(user.uid).set(user.toJSON());
    logger.info(`[Usuário-(Servico)] criado com UID: ${user.uid}`);
    return user;
  } catch (error) {
    logger.error(`Erro ao criar [Usuário-(Servico)]: ${error.message}`);
    throw error;
  }
};

// Busca usuário por UID
const getUserById = async (uid) => {
  try {
    const doc = await collection.doc(uid).get();
    if (!doc.exists) {
      logger.warn(`[Usuário-(Servico)] com UID ${uid} não encontrado`);
      return null;
    }
    logger.info(`[Usuário-(Servico)] com UID ${uid} encontrado`);
    return doc.data();
  } catch (error) {
    logger.error(`Erro ao buscar [Usuário-(Servico)]: ${error.message}`);
    throw error;
  }
};

// Atualiza dados do usuário
const updateUser = async (uid, updates) => {
  try {
    const docRef = collection.doc(uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`[Usuário-(Servico)] com UID ${uid} não existe para atualização`);
      return null;
    }

    await docRef.update(updates);
    const updatedDoc = await docRef.get();
    logger.info(`[Usuário-(Servico)] com UID ${uid} atualizado`);
    return updatedDoc.data();
  } catch (error) {
    logger.error(`Erro ao atualizar [Usuário-(Servico)]: ${error.message}`);
    throw error;
  }
};

// Remove usuário por UID
const deleteUser = async (uid) => {
  try {
    const docRef = collection.doc(uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`[Usuário-(Servico)] com UID ${uid} não existe para exclusão`);
      return false;
    }

    await docRef.delete();
    logger.info(`[Usuário-(Servico)] com UID ${uid} excluído`);
    return true;
  } catch (error) {
    logger.error(`Erro ao excluir [Usuário-(Servico)]: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
