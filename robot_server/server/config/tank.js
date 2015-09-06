'use strict';

var five = require('johnny-five'),
  Raspi = require('raspi-io'),
  bot = require("./sumojr"),
  board,
  motors = {},
  blinkers = {
    left: null,
    right: null
  },
  on = true;
board = new five.Board({
  //port: ""
});

board.on('ready', function () {
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
rBoard.on("ready", function () {
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
module.exports.forward = function (data) {
  motors.motor1.forward(255);
  motors.motor2.forward(255);
  motors.motor3.forward(255);
  motors.motor4.forward(255);
  blinker();
};
module.exports.backward = function (data) {
  motors.motor1.reverse();
  motors.motor2.reverse();
  motors.motor3.reverse();
  motors.motor4.reverse();
  blinker("left:right");
};
module.exports.stop = function (data) {
  motors.motor1.stop();
  motors.motor2.stop();
  motors.motor3.stop();
  motors.motor4.stop();
  blinker();
};
module.exports.left = function (data) {
  motors.motor1.forward();
  motors.motor2.forward();
  motors.motor3.reverse();
  motors.motor4.reverse();
  blinker("left");
};
module.exports.right = function (data) {
  motors.motor1.reverse();
  motors.motor2.reverse();
  motors.motor3.forward();
  motors.motor4.forward();
  blinker("right");
};