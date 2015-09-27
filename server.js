var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

var medium = require('./scrapers/medium-scraper');

app.use(bodyParser.json());

var router = express.Router();
app.use(router);

// Allow CORS
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/user/:username', medium.getUser);
app.get('/user/:username/info', medium.getUserInfo);
app.get('/posts/:tag/:limit', medium.getPostsByTag);

// Give a hello world response to all GET requests 
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

setInterval(function() {
	request('http://mediumapi-motaheri.rhcloud.com/', function (error, response, body) {
		if (error) {
			console.log(error);
		}
	});
}, 1800000 + 1800000*Math.random()); // every 30 minutes + [0-1] * 30 

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Medium API listening on ' + port);
});
