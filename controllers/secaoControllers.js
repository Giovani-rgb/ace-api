const secaoService = require("../services/secaoServices");
const logger = require("../utils/logger");

module.exports = {
    createSecao: async (req, res) => {
        try {
            const secao = await secaoService.createSecao(req.body);
            res.status(201).json({ message: "Seção criada", secao });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    closeSecao: async (req, res) => {
        try {
            const { uid, idSecao } = req.params;

            if (!uid || !idSecao) {
                return res
                    .status(400)
                    .json({ error: "UID e ID da Seção são obrigatórios" });
            }

            const updatedSecao = await secaoService.updateSecao(uid, idSecao, {
                ativa: false,
                deslogadoEm: new Date().toISOString()
            });

            if (!updatedSecao) {
                return res.status(404).json({ error: "Seção não encontrada" });
            }

            logger.info(`Seção encerrada para UID: ${uid}, ID: ${idSecao}`);

            res.status(200).json({
                message: "Seção encerrada com sucesso",
                secao: updatedSecao
            });
        } catch (error) {
            logger.error(`Erro ao encerrar seção: ${error.message}`);
            res.status(500).json({ error: "Erro interno no servidor" });
        }
    },

    getSecaoById: async (req, res) => {
        try {
            const { uid, idSecao } = req.params;

            const secao = await secaoService.getSecaoById(uid, idSecao);
            if (!secao)
                return res.status(404).json({ error: "Seção não encontrada" });
            res.json(secao);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateSecao: async (req, res) => {
        try {
            const { uid, idSecao } = req.params;

            const updatedSecao = await secaoService.updateSecao(
                uid,
                idSecao,
                req.body
            );
            if (!updatedSecao)
                return res.status(404).json({ error: "Seção não encontrada" });
            res.json({ message: "Seção atualizada", secao: updatedSecao });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    deleteSecao: async (req, res) => {
        try {
            const { uid, idSecao } = req.params;

            const deleted = await secaoService.deleteSecao(uid, idSecao);
            if (!deleted)
                return res.status(404).json({ error: "Seção não encontrada" });
            res.json({ message: "Seção removida com sucesso" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    listSecoesByUid: async (req, res) => {
        try {
            const { uid } = req.params;

            const secoes = await secaoService.listSecoesByUid(uid);
            res.json(secoes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
