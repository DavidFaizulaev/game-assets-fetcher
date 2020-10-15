'use strict';
const gracefulShutdown = require('graceful-shutdown-express');
const logger = require('./logger');
const config = require('./config');

const registerShutdownEvent = (server) => {
    gracefulShutdown.registerShutdownEvent({
        server: server,
        newConnectionsTimeout: config.NEW_CONNECTIONS_TIMEOUT,
        shutdownTimeout: config.SHUTDOWN_TIMEOUT,
        events: ['SIGINT', 'SIGTERM'],
        logger: logger
    });
};

module.exports = {
    registerShutdownEvent
};
