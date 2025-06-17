const BannerDTO = require('../models/bannerDTO'); // use "require" pois o resto do seu projeto é CommonJS
const db = require('./firebase');
const logger = require('../utils/logger');
const collection = db.collection('banners');

// Cria novo banner
const createBanner = async (data) => {
  try {
    const banner = new BannerDTO(data);
    await collection.doc(banner.id).set(banner.toJSON());
    logger.info(`[Banner-(Servico)] criado com ID: ${banner.id}`);
    return banner;
  } catch (error) {
    logger.error(`Erro ao criar [Banner-(Servico)]: ${error.message}`);
    throw error;
  }
};

// Busca banner por ID
const getBannerById = async (id) => {
  try {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      logger.warn(`[Banner-(Servico)] com ID ${id} não encontrado`);
      return null;
    }
    logger.info(`[Banner-(Servico)] com ID ${id} encontrado`);
    return doc.data();
  } catch (error) {
    logger.error(`Erro ao buscar [Banner-(Servico)]: ${error.message}`);
    throw error;
  }
};

// Lista todos os banners
const getAllBanners = async () => {
  try {
    const snapshot = await collection.get();
    const banners = [];

    snapshot.forEach((doc) => {
      banners.push(doc.data());
    });

    logger.info(`Listagem de [Banner-(Servico)] realizada (${banners.length})`);
    return banners;
  } catch (error) {
    logger.error(`Erro ao listar [Banner-(Servico)]: ${error.message}`);
    throw error;
  }
};

// Atualiza banner existente
const updateBanner = async (id, updates) => {
  try {
    const docRef = collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`[Banner-(Servico)] com ID ${id} não existe para atualização`);
      return null;
    }

    await docRef.update(updates);
    const updatedDoc = await docRef.get();
    logger.info(`[Banner-(Servico)] com ID ${id} atualizado`);
    return updatedDoc.data();
  } catch (error) {
    logger.error(`Erro ao atualizar [Banner-(Servico)]: ${error.message}`);
    throw error;
  }
};

// Remove banner por ID
const deleteBanner = async (id) => {
  try {
    const docRef = collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      logger.warn(`[Banner-(Servico)] com ID ${id} não existe para exclusão`);
      return false;
    }

    await docRef.delete();
    logger.info(`[Banner-(Servico)] com ID ${id} excluído`);
    return true;
  } catch (error) {
    logger.error(`Erro ao excluir [Banner-(Servico)]: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createBanner,
  getBannerById,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
