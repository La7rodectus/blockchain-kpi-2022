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
    const ins = obj.ins.map((tio) => TransactionIO.from(tio)) || [];
    const outs = obj.outs.map((tio) => TransactionIO.from(tio)) || [];
    t.bulkSetInOut(ins, outs);
    return t;
  }

  toJSON() {
    return this.toObject();
  }

  bulkSetInOut(ins, outs) {
    this.#ins = ins;
    this.#outs = outs;
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
    let acc = 0;
    for (const out of this.#outs) {
      if (!out.used && out.addr === addr) {
        outs.push(out);
        acc += +out.amount;
      }
    }
    // const change = this.#outs.reduce((acc, val) => {
    //   if (!val.used && val.addr === addr) {
    //     outs.push(val);
    //     return acc + val.amount;
    //   }
    // }, 0);
    return { change: acc || 0, outs };
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
