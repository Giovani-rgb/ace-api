// routes/cotacao.js
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/piusd", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd"
    );

    const data = await response.json();

    const piUsd = data?.["pi-network"]?.usd;

    if (!piUsd) {
      return res.status(404).json({ error: "Cotação não encontrada" });
    }

    res.status(200).json({ piusd: piUsd });
  } catch (error) {
    console.error("Erro ao buscar cotação:", error.message);
    res.status(500).json({ error: "Erro ao obter cotação da Pi." });
  }
});

module.exports = router;


