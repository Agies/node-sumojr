'use strict';

var bot = require("./sumojr");
var sys = require('sys');
var exec = require('child_process').exec;
var on = true;

module.exports = function(socket) {
  console.log('setting up board socket listeners');
  socket.on('forward', function(data){
    bot.forward();
  });
  socket.on('backward', function(data){
    bot.backward();
  });
  socket.on('stop', function(data){
    bot.stop();
  });
  socket.on('left', function(data){
    bot.left();
  });
  socket.on('right', function(data){
    bot.right();
  });
}

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