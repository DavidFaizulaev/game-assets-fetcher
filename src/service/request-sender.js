const axios = require('axios');
const logger = require('./logger');
const client = axios.create();

const getGameAsset = async function(url) {
    const requestOptions = {
        method: 'GET',
        url,
        responseType: 'stream'
    };

    try {
        return await client.request(requestOptions);
    } catch (error) {
        logger.error(`failed to get game asset from ${url}`, error);
        return error;
    }
};

module.exports = {
    getGameAsset
};
