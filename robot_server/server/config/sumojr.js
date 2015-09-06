'use strict';

var five = require('johnny-five'),
		Raspi = require('raspi-io');
var sys = require('sys')
var exec = require('child_process').exec;
var child;
var on = true;
var rightServo, leftServo;

var board = new five.Board({
	io: new Raspi()
});

board.on('ready', function () {
	rightServo = new five.Servo.Continuous('GPIO18');
	leftServo = new five.Servo.Continuous('GPIO19');
	this.repl.inject({
		right: rightServo,
		left: leftServo,
	});
});
module.exports.forward = function() {
	rightServo.cw(1);
	leftServo.ccw(1);
}
module.exports.backward = function() {
	rightServo.ccw(1);
	leftServo.cw(1);
}
module.exports.left = function() {
	rightServo.cw(1);
	leftServo.cw(1);
}
module.exports.right = function() {
	rightServo.ccw(1);
	leftServo.ccw(1);
}
module.exports.stop = function() {
	rightServo.stop();
	leftServo.stop();
}
