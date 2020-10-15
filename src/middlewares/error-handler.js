'use strict';
const httpStatusCodes = require('http-status-codes');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpStatusCodes;
const boom = require('@hapi/boom');
const { InputValidationError } = require('openapi-validator-middleware');
const logger = require('../service/logger');

const handleError = (error, req, res, next) => {
    let errorMessage, errorResponseCode;

    const stack = error && error.stack;

    if (!error) {
        logger.error(error, 'Encountered error without valid structure');
        errorMessage = httpStatusCodes.getStatusText(INTERNAL_SERVER_ERROR);
        errorResponseCode = INTERNAL_SERVER_ERROR;
    } else if (error.isBoom) {
        errorMessage = error.output.payload.message;
        errorResponseCode = error.output.statusCode;
    } else if (error instanceof InputValidationError) {
        errorMessage = error.errors;
        errorResponseCode = BAD_REQUEST;
    } else {
        // unexpected errors
        errorMessage = httpStatusCodes.getStatusText(INTERNAL_SERVER_ERROR);
        errorResponseCode = INTERNAL_SERVER_ERROR;
    }

    logger.error(req.context, JSON.stringify({
        response: errorMessage, stack: stack
    }));

    res.status(errorResponseCode);
    res.json({ message: errorMessage });
};

const throwNotFoundError = (req, res, next) => {
    const notFoundError = boom.notFound(`Requested path was not found - Method: ${req.method} Path: ${req.url}`);
    handleError(notFoundError, req, res, next);
};

module.exports = {
    handleError,
    throwNotFoundError
};
