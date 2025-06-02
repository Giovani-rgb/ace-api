const UserDTO = require('../models/userDTO');
const db = require('../services/firebase');
const logger = require('../utils/logger');
const collection = db.collection('users');

// Cria novo usuário no Firestore
const createUser = async (data) => {
  try {
    const user = new UserDTO(data);
    await collection.doc(user.uid).set(user.toJSON());
    logger.info(`Usuário criado com UID: ${user.uid}`);
    return user;
  } catch (error) {
    logger.error(`Erro ao criar usuário: ${error.message}`);
    throw error;
  }
};

// Busca usuário por UID
const getUserById = async (uid) => {
  try {
    const doc = await collection.doc(uid).get();
    if (!doc.exists) {
      logger.warn(`Usuário com UID ${uid} não encontrado`);
      return null;
    }
    logger.info(`Usuário com UID ${uid} encontrado`);
    return doc.data();
  } catch (error) {
    logger.error(`Erro ao buscar usuário: ${error.message}`);
    throw error;
  }
};

// Atualiza dados do usuário
const updateUser = async (uid, updates) => {
  try {
    const docRef = collection.doc(uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`Usuário com UID ${uid} não existe para atualização`);
      return null;
    }

    await docRef.update(updates);
    const updatedDoc = await docRef.get();
    logger.info(`Usuário com UID ${uid} atualizado`);
    return updatedDoc.data();
  } catch (error) {
    logger.error(`Erro ao atualizar usuário: ${error.message}`);
    throw error;
  }
};

// Remove usuário por UID
const deleteUser = async (uid) => {
  try {
    const docRef = collection.doc(uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`Usuário com UID ${uid} não existe para exclusão`);
      return false;
    }

    await docRef.delete();
    logger.info(`Usuário com UID ${uid} excluído`);
    return true;
  } catch (error) {
    logger.error(`Erro ao excluir usuário: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
