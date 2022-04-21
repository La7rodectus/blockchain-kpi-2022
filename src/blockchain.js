const Block = require('./block');

class BlockChain {
  #difficulty = '27';

  #init(genesis) {
    genesis.mine(this.#difficulty, this._hashF);
    this.chain.push(genesis);
  }

  constructor(hashF, genesis) {
    this._hashF = hashF;

    this.chain = [];
    this.currentTransactions = [];

    this.#init(genesis);
  }

  #validateBlock(prev, block) {
    if (!(block instanceof Block) || !(prev instanceof Block)) return false;
    if (prev.index + 1 !== block.index) return false;
    if (prev.getHash() !== block.lastHash) return false;
    if (!block.getHash().endsWith(this.#difficulty)) return false;
    return true;
  }

  toString() {
    return JSON.stringify(this.chain, null, 4);
  }

  toJSON() {
    return this.chain;
  }

  hashBlock(block) {
    return this._hashF(block);
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  insertBlock(block) {
    block.mine(this.#difficulty, this._hashF);

    if (!this.#validateBlock(this.getLastBlock(), block)) {
      return false;
    }

    this.chain.push(block);
    return true;
  }

  log() {
    return this.chain.reduce((acc, b) => ({
      ...acc,
      [b.getHash()]: b.toObject()
    }), {});
  }

}

module.exports = BlockChain;