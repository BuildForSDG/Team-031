import app from './app';
const logger = require('simple-node-logger').createSimpleLogger();

// store the port number
const port = parseInt(process.env.PORT, 10) || 4500;
app.listen(port, () => logger.info(`Zero hunger ready at ${port}`));