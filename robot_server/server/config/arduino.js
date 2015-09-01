'use strict';

var five = require('johnny-five'),
    board,
    motors = {};
board = new five.Board({
  //port: ""
});

board.on('ready', function() {
  var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
  motors.motor1 = new five.Motor(configs.M1); 
  motors.motor2 = new five.Motor(configs.M2);
  motors.motor3 = new five.Motor(configs.M3);
  motors.motor4 = new five.Motor(configs.M4);
  console.log('board ready, created motors');
});

module.exports = function(socket) {
  console.log('setting up board socket listeners');
  socket.on('forward', function(data){
    motors.motor1.forward(255);
    motors.motor2.forward(255);
    motors.motor3.forward(255);
    motors.motor4.forward(255);
  });
  socket.on('backward', function(data){
    motors.motor1.reverse();
    motors.motor2.reverse();
    motors.motor3.reverse();
    motors.motor4.reverse();
  });
  socket.on('stop', function(data){
    motors.motor1.stop();
    motors.motor2.stop();
    motors.motor3.stop();
    motors.motor4.stop();
  });
  socket.on('left', function(data){
    motors.motor1.reverse();
    motors.motor2.reverse();
    motors.motor3.forward();
    motors.motor4.forward();
  });
  socket.on('right', function(data){
    motors.motor1.forward();
    motors.motor2.forward();
    motors.motor3.reverse();
    motors.motor4.reverse();
  });
}
