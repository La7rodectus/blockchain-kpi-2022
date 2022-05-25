const commonResProps = {
  index: { type: 'integer', example: 1 },
  timestamp: { type: 'integer', example: Date.now() },
  lastHash: { type: 'string', minLength: 64, maxLength: 64 },
  proof: { type: 'integer', example: 55 },
  transactions: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        sender: { type: 'string', minLength: 64, maxLength: 64 },
        recipient: { type: 'string', minLength: 64, maxLength: 64 },
        amount: { type: 'integer', example: 12 }
      }
    }
  }
};

module.exports = {
  commonResProps
};
