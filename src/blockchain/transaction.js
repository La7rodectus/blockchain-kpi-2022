const TransactionIO = require('./transactionIO');

class Transaction {
  #sender;
  #recipient;
  #amount;
  #ins;
  #outs;

  constructor(sender, recipient, amount) {
    this.#sender = sender;
    this.#recipient = recipient;
    this.#amount = amount;
    this.#ins = [];
    this.#outs = [];
  }

  static from(obj) {
    const t = new Transaction(obj.sender, obj.recipient, obj.amount);
    obj.ins.forEach((tio) => t.addIn(tio));
    obj.outs.forEach((tio) => t.addOut(tio));
    return t;
  }

  toJSON() {
    return this.toObject();
  }

  toObject() {
    return {
      sender: this.#sender,
      recipient: this.#recipient,
      amount: this.#amount,
      ins: this.#ins.map((tio) => tio.toObject()),
      outs: this.#outs.map((tio) => tio.toObject())
    };
  }

  getChangeFor(addr) {
    const outs = [];
    const change = this.#outs.reduce((acc, val) => {
      if (!val.used && val.addr === addr) {
        outs.push(val);
        return acc + val.amount;
      }
    }, 0);
    return { change, outs };
  }

  addIn(addr, amount) {
    this.#ins.push(new TransactionIO(addr, amount));
  }

  addOutAsIn(out) {
    this.#ins.push(out);
  }

  addOut(addr, amount) {
    this.#outs.push(new TransactionIO(addr, amount));
  }

  getFields() {
    return Object.keys(this.toObject());
  }

}

module.exports = Transaction;
