const { version } = require('../../package');

const config = {
  routePrefix: '/',
  openapi: {
    info: {
      title: 'Blockchain KPI 2022',
      description: 'API doc for Blockchain KPI Project',
      version
    },
  },
  exposeRoute: true
};

module.exports = config;
