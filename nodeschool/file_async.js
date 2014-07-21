var fs = require('fs'),
	file = process.argv[2];


fs.readFile(file, function (err, data) {
	
	if(err) { throw err; }
	var useMe = data.toString().split('\n').length -1;
	console.log(useMe);

});