const bannerService = require("../services/bannerServices");
const logger = require("../utils/logger");

module.exports = {
  createBanner: async (req, res) => {
    try {
      const banner = await bannerService.createBanner(req.body);
      res.status(201).json({ message: "Banner criado", banner });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getBannerById: async (req, res) => {
    try {
      const { id } = req.params;

      const banner = await bannerService.getBannerById(id);
      if (!banner)
        return res.status(404).json({ error: "Banner não encontrado" });

      res.json(banner);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllBanners: async (_req, res) => {
    try {
      const banners = await bannerService.getAllBanners();
      res.json(banners);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateBanner: async (req, res) => {
    try {
      const { id } = req.params;

      const updatedBanner = await bannerService.updateBanner(id, req.body);
      if (!updatedBanner)
        return res.status(404).json({ error: "Banner não encontrado" });

      res.json({ message: "Banner atualizado", banner: updatedBanner });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteBanner: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await bannerService.deleteBanner(id);
      if (!deleted)
        return res.status(404).json({ error: "Banner não encontrado" });

      res.json({ message: "Banner removido com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
