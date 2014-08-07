//escrevendo e lendo fluxos de dados
//esperando por dados

/*var streamLegivel = ...;
streamLegivel.on('data', function (data) {
	//data é um buffer
	console.log('dados recebidos ', data);
});

var streamLegivel2 = ...;
streamLegivel2.setEncoding('utf8');
streamLegivel2.on('data', function (data) {
	//data é um astring
	console.log('dados recebidos ', data)
});*/

//pausando e reiniciando o fluxo de dados

/*
streamLegivel.pause();
streamLegivel.resume();
*/

//sabendo quando o fuxo está terminado

/*var streamLegivel = ...;
streamLegivel.on('end', function () {
	console.log('O fluxo terinou.');
});*/

//USANDO STREAMS ESCREVIVEIS
//Escrevendo no stream
/*var writebleStream = ...;
writebleStream.write('Esta é uma sequência de caracteres codificada em UTF-8');//utf-8

var writebleStream64 = ...;
writebleStream64.write('7e3e4acde5ad240a8ef5e731e644fbd1', 'base64');//base64

var writebleStreamBuffer = ...;
var buf = new Buffer('Este é o conteúdo do buffer.');
writebleStreamBuffer.write(buf);// escrevendo um buffer*/

/*Waiting for a Stream to Drain
Because Node does not block on I/O, it does not block on read or write commands. As you’ve
seen, on write commands you know if the buffer was immediately flushed. If it was not flushed, it’s
stored in your process memory.
Later, when the stream manages to flush all the pending buffers, it emits a drain event that you can
listen to:*/
/*var writebleStream = ...;
writebleStream.on('drain', function () {
	console.log('drenagem emitida');
});
*/
//EXEMPLOS DE STREAM
//criando stream de sistema de arquivos
var fs = require('fs');
var rs = fs.createReadStream('/home/desoares/projetos/Studies/professional_node/buffer.js');
console.log(rs, '- valor de rs');

//usando um aqruivo que já esteja aberto
var fs = require('fs');
var path = '/home/desoares/projetos/Studies/professional_node/buffer.js';
fs.open(path, 'r', function (err, fd) {
	fs.createReadStream(null, {fd: fd, encoding: 'utf8'});
	//fs.on('data', console.log);
});

/*You can pass a second argument with options to fs.createReadableStream(), where you can
specify the start and end position on your fi le, the encoding, the flags, and the buffer size. Here are
the options arguments:
➤
encoding — The encoding of the strings emitted in “data” events, or null if you want raw
buffers.
➤ fd — If you already have an open fi le descriptor, you can pass it in here and the stream will
     assume it. Defaults to null.
➤ bufferSize — The size in bytes of the buffer of each chunk of the fi le to be read. Defaults
to 64KB.
➤
start — The fi le position of the fi rst byte to be read. Used to read a range of the fi le instead
of the whole file.
➤
end — The fi le position of the last byte to be read. Used to read a range of the fi le instead of
the whole file.
*/

/*Also, if you want to read just a segment of a file, you can use the start and end options. For instance,
for the stream to start at byte 10 and continue until the fi le ends:*/
var fs = require('fs'),
	path = '/home/desoares/projetos/Studies/professional_node/buffer.js',
	readStream = fs.createReadStream(path, {start: 10});

//Or if you want the fi le stream to stop reading at byte 20:
var fs = require('fs'),
	path = '/home/desoares/projetos/Studies/professional_node/buffer.js',
	readStream20 = fs.createReadStream(path, {end: 20});

//You can also create a file writable stream:
var fs = require('fs'),
	options = {},
	rs = fs.createWriteStream(path, options);
	fs.create
/*
fs.createWriteStream() also accepts a second argument with an options object that has these
default values:*/

var options = { flags: 'w',
encoding: null,
mode: 0666 }

/*➤ The flags option contains the flags to be used when opening the fi le, so all the flags
   accepted by fs.open() are valid here.
➤ The mode option specifies the permission mode the fi le will be opened with if the fi le has to
   be created.*/

//You can also use the encoding option to force a specific encoding. For instance, you can use the following
//to create a fi le writable stream that assumes UTF-8 encoding:
var fs = require('fs');
var rs = fs.createWriteStream(path, {encoding: 'utf8'});

//Understanding Networking Streams
/*Several kinds of streams are on the networking API of Node. For instance, a client TCP connection
is both a writable stream and a readable stream, and also is a server connection.
An HTTP request object is a readable stream. An HTTP response object is a writable stream.
Each of these stream types is covered in later chapters. For now, bear in mind that these stream
types have a common interface, which means that you can use some of these objects interchangeably
and also that you can abstract some problems and solve them only once. The slow client problem
(covered in the next section) is one of these problems.
*/

//AVOIDING THE SLOW CLIENT PROBLEM AND SAVING YOUR SERVER
/*Every time you have a process that reads some data and then has to send that data (or some
transformation of it) to another consumer, you have what’s usually called the slow client problem.
Understanding the Slow Client Problem
Node does not block while doing I/O. This means that Node does not block on reads or writes — it
buffers the data for you if the write cannot be flushed into the kernel buffers. Imagine this scenario:
You are pumping data into a writable stream (like a TCP connection to a browser), and your source
of data is a readable stream (like a fi le readable stream):
*/
var http = require('http');

http.createServer(function (req, res) {
	var rs = fs.createReadStream(path);
	rs.on('data', function (data) {
		res.write(data);
	});
	res.on('end', function () {
		res.end();
	});
}).listen(8000);

//evitando o problema do cliente lento
var http = require('http');
var path = '/home/desoares/projetos/Studies/professional_node/buffer.js';

http.createServer(function (req, res) {
	var rs = fs.createReadStream(path);
	rs.on('data', function (data) {
		if(!res.write(data)) {
			rs.pause();
		}
	});
	res.on('drain', function () {
		rs.resume();
	});
	rs.on('end', function () {
		res.end();
	});
}).listen(8080);

//usando pipe para resolver o problema do cliente lento

var http = require('http');

http.createServer(function (req, res) {
	var rs = fs.createReadStram(path);
	rs.pipe(res);
}).listen(8081);

/*
By default, end() is called on the destination when the readable stream ends. You can prevent that
behavior by passing in end: false on the second argument options object like this:
*/
var http = require('http');

http.createServer(function (req, res) {
	var rs = fs.createReadStream(path);
	rs.pipe(res, { end : false });
	rs.on('end', function () {
		res.write('Isso é tudo pessoal!');
		res.end();
	});
}).listen(8082);