const Block = require('../../blockchain/block');
const Transaction = require('../../blockchain/transaction');

const action = async (req, res) => {

  res.blockchain;
  res.code(201).send('done');
};

module.exports = action;
