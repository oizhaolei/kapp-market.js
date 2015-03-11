var config = require('./config.json');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var debug = require('debug')('my-application');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(config.repos.base_dir));


require('./router')(app);

app.use(function(req, res, next) {
    res.status(404).send('Page not found.');
});

app.set('port', config.port);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);

});
