var http  = require('http'),
	fs    = require('fs'),
	port  = process.argv[2],
	fPath = process.argv[3];

server = http.createServer(function (req, res) {
	res.file = fs.createReadStream(fPath);
	console.log(res.file);
});
server.listen(port);
console.log('Server running on port ' + port);