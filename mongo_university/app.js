var express = require('express'),
	app = express(),
	cons = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/hello_express/views');

var mongoClient  = new MongoClient(new Server('localhost', 27017, { 'native_parser' : true }));

var db = mongoClient.db('course');

app.get('/', function (req, res) {
	db.collection('hello_mongo_express').findOne({}, function (err, doc) {
		res.render('hello', doc);
	});
});

app.get('*', function (req,res) {
	res.send('A página digitada ainda não existe!', 404);
});

mongoClient.open(function (err, mongoClient) {
	if (err) { throw err; }
	app.listen(8080);
	console.log('Express server listening on 8080');
});