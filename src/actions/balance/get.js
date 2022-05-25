const action = async (req, res) => {
  const [balance] = res.blockchain.getBalanceOf(req.params.id);
  res.code(200).send({ balance });
};

module.exports = action;
