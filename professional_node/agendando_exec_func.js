var oneSecond = 1000;
//usando timeout
var timeout = setTimeout(function () {
	console.log('O tempo acabou!');
}, oneSecond);

var tickEveryOneSec = setInterval(function () {
	console.log('passou um segundo')
}, oneSecond);

//parando a execução do timeout
var endTime = setTimeout(function () {
	console.log('este texto nunca aparecerá na tela')
}, oneSecond);
clearTimeout(endTime);//imprede que  end time execute

//parando a execuçao de um setInterval
clearInterval(tickEveryOneSec);

//fazendo o programa esperar até o próximo tick do node
process.nextTick(function () {
	console.log('Ficou esperando até o tick sequinte do nodejs!!!')
});

//bloqueando o "event loop"
/*process.nextTick(function () {
	while (1) {
		console.log('Isso nunca vai acabar!!!')
	}
});

//escapando do "event loop"
stream.on('data', function () {
	stream.end('my response');
	process.nextTick(function () {
		fs.unlink('path/to/some/file');
	});
});*/
//usando setTimeout no lugar de setInterval 
var intervalo = 1000;
(function agendamento() {
	setTimeout(function exec() {
		console.log('vai repetir a cada segundo!');
		agendamento();
	}, intervalo);
})();