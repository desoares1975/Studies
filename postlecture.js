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
  var name = req.params.name,
      getVar1 = req.query.getVar1,
      getVar2 = req.query.getVar2;

      res.render('hello', { name: name, getVar1: getVar1, getVar2: getVar2 });
});

app.listen(3000);
console.log('Server litening on port 3000');