const Transaction = require('../../blockchain/transaction');

const action = async (req, res) => {
  if (!res.blockchain.getCurrentBlock()) {
    res.blockchain.setCurrentBlock(res.blockchain.genNextEmptyBlock());
  }

  const currentBlock = res.blockchain.getCurrentBlock();
  const t = new Transaction(req.body.sender, req.body.recipient, req.body.amount);

  try {
    currentBlock.addTransaction(t);
  } catch (err) {
    res.code(400).send({ error: 'Error adding transaction!' });
  }
  res.code(201).send(t);
};

module.exports = action;
