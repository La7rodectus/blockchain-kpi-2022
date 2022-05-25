require('dotenv').config();

const app = require('./app');
const { isProd } = require('./config');

app.listen(process.env.PORT || 3000, '::', (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  if (!isProd) app.swagger();
});
