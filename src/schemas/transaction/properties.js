const commonPostProps = {
  sender: { type: 'string', minLength: 64, maxLength: 64 },
  recipient: { type: 'string', minLength: 64, maxLength: 64 },
  amount: { type: 'integer', example: 2 }
};

const commonResProps = {
  ...commonPostProps
};

module.exports = {
  commonPostProps,
  commonResProps
};
