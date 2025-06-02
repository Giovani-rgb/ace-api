// models/paymentModel.js

class Payment {
  constructor(paymentId, uid, status = 'pending', createdAt = new Date()) {
    this.paymentId = paymentId;
    this.uid = uid;
    this.status = status;
    this.createdAt = createdAt;
  }
}

module.exports = Payment;
