'use strict';

angular.module('robotServerApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.currentKey = '';
    $scope.keypress = function(event) {
      $scope.currentKey = event.which;
      if ($scope.currentKey == 119) {
        socket.socket.emit('forward');
      }
      if ($scope.currentKey == 115) {
        socket.socket.emit('backward');
      }
      if ($scope.currentKey == 97) {
        socket.socket.emit('left');
      }
      if ($scope.currentKey == 100) {
        socket.socket.emit('right');
      }
      if ($scope.currentKey == 32) {
        socket.socket.emit('stop');
      }
    };
    $scope.command = function(message) {
      socket.socket.emit(message);
    };
  });
