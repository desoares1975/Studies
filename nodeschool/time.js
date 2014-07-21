var net  = require('net'),
	port = process.argv[2],
	date = new Date();

function leftZero(num) {
	return (num < 10 ? '0' : '') + num 
}

var month = leftZero(date.getMonth() + 1),
	day = leftZero(date.getDate()),
	hours = leftZero(date.getHours()),
	minutes = leftZero(date.getMinutes());

var	server = net.createServer(function (socket) {
		
		var data = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + '\n';
		socket.write(data);
		socket.end();
	});
	server.listen(port);