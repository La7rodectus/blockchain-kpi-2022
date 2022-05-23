
const action = async (req, res) => {
  res.blockchain.addNode(req.body.url);
  res.code(201).send({ url: req.body.url });
};

module.exports = action;
