//retornando estatísticas de um arquivo
var fs = require('fs');
var myPathFile = '/home/desoares/projetos/Studies/professional_node/buffer.js';
fs.stat(myPathFile, function (err, statistics) {
	if (err) { throw err; }

	console.log(statistics, '- dados de buffer.js');
});

/*➤ stats.isFile()— Returns true if the fi le is a standard fi le and not a directory, a socket, a
     symbolic link, or a device.
➤ stats.isDirectory()—Returns true if the fi le is a directory.
➤ stats.isBlockDevice()—Returns true if the fi le is a device of the type block; in most
     UNIX systems this is generally under the /dev directory.
➤ stats.isCharacterDevice()—Returns true if the fi le is a device of the character type.
➤ stats.isSymbolicLink()—Returns true if the fi le is a symbolic link to another fi le.
➤ stats.isFifo()— Returns true if the fi le is a FIFO (a special kind of UNIX named pipe).
➤ stats.isSocket()—Returns true if the fi le is a UNIX domain socket.
*/

//abrindo um arquivo
var fs =require('fs');
fs.open(myPathFile, 'r', function (err, fd) {
	if (err) { throw err; }
	console.log(fd, '- valor de fd');
});

/*
➤ r—Opens the text fi le for reading. The stream is positioned at the beginning of the fi le.
➤ r+—Opens the fi le for reading and writing. The stream is positioned at the beginning of the
fi le.
➤ w—Truncates the fi le to zero length or creates a text fi le for writing. The stream is
     positioned at the beginning of the fi le.
➤ w+—Opens the fi le for reading and writing. The fi le is created if it does not exist. Otherwise
     it is truncated. The stream is positioned at the beginning of the fi le.
➤ a—Opens the fi le for writing. The fi le is created if it does not exist. The stream is
     positioned at the end of the fi le. Subsequent writes to the fi le will always end up at the
    current end of fi le.
➤ a+—Opens the fi le for reading and writing. The fi le is created if it does not exist. The
     stream is positioned at the end of the fi le. Subsequent writes to the fi le will always end up at
    the current end of file.
*/

//Lendo de um arquivo
//var fs = require('fs');
fs.open(myPathFile, 'r', function (err, fd) {
	if (err) { throw err; }

	var readBuf = new Buffer(1024),
		bufOffset = 0,
		bufLen = readBuf.length;
		filePosition = 100;

	fs.read(fd, readBuf, bufOffset, bufLen, filePosition, function (err, readBytes) {
		if (err) { throw err; }

		console.log('Valor de readBytes', readBytes);

		if (readBytes > 0) {
			console.log(readBuf.slice(0, readBytes));
		}
	});

});

//escrevendo em um arquivo
//var fs = require('fs');
fs.open(myPathFile, 'a', function abrerto(err, fd) {
	if (err) { throw err ;}

	var wBuf = new Buffer('//escrevendo este comentário'),
		bufPos = 0,
		bufLen = wBuf.length,
		filePosition = null;

		fs.write(fd, wBuf, bufPos, bufLen, null,
			function (err, escrito) {
				if (err) { throw err; }

				console.log('Escrevemos ', escrito, 'bytes');
			});
});

//fechando o arquivo
//var fs = require('fs');
function abreEscreve(wBuf, cb) {
	fs.open(myPathFile, 'a', function aberto(err, fd) {
		if (err) { return cb(err); }

		function notificaErro(err) {
			fs.close(fd, function () {
				cb(err);
			});
		}

		var bufOffSet = 0,
			bufLen = wBuf.length;

		fs.write(fd, wBuf, bufOffSet, bufLen, null, 
			function escreveu(err, escrito) {
				if (err) { return notificaErro(); }
				fs.close(fd, function () {
					cb(err);
				});
			});


	});
}

abreEscreve(
	new Buffer('//escrevendo um novo comentário n oarquivo!!!!'),
	function done(err) {
		if (err) {
			console.log('Algo deu errado', err.message);
			return;
		}
		console.log('Tarefa concluída com sucesso!!');
});