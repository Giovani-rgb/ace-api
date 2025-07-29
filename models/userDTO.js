const crypto = require("crypto");

class UserDTO {
    constructor({
        uid,
        username,
        createdAt,
        codReferral,
        codInvited = null,
        isInvestor = false
    }) {
        if (!uid || !username) {
            throw new Error("Campos obrigatórios ausentes no UserDTO");
        }

        this.uid = uid;
        this.username = username;
        this.createdAt = createdAt || new Date().toISOString();

        // Se codReferral não foi passado, gera um novo
        this.codReferral = codReferral || this.generateReferralCode();
        this.codInvited = codInvited;
        this.isInvestor = isInvestor;
    }

    generateReferralCode() {
        // Gera código aleatório (ex: "a3f9c1d2")
        return crypto.randomBytes(4).toString("hex");
    }

    toJSON() {
        return {
            uid: this.uid,
            username: this.username,
            createdAt: this.createdAt,
            codReferral: this.codReferral,
            codInvited: this.codInvited,
            isInvestor: this.isInvestor
        };
    }
}

module.exports = UserDTO;
