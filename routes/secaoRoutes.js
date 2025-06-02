const express = require('express');
const router = express.Router();
const secaoController = require('../controllers/secaoControllers');
const apiAuth = require('../middleware/apiAuth');

// Todas as rotas protegidas
router.post('/', apiAuth, secaoController.createSecao);

// Listar todas as seções de um usuário
router.get('/:uid', apiAuth, secaoController.listSecoesByUid);

// Buscar uma seção específica
router.get('/:uid/:idSecao', apiAuth, secaoController.getSecaoById);

// Atualizar uma seção específica
router.put('/:uid/:idSecao', apiAuth, secaoController.updateSecao);

// Fechar uma seção específica
router.patch('/:uid/:idSecao/close', secaoController.closeSecao);

// Deletar uma seção específica
router.delete('/:uid/:idSecao', apiAuth, secaoController.deleteSecao);

module.exports = router;
