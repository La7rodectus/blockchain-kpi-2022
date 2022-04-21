const defaultErrors = require('../defaultErrors');
const { commonResProps } = require('./properties');

const schema = {
  description: 'Mine current block.',
  tags: ['Mine'],
  response: {
    ...defaultErrors,
    200: {
      type: 'object',
      properties: {
        ...commonResProps
      }
    }
  }
};

module.exports = schema;
