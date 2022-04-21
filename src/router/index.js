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
  // {
  //   method: methods.GET,
  //   url: urls.MINE,
  //   schema: schemas.block.mine,
  //   handler: actions.block.mine
  // },
  // {
  //   method: methods.GET,
  //   url: urls.CHAIN,
  //   schema: schemas.chain.get,
  //   handler: actions.chain.get
  // }
];

const init = async (app) => routes.map((r) => app.route(r));

module.exports = init;
