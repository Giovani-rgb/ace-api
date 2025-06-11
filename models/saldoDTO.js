class SaldoDTO {
  constructor({ pi = 0, ciclos = 0 } = {}) {
    this.pi = Number(pi);
    this.ciclos = Number(ciclos);
  }

  toJSON() {
    return {
      pi: this.pi,
      ciclos: this.ciclos
    };
  }
}

module.exports = SaldoDTO;
