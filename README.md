# Q-Fetcher

* [Overview](#overview)
* [Running the service locally](#running-the-service-locally)
* [Running tests](#running-tests)

## Overview

Th services fetches game assets based on a locally stored data file (under `data/`) directory. The service receives a game id and starts retrieving the assets.
The service returns a zip file, inside which will be a folder named convention `<game_name>_assets`. Under said folder, will be the game assets, can be images, audio and gameplay.
Please note that in case a game does not have one of the assets mentioned, a folder will no be created.

The service exposes a single endpoint `GET /download/:game_id`. Please view swagger file under `docs/` directory for information regarding request and response.

## Running the service locally via terminal

### Mandatory environment variables

    ASSETS_DIRECTORY_URL: url from where game assets will be fetched.

### Optional environment variables

    APP_NAME: default is 'game-assets-downloader'
    PORT: default is `3000`
    LOG_LEVEL: default is `INFO`
    PROCESSING_TIMEOUT: default 30000 (if timeout is exceeded then 408 Request Timeout response is returned)

In terminal:

1. install all required modules using `npm i`
2. call `npm run start`

## Running service using Dockerfile

```shell
docker build --network host -t game-assets-fetcher-image .
docker run -d --network=host -p 3000:3000 --name game-assets-downloader game-assets-fetcher-image
```
