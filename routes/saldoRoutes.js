const express = require('express');
const router = express.Router();
const saldoController = require('../controllers/saldoController');

router.get('/:uid', saldoController.getSaldo);
router.post('/:uid', saldoController.setSaldo);
router.patch('/:uid', saldoController.incrementSaldo); // para incrementos

module.exports = router;
