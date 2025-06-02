const logger = require('../utils/logger');
const userService = require('../services/userServices');
const secaoService = require('../services/secaoServices');
const fetch = require('node-fetch');

module.exports = {
  verifyAuth: async (req, res) => {
    try {
      const { accessToken, user } = req.body;

      if (!accessToken || !user) {
        logger.warn('Requisição sem dados de autenticação.');
        return res.status(400).json({ error: 'Dados de autenticação ausentes.' });
      }

      // 🛡️ Verifica o token na API da Pi Network
      const piApiResponse = await fetch('https://api.minepi.com/v2/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });

      if (!piApiResponse.ok) {
        const contentType = piApiResponse.headers.get('content-type');
        const body = await piApiResponse.text();
        logger.warn(`Resposta inválida da Pi API [${piApiResponse.status}] ${contentType}: ${body}`);
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
      }

      const verifiedUser = await piApiResponse.json();

      if (verifiedUser.uid !== user.uid) {
        logger.warn(`UID divergente. Esperado: ${verifiedUser.uid}, Recebido: ${user.uid}`);
        return res.status(401).json({ error: 'Identidade do usuário não corresponde ao token.' });
      }

      logger.info(`Token de ${user.uid} validado com sucesso.`);

      // 👤 Recupera ou cria o usuário
      let foundUser = await userService.getUserById(user.uid);

      if (!foundUser) {
        // Usuário não existe, criar usuário e nova seção
        foundUser = await userService.createUser(user);
        logger.info(`Novo usuário registrado: ${user.uid}`);

        const secaoData = {
          uidUsuario: user.uid,
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip,
          agente: req.headers['user-agent'],
          ativa: true, // marca essa seção como ativa
          criadoEm: new Date().toISOString()
        };

        const novaSecao = await secaoService.createSecao(secaoData);
        logger.info(`Nova seção criada para novo usuário ${user.uid}`);

        return res.status(200).json({
          message: 'Usuário autenticado e criado com sucesso',
          user: foundUser,
          secao: novaSecao
        });
      }

      // Usuário existe, listar seções e verificar seção ativa
      const secoes = await secaoService.listSecoesByUid(user.uid);

      // Procurar seção ativa na lista
      const secaoAtiva = secoes.find(secao => secao.ativa === true);

      if (secaoAtiva) {
        // Seção ativa encontrada, retorna ela
        logger.info(`Seção ativa existente para usuário ${user.uid}`);
        return res.status(200).json({
          message: 'Usuário autenticado com seção ativa',
          user: foundUser,
          secao: secaoAtiva
        });
      }

      // Nenhuma seção ativa encontrada, criar nova seção ativa sem sobrescrever outras
      const secaoData = {
        uidUsuario: user.uid,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip,
        agente: req.headers['user-agent'],
        ativa: true,
        criadoEm: new Date().toISOString()
      };

      const novaSecao = await secaoService.createSecao(secaoData);
      logger.info(`Nova seção ativa criada para usuário existente ${user.uid}`);

      return res.status(200).json({
        message: 'Usuário autenticado com nova seção ativa criada',
        user: foundUser,
        secao: novaSecao
      });

    } catch (error) {
      logger.error(`Erro na verificação do usuário: ${error.message}`);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
};
