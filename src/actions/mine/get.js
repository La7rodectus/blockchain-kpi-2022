
const action = async (req, res) => {
  if (!res.blockchain.getCurrentBlock()) {
    res.blockchain.setCurrentBlock(res.blockchain.genNextEmptyBlock());
  }

  const currentBlock = res.blockchain.getCurrentBlock();
  res.blockchain.insertBlock(currentBlock);

  res.code(200).send(res.blockchain.getLastBlock());
};

module.exports = action;
