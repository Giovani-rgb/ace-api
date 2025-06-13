// services/paymentService.js

const Payment = require("../models/paymentModel");
const db = require('./firebase'); // ajuste o caminho conforme sua estrutura

const collection = db.collection("payments");

class PaymentService {
    static async create(paymentId, uid) {
        const payment = new Payment(paymentId, uid);
        await collection.doc(paymentId).set({ ...payment });
        return payment;
    }

    static async findByPaymentId(paymentId) {
        const doc = await collection.doc(paymentId).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    }
    
    static async cancel(paymentId) {
        await collection
            .doc(paymentId)
            .update({ status: "cancelled", cancelledAt: new Date() });
    }

    static async error(paymentId, errorMessage) {
        await collection.doc(paymentId).update({
            status: "error",
            errorMessage,
            errorAt: new Date()
        });
    }

    static async complete(paymentId, txid) {
        const payment = await this.findByPaymentId(paymentId);
        if (!payment) {
            throw new Error("Pagamento não encontrado");
        }
        await collection.doc(paymentId).update({
            status: "completed",
            txid,
            completedAt: new Date()
        });
        return { ...payment, status: "completed", txid };
    }

    static async approve(paymentId) {
        const payment = await this.findByPaymentId(paymentId);
        if (!payment) {
            throw new Error("Pagamento não encontrado");
        }
        await collection.doc(paymentId).update({ status: "approved" });
        return { ...payment, status: "approved" };
    }
}

module.exports = PaymentService;
