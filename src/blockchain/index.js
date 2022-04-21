const fp = require('fastify-plugin');

const crypto = require('crypto');

const Block = require('./block');
const Blockchain = require('./blockchain');

const sha256 = (str) => crypto.createHash('sha256').update(str).digest('hex');

const GENESIS_BLOCK = new Block('Palchyk', 0);

const blockchain = new Blockchain(sha256, GENESIS_BLOCK);


const init = async (fastify) => {
  fastify.decorateReply('blockchain', { getter: () => blockchain });
};

module.exports = fp(init);
