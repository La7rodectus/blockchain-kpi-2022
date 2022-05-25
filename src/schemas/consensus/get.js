const defaultErrors = require('../defaultErrors');

const schema = {
  description: 'Make consensus.',
  tags: ['Consensus'],
  response: {
    ...defaultErrors,
    200: { type: 'string' }
  }
};

module.exports = schema;
