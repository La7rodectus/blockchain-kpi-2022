class Transaction {
  #sender;
  #recipient;
  #amount;

  constructor(sender, recipient, amount) {
    this.#sender = sender;
    this.#recipient = recipient;
    this.#amount = amount;
  }

  toJSON() {
    return this.toObject();
  }

  toObject() {
    return {
      sender: this.#sender,
      recipient: this.#recipient,
      amount: this.#amount
    };
  }

  getFields() {
    return Object.keys(this.toObject());
  }

}

module.exports = Transaction;
