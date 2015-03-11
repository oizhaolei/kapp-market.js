var config = require('./config.json');
var modelAppManager = require('./app-manager');

module.exports = function (app) {

  app.get('/apps', function(req, res) {
    var last_query_time = req.query.last_query_time;
    modelAppManager.getDeployedApps(last_query_time, function(apps){
      res.status(200).send(apps);
    });
  });

  app.get('/app', function(req, res) {
    var appid = req.query.id;
    modelAppManager.getApp(appid, function(app, apks){
      res.status(200).send({
        "app" : app,
        "apks" : apks
      });
    });
  });
};
