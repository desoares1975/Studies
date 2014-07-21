var express = require('express'),
	app = express(),
	cons = require('consolidate'),
	bodyParser = require('body-parser');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser());
//app.use(app.router);

function errorHandler(err, req, res, next) {
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function (req, res, next) {
	res.render('fruit_picker', {'fruits': ['apple', 'orange', 'banana', 'peach']})
});

app.post('/favorite_fruit', function (req, res, next) {
	var favorite = req.body.fruit;
	if (typeof favorite === 'undefined') {
		next(Error('PLease choose a fruit!'));
	} else {
		res.send('Your favorite fruit is ' + favorite);
	}
});

app.listen(3000);
console.log('Express server listening on 3000');