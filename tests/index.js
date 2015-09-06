var five = require("johnny-five"),
		Raspi = require("raspi-io");
var sys = require('sys')
var exec = require('child_process').exec;
var child;
var on = true;
var board = new five.Board({
	io: new Raspi() 
});

board.on("ready", function(){
	var rightServo = new five.Servo.Continuous("GPIO18");
	var leftServo = new five.Servo.Continuous("GPIO19");
	rightServo.ccw(1);
	leftServo.cw(1);
	this.repl.inject({
	  right: rightServo,
	  left: leftServo
	});
	signalReady();
});

function signalReady() {
	setInterval(function(){
		exec('sudo sh -c "echo ' + (on ? 1 : 0) + ' >/sys/class/leds/led0/brightness"', 
			function(error, stdout, stderr) {
  			if (error !== null) {
    			console.log('exec error: ' + error);
			  }
		});
		on = !on;
	}, 1000);
}
