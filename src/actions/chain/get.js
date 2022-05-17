
const action = async (req, res) => {
  res.code(200).send(JSON.stringify(res.blockchain.chain));
};

module.exports = action;
