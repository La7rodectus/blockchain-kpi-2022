const { nanoid } = require('nanoid');

class TransactionIO {
  constructor(addr, amount, used = false, id = nanoid()) {
    this.addr = addr;
    this.amount = amount;
    this.id = id;
    this.used = used;
  }

  static from(obj) {
    return new TransactionIO(
      obj.addr,
      obj.amount,
      obj.id,
      obj.used,
    );
  }

  setUsed() {
    this.used = true;
  }

  toJSON() {
    return this.toObject();
  }

  toObject() {
    return {
      addr: this.addr,
      amount: this.amount,
      id: this.id,
      used: this.used,
    };
  }
}

module.exports = TransactionIO;
