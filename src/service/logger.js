'use strict';

const { APP_NAME, LOG_LEVEL } = require('./config');
const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    name: APP_NAME,
    src: false,
    streams: [
        {
            level: LOG_LEVEL,
            stream: process.stdout
        },
        {
            level: 'error',
            stream: process.stderr
        }
    ]
});
