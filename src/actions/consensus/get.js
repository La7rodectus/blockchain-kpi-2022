
const action = async (req, res) => {
  await res.blockchain.consensus();

  res.code(200).send(JSON.stringify(res.blockchain.chain));
};

module.exports = action;
