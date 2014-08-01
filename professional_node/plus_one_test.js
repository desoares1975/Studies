var spawn  = require('child_process').spawn;
//gera o filho usando o comando node para exec o arquivo
var child = spawn('node', ['plus_one.js']);
//chama a função uma vez por segundo
setInterval(function () {
	var number = Math.floor(Math.random() * 10000);
	//envia o número para o filho
	child.stdin.write(number, '\n');
	//recebe a resposta do filho e imprime
	child.stdout.once('data', function (data) {
		console.log('O filho respondeu para', number, 'com', data);
	});
}, 1000);

child.stderr.on('data', function (data) {
	process.stdout.write(data);
});