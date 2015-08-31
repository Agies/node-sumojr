var five = require("johnny-five"),
		Raspi = require("raspi-io");

var board = new five.Board({
	io: new Raspi() 
});

board.on("ready", function(){
	var led = new five.Led("GPIO16");
	led.blink();
});