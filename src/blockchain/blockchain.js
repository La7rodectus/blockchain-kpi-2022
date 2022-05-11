const axios = require('axios').default;

const Block = require('./block');

const NODE_CHAIN_ROUTE = 'chain';
const DIFFICULTY = '03'; // month of birth

class Blockchain {
  #difficulty = DIFFICULTY;

  #init(genesis) {
    genesis.mine(this.#difficulty, this._hashF);
    this.chain.push(genesis);
  }

  constructor(hashF, genesis) {
    this._hashF = hashF;

    this.chain = [];
    this.currentBlock = null;
    this.nodes = new Map();

    this.#init(genesis);
  }

  #validateBlock(prev, block) {
    if (!(block instanceof Block) || !(prev instanceof Block)) return false;
    if (prev.index + 1 !== block.index) return false;

    if (!prev.getHash()) prev.calcHash(this._hashF);
    if (prev.getHash() !== block.lastHash) return false;

    if (!block.getHash()) block.calcHash(this._hashF);
    if (!block.getHash().endsWith(this.#difficulty)) return false;

    return true;
  }

  addNode(address) {
    const url = new URL(address);
    if (!url.toString()) return false;

    if (!this.nodes.has(url.toString())) {
      this.nodes.set(url.toString(), url);
    }
    return true;
  }

  async consensus() {
    const requests = Array.from(this.nodes.values()).map((url) => axios.get(url.toString() + NODE_CHAIN_ROUTE));
    const resps = await (await Promise.all(requests)).map((res) => res.data);
    resps.sort((prev, next) => next.length - prev.length);
    for (const ch of resps) {
      if (this.validateChain(ch)) {
        this.chain = ch.map((b) => Block.from(b));
        break;
      }
    }
    return this.chain;
  }

  validateChain(chain) {
    const chainLen = chain.length;
    let lastBlock = chain[0] instanceof Block ? chain[0] : Block.from(chain[0]);

    for (let i = 1; i < chainLen; i++) {
      const block = chain[i] instanceof Block ? chain[i] : Block.from(chain[i]);
      if (!this.#validateBlock(lastBlock, block)) return false;
      lastBlock = block;
    }
    return true;
  }

  toString() {
    return JSON.stringify(this.chain, null, 4);
  }

  toJSON() {
    return this.chain;
  }

  toObject() {
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
    this.currentBlock = null;

    return true;
  }

  setCurrentBlock(block) {
    this.currentBlock = block;
  }

  getCurrentBlock() {
    return this.currentBlock;
  }

  genNextEmptyBlock() {
    const prev = this.getLastBlock();
    return new Block(prev.getHash(), this.chain.length);
  }

  log() {
    console.log(this.chain.reduce((acc, b) => ({
      ...acc,
      [b.calcHash(this._hashF)]: b.toObject()
    }), {}));
  }

}

module.exports = Blockchain;
