'use strict';

angular.module('mediaServerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/player', {
        templateUrl: 'app/player/player.html',
        controller: 'PlayerCtrl'
      });
  });