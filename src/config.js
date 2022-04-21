const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'testing';

const MAX_BODY_SIZE = 1024 * 1024 * 4;

const logLevel = () => {
  if (!isTest) {
    return { level: isProd ? 'warn' : 'info' };
  }
  return false;
};

const appConfig = {
  logger: logLevel(),
  bodyLimit: MAX_BODY_SIZE,
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      allowMatchingProperties: true
    }
  }
};

const domain = process.env.DOMAIN || 'localhost';

module.exports = {
  isProd,
  isTest,
  appConfig,
  domain
};
