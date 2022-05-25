const Transaction = require('../../blockchain/transaction');

const action = async (req, res) => {
  if (!res.blockchain.getCurrentBlock()) {
    res.blockchain.setCurrentBlock(res.blockchain.genNextEmptyBlock());
  }

  const currentBlock = res.blockchain.getCurrentBlock();
  const t = new Transaction(req.body.sender, req.body.recipient, req.body.amount);
  const [senderBalance, outs] = res.blockchain.getBalanceOf(req.body.sender);
  if (senderBalance < req.body.amount) res.code(400).send();
  outs.forEach((tio) => {
    t.addOutAsIn(tio);
    tio.setUsed();
  });
  const change = senderBalance - req.body.amount;
  t.addOut(req.body.recipient, req.body.amount);
  t.addOut(req.body.sender, change);
  try {
    currentBlock.addTransaction(t);
  } catch (err) {
    res.code(400).send({ error: 'Error adding transaction!' });
  }
  res.code(201).send(JSON.stringify(t));
};

module.exports = action;
