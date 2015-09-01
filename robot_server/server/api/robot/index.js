'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.status);
router.post('/', controller.post);

module.exports = router;
