'use strict';

const express = require('express');
const router = express.Router();
const downloaderModel = require('../models/assets-downloader');

router.route('/download/:id').get(downloaderModel);

module.exports = router;
