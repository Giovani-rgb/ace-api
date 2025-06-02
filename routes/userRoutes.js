// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const apiAuth = require('../middleware/apiAuth');

// Todas as rotas protegidas
router.post('/', apiAuth, userController.createUser);
router.get('/:uid', apiAuth, userController.getUserById);
router.put('/:uid', apiAuth, userController.updateUser);
router.delete('/:uid', apiAuth, userController.deleteUser);

module.exports = router;
