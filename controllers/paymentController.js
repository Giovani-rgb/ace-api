const fetch = require("node-fetch");
const logger = require("../utils/logger");
const PaymentService = require("../services/paymentService");

class PaymentController {
    static async completePayment(req, res) {
        const { paymentId, txid, uid } = req.body;
        const missingFields = [];
        if (!paymentId) missingFields.push("paymentId");
        if (!txid) missingFields.push("txid");
        if (!uid) missingFields.push("uid");

        logger.info("[Payment-(Controller)] Requisição recebida:", req.body);

        if (missingFields.length) {
            logger.warn(`[Payment-(Controller)] Campos obrigatórios faltando: ${missingFields.join(", ")}`);
            return res.status(400).json({
                message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`
            });
        }

        try {
            logger.info("[Payment-(Controller)] Chamando Pi Network para completar pagamento...");

            const piResponse = await fetch(
                `https://api.minepi.com/v2/payments/${paymentId}/complete`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Key ${process.env.PI_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ txid })
                }
            );

            if (!piResponse.ok) {
                const errorBody = await piResponse.text();
                throw new Error(
                    `Erro da Pi Network: ${piResponse.status} - ${errorBody}`
                );
            }

            const piData = await piResponse.json();
            logger.info("[Payment-(Controller)] Pi Network completou transação:", piData);

            const completedPayment = await PaymentService.complete(paymentId, txid);
            logger.info("[Payment-(Controller)] Pagamento completado:", completedPayment);

            return res.status(200).json({
                message: "Pagamento completado com sucesso",
                payment: completedPayment,
                piResponse: piData
            });
        } catch (error) {
            logger.error("[Payment-(Controller)] Erro ao completar pagamento:", error.message);
            return res.status(500).json({
                message: "Erro ao completar pagamento",
                error: error.message
            });
        }
    }

    static async cancelPayment(req, res) {
        const { paymentId, uid } = req.body;
        const missingFields = [];
        if (!paymentId) missingFields.push("paymentId");
        if (!uid) missingFields.push("uid");

        logger.info("[Payment-(Controller)] Requisição recebida:", req.body);

        if (missingFields.length) {
            logger.warn(`[Payment-(Controller)]
             Campos obrigatórios faltando: ${missingFields.join(", ")}`);
            return res.status(400).json({ message: `Campos obrigatórios faltando: ${missingFields.join(", ")}` });
        }

        try {
            await PaymentService.cancel(paymentId);
            logger.info("[Payment-(Controller)] Pagamento cancelado com sucesso:", paymentId);
            return res.status(200).json({ message: "Pagamento cancelado com sucesso" });
        } catch (err) {
            logger.error("[Payment-(Controller)] Erro ao cancelar pagamento:", err.message);
            return res.status(500).json({
                message: "Erro ao cancelar pagamento",
                error: err.message
            });
        }
    }

    static async errorPayment(req, res) {
        const { paymentId, uid, errorMessage } = req.body;
        const missingFields = [];
        if (!paymentId) missingFields.push("paymentId");
        if (!uid) missingFields.push("uid");
        if (!errorMessage) missingFields.push("errorMessage");

        logger.info("[Payment-(Controller)] Requisição recebida:", req.body);

        if (missingFields.length) {
            logger.warn(`[Payment-(Controller)] Campos obrigatórios faltando: ${missingFields.join(", ")}`);
            return res.status(400).json({ message: `Campos obrigatórios faltando: ${missingFields.join(", ")}` });
        }

        try {
            await PaymentService.error(paymentId, errorMessage);
            logger.info("[Payment-(Controller)] Erro registrado com sucesso para pagamento:", paymentId);
            return res.status(200).json({ message: "Erro registrado com sucesso" });
        } catch (err) {
            logger.error("[Payment-(Controller)] Erro ao registrar erro:", err.message);
            return res.status(500).json({
                message: "Erro ao registrar erro",
                error: err.message
            });
        }
    }

    static async approvePayment(req, res) {
        const { paymentId, uid } = req.body;
        const missingFields = [];
        if (!paymentId) missingFields.push("paymentId");
        if (!uid) missingFields.push("uid");

        logger.info("[Payment-(Controller)] Requisição recebida:", req.body);

        if (missingFields.length) {
            logger.warn(`[Payment-(Controller)] Campos obrigatórios faltando: ${missingFields.join(", ")}`);
            return res.status(400).json({ message: `Campos obrigatórios faltando: ${missingFields.join(", ")}` });
        }

        try {
            const payment = await PaymentService.create(paymentId, uid);
            logger.info("[Payment-(Controller)] Pagamento criado/recuperado:", payment);

            const response = await fetch(
                `https://api.minepi.com/v2/payments/${paymentId}/approve`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Key ${process.env.PI_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(
                    `Erro da Pi Network: ${response.status} - ${errorBody}`
                );
            }

            const responseData = await response.json();
            logger.info("[Payment-(Controller)] Pagamento aprovado na Pi Network:", responseData);

            const approvedPayment = await PaymentService.approve(paymentId);
            logger.info("[Payment-(Controller)] Status atualizado no banco:", approvedPayment);

            return res.status(200).json({
                message: "Pagamento aprovado com sucesso",
                payment: approvedPayment,
                piResponse: responseData
            });
        } catch (error) {
            logger.error("[Payment-(Controller)] Erro ao aprovar pagamento:", error.message);
            return res.status(500).json({
                message: "Erro ao aprovar pagamento",
                error: error.message
            });
        }
    }
}

module.exports = PaymentController;
