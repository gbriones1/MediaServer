/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var fs = require('fs'),
  path = require('path');

var isVideoFile = function(filename){
  if (["mkv", "mp4", "webm"].indexOf(filename.split(".")[filename.split(".").length-1])+1){
    return true
  }
  return false
}

var getSubtitles = function(path, filename){
  var subtitles = [];
  var filenameList = filename.split(".");
  filenameList.pop();
  var basename = filenameList.join(".");
  var common = fs.readdirSync("client/"+path).filter(function(file){
    return file.indexOf(basename) > -1
  });
  for (var fileIdx in common){
    if (common[fileIdx].split(".")[common[fileIdx].split(".").length-1] == "srt"){
      subtitles.push(common[fileIdx]);
    }
  }
  return subtitles;
}

var getVideoFiles = function(path){
  var videosList = [];
  // console.log("Looking for files in: "+path)
  for (var index in fs.readdirSync("client/"+path)){
    var file = fs.readdirSync("client/"+path)[index];
    if (fs.statSync("client/"+path+'/'+file).isDirectory()){
      // console.log("Directory found: "+path+'/'+file)
      videosList.push.apply(videosList, getVideoFiles(path+'/'+file));
    }
    else{
      if (isVideoFile(file)){
        // console.log("Video found: "+path+'/'+file)
        videosList.push({
          path: path,
          filename: file,
          subtitles:getSubtitles(path, file)
        });
      }
    }
  }
  // console.log("Total videos in path: "+path);
  // console.log(videosList)
  return videosList
}

// Get list of things
exports.index = function(req, res) {
  var path = "assets/videos";
  return res.json(200, {videos:getVideoFiles(path)})
};

// Get a single thing
exports.show = function(req, res) {
  return res.json(200, {video:{}})
};

function handleError(res, err) {
  return res.send(500, err);
}