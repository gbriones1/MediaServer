'use strict';

angular.module('mediaServerApp')
  .controller('PlayerCtrl', function ($scope, $rootScope, $http, $window, $timeout) {
    $scope.currentVideo = $window.parent.angular.element($window.frameElement).scope().currentVideo;

  	$scope.getPath = function(video){
        return video.path+"/"+video.filename;
    }

    $scope.loadVideo = function() {
        $timeout(function(){
  		    videojs("videoId", {}, function(){
  		        this.load();
  		    });
        });
    }
    $scope.$watch('currentVideo', function() {
    	if ($scope.currentVideo){
	        $timeout(function(){
  			    videojs("videoId", {}, function(){
  			        this.load();
  			    });
	        });
    	}
   	});

  });