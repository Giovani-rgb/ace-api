// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

router.post('/premium/approve', PaymentController.approvePayment);
router.post('/premium/complete', PaymentController.completePayment);
router.post('/premium/cancel', PaymentController.cancelPayment);
router.post('/premium/error', PaymentController.errorPayment);



module.exports = router;
