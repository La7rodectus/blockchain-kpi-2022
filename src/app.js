require('dotenv').config();

const { appConfig, isProd } = require('./config');
const docs = require('./docs');

const app = require('fastify')(appConfig);

if (!isProd) app.register(require('fastify-swagger'), docs);

app.register(require('fastify-cors'));
app.register(require('./blockchain'));
app.register(require('./router'));

module.exports = app;
