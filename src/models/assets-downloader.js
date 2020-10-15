'use strict';
const httpStatusCodes = require('http-status-codes');
const { NO_CONTENT, NOT_FOUND } = httpStatusCodes;
const fs = require('fs');
const { find } = require('lodash');
const assetsData = require('../data/assets.json');
const { assetsFetcher } = require('./helpers/assets-fetcher');
const logger = require('../service/logger');

const downloaderModel = async (req, res, next) => {
    const { params, headers } = req;
    const gameId = params.id;

    res.setHeader('Access-Control-Allow-Origin', headers.origin);

    const gameAssetsObject = find(assetsData, function(gameData) { return gameData.id === gameId });
    if (!gameAssetsObject) {
        logger.info(`game id: ${gameAssetsObject} could not be found`);
        res.status(NOT_FOUND).end();
    }

    const gameHasAssets = (gameAssetsObject.gameplay || gameAssetsObject.soundtrack || gameAssetsObject.icon);

    if (!gameHasAssets) {
        logger.info(`game id: ${gameAssetsObject} has no game assets`);
        res.status(NO_CONTENT).end();
    }

    const fetcherObject = assetsFetcher(res, gameAssetsObject);

    await Promise.all(fetcherObject.requestsArray);

    res.setHeader('Content-disposition', 'attachment; filename=game-assets.zip');
    res.setHeader('Content-type', 'application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip');

    fetcherObject.zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createReadStream('out.zip').pipe(res))
        .on('finish', function () {
        // JSZip generates a readable stream with a "end" event,
        // but is piped here in a writable stream which emits a "finish" event.
            logger.info('file was written out successfully');
            res.end();
        });
};

module.exports = downloaderModel;
