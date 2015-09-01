'use strict';

var _ = require('lodash');
var Robot = require('./robot.model');

//Gets the current repl status
exports.status = function(req, res) {
};
//Post a command to the machine
exports.post = function(req, res) {
};

function handleError(res, err) {
  return res.status(500).send(err);
}
