const fp = require('fastify-plugin');
const { sha256 } = require('../lib/utils');

const Block = require('./block');
const Blockchain = require('./blockchain');

const GENESIS_BLOCK = new Block('Palchyk', 0);

const blockchain = new Blockchain(sha256, GENESIS_BLOCK);

const init = async (fastify) => {
  fastify.decorateReply('blockchain', { getter: () => blockchain });
};

module.exports = fp(init);
