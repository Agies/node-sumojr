'use strict';

var five = require('johnny-five'),
    Raspi = require('raspi-io'),
    board,
    motors = {},
    blinkers = {
      left: null,
      right: null
    },
    on = true;
var sys = require('sys')
var exec = require('child_process').exec;
board = new five.Board({
  //port: ""
});

board.on('ready', function() {
  setInterval(function(){
		exec('sudo sh -c "echo ' + (on ? 1 : 0) + ' >/sys/class/leds/led0/brightness"', 
			function(error, stdout, stderr) {
  			if (error !== null) {
    			console.log('exec error: ' + error);
			  }
		});
		on = !on;
	}, 1000);
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
  motors.motor1 = new five.Motor(configs.M1); 
  motors.motor2 = new five.Motor(configs.M2);
  motors.motor3 = new five.Motor(configs.M3);
  motors.motor4 = new five.Motor(configs.M4);
  console.log('board ready, created motors');
});

var rBoard = new five.Board({
	io: new Raspi()
});
rBoard.on("ready", function(){
  blinkers.left = new five.Led({
    pin: "GPIO16",
    board: rBoard
  });
  blinkers.right = new five.Led({
    pin: "GPIO13",
    board: rBoard
  });
	console.log('raspi board ready');
});
function blinker(led) {
  for (var key in blinkers) {
    if (blinkers.hasOwnProperty(key)) {
      var element = blinkers[key];
      if (led && led.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        element.strobe();
      } else {
        element.stop().off();
      }
    }
  }
}
module.exports = function(socket) {
  console.log('setting up board socket listeners');
  socket.on('forward', function(data){
    motors.motor1.forward(255);
    motors.motor2.forward(255);
    motors.motor3.forward(255);
    motors.motor4.forward(255);
    blinker();
  });
  socket.on('backward', function(data){
    motors.motor1.reverse(125);
    motors.motor2.reverse(125);
    motors.motor3.reverse(125);
    motors.motor4.reverse(125);
    blinker("left:right");
  });
  socket.on('stop', function(data){
    motors.motor1.stop();
    motors.motor2.stop();
    motors.motor3.stop();
    motors.motor4.stop();
    blinker();
  });
  socket.on('left', function(data){
    motors.motor1.reverse(125);
    motors.motor2.reverse(125);
    motors.motor3.forward(125);
    motors.motor4.forward(125);
    blinker("left");
  });
  socket.on('right', function(data){
    motors.motor1.forward(125);
    motors.motor2.forward(125);
    motors.motor3.reverse(125);
    motors.motor4.reverse(125);
    blinker("right");
  });
}
