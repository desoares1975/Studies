var http = require ('http');

var server = http.createServer(function (req, res) {
	res.writeHead(200, {"Cxontent-Type": "text/plain" });
	res.end("Hello, world"); 
});
console.log("Server running on port 8000");
server.listen(8000);
