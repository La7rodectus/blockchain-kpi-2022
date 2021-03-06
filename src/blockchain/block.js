const Transaction = require('./transaction');

class Block {
  #hash;
  #transactions;

  constructor(lastHash, index, transactions = [], timestamp = Date.now()) {
    this.index = index;
    this.lastHash = lastHash;
    this.timestamp = timestamp;
    this.proof = 0;

    const ok = transactions.every((t) => this.#isValidTransaction(t));
    if (!ok) throw new Error('Invalid transactions!');
    this.#transactions = transactions;
  }

  static from(obj) {
    const trnxs = obj.transactions.map((t) => (t instanceof Transaction ? this.toString() : Transaction.from(t)));
    const b = new Block(
      obj.lastHash,
      obj.index,
      trnxs,
      obj.timestamp
    );
    b.proof = obj.proof;
    return b;
  }

  #isValidTransaction(t) {
    if (!(t instanceof Transaction)) return false;

    return true;
  }

  toJSON() {
    return this.toObject();
  }

  toObject() {
    const transactions = this.#transactions.map((t) => t.toObject());
    return {
      index: this.index,
      lastHash: this.lastHash,
      timestamp: this.timestamp,
      proof: this.proof,
      transactions
    };
  }

  calcHash(hashF) {
    this.#hash = hashF(JSON.stringify(this));
    return this.getHash();
  }

  getHash() {
    return this.#hash;
  }

  addTransaction(t) {
    if (this.#hash) return false;
    if (!this.#isValidTransaction(t)) return false;

    return this.#transactions.push(t);
  }

  getTransactions() {
    return this.#transactions;
  }

  mine(endsWith, hashF) {
    while (!hashF(JSON.stringify(this)).endsWith(endsWith)) {
      this.proof++;
    }

    this.#hash = hashF(JSON.stringify(this));
    return this.proof;
  }

}

module.exports = Block;
