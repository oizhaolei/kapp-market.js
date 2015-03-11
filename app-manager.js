var config = require('./config.json');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.mongodb);

var apps = db.get('apps');
var apks = db.get('apks');

exports.getDeployedApps = function(since_update_date, callback) {
  apps.find({
    "deploy" : true,
    lastupdated : {
      $gt : new Date(since_update_date)
    }
  }, {
    "sort": "appname"
  }, function(e, o) {
    callback(o);
  });
};

exports.getApp = function(id, callback) {
  apps.findOne({
    _id : id
  }, function(e, app){
    apks.find({
      app_id : id
    }, {}, function(e, apks){
      callback(app, apks);
    });
  });
};
