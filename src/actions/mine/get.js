const Transaction = require('../../blockchain/transaction');
const { sha256 } = require('../../lib/utils');

const action = async (req, res) => {
  if (!res.blockchain.getCurrentBlock()) {
    res.blockchain.setCurrentBlock(res.blockchain.genNextEmptyBlock());
  }

  const currentBlock = res.blockchain.getCurrentBlock();
  currentBlock.addTransaction(new Transaction(
    '0',
    sha256(process.env.NODE_ID),
    1
  ));
  res.blockchain.insertBlock(currentBlock);

  res.code(200).send(res.blockchain.getLastBlock());
};

module.exports = action;
