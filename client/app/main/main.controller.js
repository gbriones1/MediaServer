'use strict';

angular.module('mediaServerApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
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

    // $scope.isFile = function(video){
    //     if (typeof(video) == typeof("")){
    //         return true
    //     }
    //     return false
    // }

    // $scope.getSubvideosList = function(directory){
    //     return directory[Object.keys(directory)[0]];
    // }

    $scope.getPathVideos = function(path){
        var videos = [];
        for (var videoIdx in $scope.videos){
            if ($scope.videos[videoIdx].path == path){
                videos.push($scope.videos[videoIdx]);
            }
        }
        return videos;
    }

    // $scope.getDirectoryName = function(directory){
    //     return Object.keys(directory)[0];
    // }

    $scope.getLastFolderName = function(path) {
        return path.split("/")[path.split("/").length-1];
    }

    // $scope.getFileName = function(filepath){
    //     var nameList = filepath.split("/")[filepath.split("/").length-1].split(".");
    //     nameList.pop();
    //     return nameList.join(".")
    // }

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
        var previousVideo = angular.copy($scope.currentVideo);
        $scope.currentVideo = video;
        if (previousVideo){
            // $('#videoId_html5_api').attr('src', $scope.getPath(video));
            // $('video').attr('src', $scope.getPath(video));
        }
        $timeout(function(){
            $('iframe').attr('src', $('iframe').attr('src'));
            // $('video').mediaelementplayer({
            //     features: ['playpause','progress','current','duration','tracks','volume','fullscreen'],
            //     success: function(mediaElement, originalNode){}
            // });
            // videojs("videoId", {}, function(){
            //     this.load();
            // });
        });
    }

    // $scope.reloadVideo = function(){
    //     videojs("videoId", {}, function(){
    //         setTimeout(this.load(), 1000);
    //     });
    // }

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
  });
