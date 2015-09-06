var five = require("johnny-five"),
		Raspi = require("raspi-io");
var sys = require('sys')
var exec = require('child_process').exec;
var child;
var on = true;
var rightServo, leftServo;

var board = new five.Board({
	io: new Raspi()
});

board.on("ready", function () {
	rightServo = new five.Servo.Continuous("GPIO18");
	leftServo = new five.Servo.Continuous("GPIO19");
	rightServo.cw(1);
	leftServo.ccw(1);
	this.repl.inject({
		right: rightServo,
		left: leftServo,
		stop: stop
	});
	signalReady();
});
function stop() {
	rightServo.stop();
	leftServo.stop();
}
function signalReady() {
	setInterval(function () {
		exec('sudo sh -c "echo ' + (on ? 1 : 0) + ' >/sys/class/leds/led0/brightness"',
			function (error, stdout, stderr) {
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
		on = !on;
	}, 1000);
}
