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
	setInterval(function(){
		exec('sudo sh -c "echo ' + on ? 1 : 0 + ' >/sys/class/leds/led0/brightness"');
		on = !on;
	}, 1000);
});