const defaultErrors = require('../defaultErrors');
const { commonResProps } = require('./properties');

const schema = {
  description: 'Get balance of some wallet.',
  tags: ['Balance'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000' }
    },
    required: ['id']
  },
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
