class SecaoDTO {
  constructor({ uidUsuario, agente, ip }) {
    this.uidUsuario = uidUsuario;           // ID do usuário (pai do documento)
    this.criadaEm = new Date().toISOString(); // Data/hora de criação
    this.agente = agente || '';             // Informações do agente (browser, device)
    this.ip = ip || '';                     // Endereço IP da sessão
    this.ativa = true;                      // Seção ativa ao ser criada
    this.deslogadoEm = null;                // Momento de logout (null até ser encerrada)
  }

  toJSON() {
    return {
      uidUsuario: this.uidUsuario,
      criadaEm: this.criadaEm,
      agente: this.agente,
      ip: this.ip,
      ativa: this.ativa,
      deslogadoEm: this.deslogadoEm
    };
  }
}

module.exports = SecaoDTO;
