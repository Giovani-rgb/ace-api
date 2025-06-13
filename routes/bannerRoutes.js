const express = require('express');
const router = express.Router();

const bannerController = require('../controllers/bannerController');

// Criar um novo banner
router.post('/', bannerController.createBanner);

// Listar todos os banners
router.get('/', bannerController.getAllBanners);

// Buscar um banner pelo ID
router.get('/:id', bannerController.getBannerById);

// Atualizar um banner pelo ID
router.put('/:id', bannerController.updateBanner);

// Remover um banner pelo ID
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
