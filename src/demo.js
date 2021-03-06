const crypto = require('crypto');

const Block = require('./blockchain/block');
const BlockChain = require('./blockchain/blockchain');
const Transaction = require('./blockchain/transaction');

const sha256 = (str) => crypto.createHash('sha256').update(str).digest('hex');

const GENESIS_BLOCK = new Block('Palchyk', 0);

const b = new BlockChain(sha256, GENESIS_BLOCK);

function addBlockTiChain() {
  const prev = b.getLastBlock();
  b.insertBlock(new Block(prev.getHash(), prev.index + 1));
}

addBlockTiChain();
addBlockTiChain();
addBlockTiChain();
addBlockTiChain();

const prev = b.getLastBlock();
const t = new Transaction('hash', 'hash', 12);
const newBlock = new Block(prev.getHash(), prev.index + 1);
newBlock.addTransaction(t);
b.insertBlock(newBlock);

b.addNode('http://localhost:3001');
b.addNode('http://localhost:3002');

(async () => {
  await console.log('valid chain:', await b.consensus());
  b.log();
})();
