const errorSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' }
  }
};

const defaultErrors = {
  400: errorSchema,
  401: errorSchema,
  403: errorSchema,
  404: errorSchema,
  500: errorSchema
};

module.exports = defaultErrors;
