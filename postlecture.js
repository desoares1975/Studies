var express = require('express'),
    app = express(),
    cons = require('consolidate');
     
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router);

// Handler fo internal server errorOrCloseHandler(_server)
function errorHandler(err, req, res, next) {
  console.log(err.message);
  console.log(err.stack);
  res.status(500);
  res.render('error_template', { error: err });
}

app.use(errorHandler);

app.get('/', function (req, res, next) {
      res.render('fruitpicker', { 'fruits': ['apple', 'orange', 'banana', 'peach'] });
});
app.post('/favorite_fruit', function (req, res, next)   {
  var favorite = req.body.fruit;
  if (typeof favorite == 'undefined') {
    next(Error('Please coose a fruit'));
  } else {
    res.send('Your favorite fruit is ' + favorite);
  }
});
app.listen(3000);
console.log('Server litening on port 3000');