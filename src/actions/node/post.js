
const action = async (req, res) => {
  res.blockchain.addNode(req.body.origin);
  res.code(201).send({ origin: req.body.origin });
};

module.exports = action;
