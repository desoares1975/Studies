var http = require('http'),
	bl 	 = require('bl'),
	url  = process.argv[2];

http.get(url, function (res) {
	res.pipe(bl(function (err, data) {
		if (err) { throw err; }
		data = data.toString();
		console.log(data.length);
		console.log(data);
	}));
});