const config = {
    APP_NAME: 'game-assets-downloader',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    PORT: process.env.PORT || 3000,
    ASSETS_DIRECTORY_URL: process.env.ASSETS_DIRECTORY_URL,
    // Shutdown
    NEW_CONNECTIONS_TIMEOUT: process.env.NEW_CONNECTIONS_TIMEOUT || 7500,
    SHUTDOWN_TIMEOUT: process.env.SHUTDOWN_TIMEOUT || 10000,
    KEEP_ALIVE_TIMEOUT: Number(process.env.KEEP_ALIVE_TIMEOUT || 120000)
};

module.exports = config;
