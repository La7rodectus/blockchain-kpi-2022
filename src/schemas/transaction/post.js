const defaultErrors = require('../defaultErrors');
const { commonResProps, commonPostProps } = require('./properties');

const schema = {
  description: 'Add new transaction to current block.',
  tags: ['Transaction'],
  body: {
    type: 'object',
    properties: {
      ...commonPostProps
    },
    required: Object.keys(commonPostProps)
  },
  response: {
    ...defaultErrors,
    201: {
      type: 'object',
      properties: {
        ...commonResProps
      }
    }
  }
};

module.exports = schema;
