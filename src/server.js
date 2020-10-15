const app = require('./app');
const config = require('./service/config');
const logger = require('./service/logger');
const gracefulShutdown = require('./service/graceful-shutdown');

app().then(app => {
    const server = app.listen(config.PORT, () => logger.info(`app listening on port ${config.PORT}`));

    server.keepAliveTimeout = config.KEEP_ALIVE_TIMEOUT;
    gracefulShutdown.registerShutdownEvent(server);

    process.on('uncaughtException', function (reason) {
        logger.error('Possibly Uncaught Exception at: ', reason);
    });

    process.on('unhandledRejection', function (reason, p) {
        logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    });
}).catch(e => {
    logger.error(`Encountered an error during start up ${e}`);
    process.exit(1);
});
