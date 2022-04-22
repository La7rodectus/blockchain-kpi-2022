
const action = async (req, res) => {
  res.code(200).send(res.blockchain.toObject());
};

module.exports = action;
