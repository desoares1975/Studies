//CRIANDO UM SERVIDOR TCP
var net = require('net');

net.createServer(function (socket) {
	//nova conexão
	socket.on('data', function (data) {
		//got data
		console.log(data);
	});
	socket.on('end', function (data) {
		console.log('Connection closed');
	});
	socket.write('Conexão TCP');
}).listen(4001);

/*
Because the server object is also an event emitter, and you can listen to events during its lifecycle,
net.Server emits the following events:
➤ “listening” — When the server is listening on the specified port and address.
➤ “connection” — When a new connection is established. The callback to this function will
         receive the corresponding socket object. You can also bind to this event by passing a func-
        tion to net.createServer(), like you did in the last example.
➤ “close” — When the server is closed, that is, it’s not bound to that port any more.
➤ “error” — When an error occurs at the server level. An error event happens, for instance,
         when you try to bind to an occupied port or to a port you don’t have permission to bind to.
*/

//Lifecycle example of a TCP server.
var server = require('net').createServer(),
	port = 4002;

server.on('listening', function () {
	console.log('Servidor escutando na porta', port);
});
server.on('connection', function (socket) {
	console.log('Há uma nova conexão no Servidor');
	socket.write('Escrevendo no brownser');
	socket.end();
	server.close();
});
server.on('close', function () {
	console.log('Servidor fechado.');
});
server.on('error', function () {
	console.log('Erro:', err.message);
});
server.listen(port);

//Usando o objeto Socket
var server = require('net'),
	quit = 'sair',
	byeBye = 'Adeus!';
server.createServer(function (socket) {
	console.log('Nova Conexão');
	socket.setEncoding('utf8');
	socket.write('Olá! Você já pode começar a digitar! Digite "' + quit + '" para sair.\n');
	socket.on('data', function (data) {
		console.log('dados: ', data.toString());
		if (data.trim().toLowerCase() === quit) {
			socket.write(byeBye);
			return socket.end();
		}
		socket.write(data);
	});
	socket.on('end', function () {
		console.log('Conexão concluída.');
	});
}).listen(4003);

//Usando pipe no soquete
var fs  = require('fs'),
	net = require('net');

var ws = fs.createWriteStream('buffer.js');
net.createServer(function (socket) {
	socket.pipe(ws);
}).listen(4004);

net.createServer(function (socket) {
	var rs = fs.createReadStream('hello.txt');
	rs.pipe(socket);
}).listen(4005);

//soquete ocioso
var net = require('net');
net.createServer(function (socket) {
	var fimDeTempo = 60000;
	socket.setTimeout(fimDeTempo);
	socket.on('fimDeTempo', function () {
		socket.write('Ocioso por tempo demais. Desconectando, adeus.');
		socket.end();
	});
}).listen(4006);

//Or, you can use this shorter form by passing the event listener in the second argument of socket
net.createServer(function (socket) {
	socket.setTimeout(60000, function () {
		socket.end('Ocioso por tempo demais. Desconectando, adeus.');
	});
}).listen(4007);

//Keep-Alive
var net = require('net');
net.createServer(function (socket) {
	//socket.setKeppAlive(true);
	//You can also specify the delay between the last packet received and the next keep-alive packet
	socket.setKeepAlive(true, 10000);
});
//The socket.setKeepAlive() setting periodically sends an empty packet to keep the connection alive

//Using Delay or No Delay
var net = require('net');
net.createServer(function (soquete) {
	soquete.setNoDelay(true);
});

//Listening for Client Connections
var net = require('net'),
	port2 = 5000,
	host = '127.0.0.1';
server = net.createServer(function (soq) {
	console.log(soq);
	soq.write('Tudo ok por hora!');
});
server.listen(port2, host);

//Closing the Server
var net = require('net'),
	server = net.createServer(function (soq) {
		soq.write('Conectado');
	});
server.listen(5001);
server.close();
server.on('close', function (data) {
	console.log('Servidor fechado', data);
});

//Handling Errors
var net = require('net'),
	server = net.createServer(function (soq) {
		soq.on('error', function (err) {
			soq.write('Erro:', err, err.code);
		});
	});
server.listen(5003);

//You can choose to catch uncaught exceptions — preventing your Node
//process from being terminated — by doing something like this:
server.on('uncaughtException', function (err) {
	console.log('Erro:', err);
});




//BUILDING A SIMPLE TCP CHAT SERVER
var net = require('net'),
	chatServer = net.createServer(),
	soqs = [],//armazena as conexões clientes
	porto = 6000;

chatServer.on('connection', function (soq) {
	console.log('New connecion on port: ', porto);
	soq.write('Nova conexão');
	soqs.push(soq);//adiciona cada uma das conexões no array
	soq.on('data', function (data) {
		console.log('got this data:', data);
		soqs.forEach(function (nSoq) {
			if(soq !== nSoq) {
				nSoq.write(data);
			}
		});
	});
	soq.on('close', function () {
		console.log('Server connection terminated.');
		var indice = soq.indexOf(soq);
		soqs.splice(indice, 1);//remove apenas a conexão certa
	});
});
chatServer.on('error', function (err) {
	console.log('Error occured', err.message);
});
chatServer.on('close', function () {
	console.log('Server connection terminated');
});
chatServer.listen(porto);