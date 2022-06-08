
const action = async (req, res) => {
  if (req.query.hash) {
    const chain = JSON.parse(JSON.stringify(res.blockchain.chain));
    console.log(chain);
    const chainWithHashes = chain.map((b) => {
      console.log(JSON.stringify(b));
      b.__HASH__ = res.blockchain.hashBlock(JSON.stringify(b));
      return b;
    });
    return res.code(200).send(JSON.stringify(chainWithHashes));
  }
  res.code(200).send(JSON.stringify(res.blockchain.chain));
};

module.exports = action;
