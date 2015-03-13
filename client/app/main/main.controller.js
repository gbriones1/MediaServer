'use strict';

angular.module('mediaServerApp')
  .controller('MainCtrl', function ($scope, $rootScope, $http, $timeout, Modal) {
    $scope.videos = [];
    $scope.paths = [];
    $scope.currentVideo = false;

    $http.get('/api/videos').success(function(response) {
      $scope.videos = response.videos;
      for (var videoIdx in $scope.videos){
        $scope.videos[videoIdx].tracks = getSubtitles($scope.videos[videoIdx]);
        if ($scope.paths.indexOf($scope.videos[videoIdx].path) == -1){
            $scope.paths.push($scope.videos[videoIdx].path);
        }
      }
    });

    $scope.getPathVideos = function(path){
        var videos = [];
        for (var videoIdx in $scope.videos){
            if ($scope.videos[videoIdx].path == path){
                videos.push($scope.videos[videoIdx]);
            }
        }
        return videos;
    }

    $scope.getLastFolderName = function(path) {
        return path.split("/")[path.split("/").length-1];
    }

    $scope.getPath = function(video){
        return video.path+"/"+video.filename;
    }

    var getSubtitles = function(video) {
        var subtitles = [];
        for (var subIdx in video.subtitles){
            var sub = video.subtitles[subIdx]
            var lang = sub.substring(sub.length-7).split(".")[0]
            var trueLang = "es"
            var label = "Español";
            switch(lang){
                case "spa":
                    trueLang = "es";
                    label = "Español";
                    break;
                case "eng":
                    trueLang = "en";
                    label = "English";
                    break;
            }
            subtitles.push({
                src: video.path+"/"+sub,
                lang: trueLang,
                label: label
            });
        }
        return subtitles;
    }

    $scope.selectVideo = function(video){
        $rootScope.currentVideo = video;
        var modalInstance = Modal.player();
    }

  });
