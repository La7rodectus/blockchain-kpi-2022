const Transaction = require('../../blockchain/transaction');
const { sha256 } = require('../../lib/utils');

const action = async (req, res) => {
  if (!res.blockchain.getCurrentBlock()) {
    res.blockchain.setCurrentBlock(res.blockchain.genNextEmptyBlock());
  }

  const currentBlock = res.blockchain.getCurrentBlock();
  const t = new Transaction('0', sha256(process.env.NODE_ID), 1);
  t.addOut(sha256(process.env.NODE_ID), 1);
  currentBlock.addTransaction(t);
  res.blockchain.insertBlock(currentBlock);

  res.code(200).send(res.blockchain.getLastBlock());
};

module.exports = action;
