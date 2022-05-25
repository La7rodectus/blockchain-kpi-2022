const methods = require('./methods');
const urls = require('./routes');
const schemas = require('../schemas');
const actions = require('../actions');

const routes = [
  // add transaction to current block
  {
    method: methods.POST,
    url: urls.TRANSACTION,
    schema: schemas.transaction.post,
    handler: actions.transaction.post
  },
  {
    method: methods.GET,
    url: urls.MINE,
    schema: schemas.mine.get,
    handler: actions.mine.get
  },
  {
    method: methods.GET,
    url: urls.CHAIN,
    schema: schemas.chain.get,
    handler: actions.chain.get
  },
  {
    method: methods.POST,
    url: urls.NODE,
    schema: schemas.node.post,
    handler: actions.node.post
  }
];

const init = async (app) => routes.map((r) => app.route(r));

module.exports = init;
