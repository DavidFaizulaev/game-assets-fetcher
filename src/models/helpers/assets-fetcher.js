const JSZip = require('jszip');
const logger = require('../../service/logger');
const { ASSETS_DIRECTORY_URL } = require('../../service/config');
const { getGameAsset } = require('../../service/request-sender');

function assetsFetcher(res, gameAssetsData) {
    const requestsArray = [];
    const zip = new JSZip();
    const gameFolder = zip.folder(`${gameAssetsData.name}_assets`);
    let imagesFolder, gameplayFolder, soundtrackFolder;

    if (gameAssetsData.icon) {
        imagesFolder = gameFolder.folder('images');
        requestsArray.push(handleGameAssetData(gameAssetsData.name, gameAssetsData.icon, imagesFolder));
    }

    if (gameAssetsData.soundtrack) {
        soundtrackFolder = gameFolder.folder('audio');
        requestsArray.push(handleGameAssetData(gameAssetsData.name, gameAssetsData.soundtrack, soundtrackFolder));
    }

    if (gameAssetsData.gameplay.length > 0) {
        gameplayFolder = gameFolder.folder('videos');
        gameAssetsData.gameplay.forEach(gameplayFile => {
            requestsArray.push(handleGameAssetData(gameAssetsData.name, gameplayFile, gameplayFolder));
        });
    }

    return ({ zip, requestsArray });
}

const handleGameAssetData = async function (gameName, assetName, assetFolder) {
    const requestUrl = `${ASSETS_DIRECTORY_URL}${gameName}/${assetName}`;

    const getGameAssetResponse = await getGameAsset(requestUrl);
    if (getGameAssetResponse.status === 200) {
        logger.debug('successfully fetched game asset');
        assetFolder.file(assetName, getGameAssetResponse.data);
    }

    return assetFolder;
};

module.exports = {
    assetsFetcher
};
