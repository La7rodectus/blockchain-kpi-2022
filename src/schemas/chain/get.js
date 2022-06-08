const defaultErrors = require('../defaultErrors');
const { commonResProps } = require('./properties');

const schema = {
  description: 'Get full chain.',
  tags: ['Chain'],
  query: {
    type: 'object',
    properties: {
      hash: { type: 'boolean' }
    }
  },
  response: {
    ...defaultErrors,
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ...commonResProps
        }
      }
    }
  }
};

module.exports = schema;
