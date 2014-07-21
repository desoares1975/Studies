var express = require('express'),
	app = express(),
	cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
	res.render('hello', { 'name' : 'Humagous!' });
});

app.get('*', function (req,res) {
	res.send('A página digitada ainda não existe!', 404);
});
app.listen(8080);
console.log('Express server listening on 8080');