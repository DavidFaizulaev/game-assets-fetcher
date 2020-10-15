'use strict';
const express = require('express');
const audit = require('express-requests-logger');
const openApiValidator = require('openapi-validator-middleware');
const logger = require('./service/logger');
const routes = require('./routes/gad-routes');
const errorHandler = require('./middlewares/error-handler');
const { SWAGGER_PATH } = require('./service/common-constants');

const validatorOptions = {
    framework: 'express',
    beautifyErrors: true
};

module.exports = async() => {
    const app = express();

    await openApiValidator.init(SWAGGER_PATH, validatorOptions);

    app.disable('x-powered-by');
    app.use(audit({
        logger: logger.child({ type: 'northbound' })
    }));
    app.use(routes);
    app.use(errorHandler.throwNotFoundError);
    app.use(errorHandler.handleError);

    return app;
};
