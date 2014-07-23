
//ENTENDENDO O PADRÃO CALLBACK

var fs =require('fs');


fs.readFile('/etc/passwd', function (err, fileData) {
	if(err) { throw err; }

	console.log('Conteúdo do arquivo: ', fileData.toString());
});

//ENTENDENDO O PADRÃO "EVENT EMITTER"
/*
var req = http.request(options, function (response) {
	response.on('data', function (data) {
		console.log('Dados oriundos de response', data);
	});
	response.on('end', function () {
		console.log('response ended');
	});
});

var em = new (require('events').EventEmitter)();

em.emit('evento1');
em.emit('error', new Error('Foi mal!!!'));
*/

//VINCULANDO CALLBACKS USANDOADDLISTNER() OU ON()

/*function recebeDados(data) {
	console.log(data);
}
readStream.addListner('data', recebeDados);

readStream.on('data', recebeDados);
//poderia ser assim

readStream.on('data', function (data) {
	console.log(data);
});

function receiveData(data) {
	console.log('data received: %j', data);
}
readStream.on('data', receiveData);*/

//vinculando múltiplos "events listners"

/*readStream.on('data', function (data) {
	console.log('aqui tem alguns dados!', data);
});
readStream.on('data', function (data) {
	console.log('aqui tem alguns dados também!', data);
});
//caso um dos eventos vinculados retorn erro os demais eventos serão ignorados. Ex:
readStream.on('data', function (data) {
	throw new Error('Alguma coisa deu errado!', data);
});
readStream.on('data', function (data) {
	console.log('Nuca chegaremos aqui!!!!', data);
});*/

//REMOVENDO EVENT LISTENER DE UM EMITTER

/*function receiveData2(data) {
	console.log('recebendo dados de um arquivo: %j', data);
}
readStream.on('data', receiveData2);
readStream.removeListener('data', receiveData2);//remove o event listener do emiter data*/

//EXECUTANDO O CALBACK NO MÁXIMO UMA VEZ COM .once
/*function receberDados(data) {
	console.log('recebendo dados: %j', data);
}
readStream.once('data', receberDados);*/

//o método .once poderia ter sido implementado assim
var EventEmitter = require('events').EventEmitter;

EventEmitter.prototype.once = function (type, callback) {
	var that = this; 
	this.on(type, function listener() {
		that.removeListener(type, listener);
		callback.apply(that, arguments);
	});
}

//REMOVENDO TODOS OS EVENTOS LIGADOS A UM EMITTER
//emitter.removeAllListeners(type);
//onde emitter é emissor e tyep é o tipo
//ex.:
//readStream.removeAllListeners('data');

//CRIANDO UM "EVENT EMITTER"
//herdando do event emitter do node
var util = require('util'),
	EventEmitter = require('events').EventEmitter;

var myClass = function () {
}

util.inherits(myClass, EventEmitter);

//Emitindo envetos
myClass.prototype.meuEmitter = function () {
	this.emit('Evento personalizado', 'argumento1', 'argumento2');
}
//ouvindo o evento "Evento personalizado"
var minhaInstancia = new myClass();
minhaInstancia.on('Evento personalizado', function (arg0, arg1) {
	console.log('Meu primeiro emisor de evento está emitindo isto: %s', arg0, arg1);
});

//Emitindo um tique por segundo:
var util = require('util'),
	EventEmitter = require('events').EventEmitter;

var Ticker =  function () {
	var self = this;
	setInterval(function () {
		self.emit('tick');
	}, 1000);
}
util.inherits(Ticker, EventEmitter);

var ticker = new Ticker();

ticker.on('tick', function() {
	console.log('TICK!');
});