const commonPostProps = {
  url: { type: 'string' }, //, minLength: 64, maxLength: 64 },
};

const commonResProps = {
  ...commonPostProps
};

module.exports = {
  commonPostProps,
  commonResProps
};
