var net = require('net'),
	porto = 4001,
	quit = '!sair';
	chatServer = net.createServer(),
	soqs = [];//armazena as conexões clientes
	//name = process.argv[3];

chatServer.on('connection', function (soq) {
	console.log('New connecion on port: ', porto);
	soq.write('Por favor, digite o seu nome de usuário:\n -');
	soqs.push(soq);//adiciona cada uma das conexões no array
	
	soq.on('data', function (data) {

		if(!soq.userName) {

			soq.userName = data.toString().replace(/(\r\n|\n|\r)/gm,"");
			soqs.forEach(function (nSoq) {
				if (soq !== nSoq) {
					if(soq.userName === nSoq.userName){
						soq.userName = null;
						soq.write('O nome digitado já existe nesta sala, digite outro:\n -');

					}
				}
			});

			if (soq.userName) {
				soq.write('Bem vindo ' + soq.userName + '. Para sair digite \'' + quit + '\'.\n -');
			}

			soqs.forEach(function (nSoq) {
					
				if(nSoq !== soq && soq.userName) {
					nSoq.write(soq.userName + ' entrou.\n -')
				}
			});	

		} else if (data.toString().trim().toLowerCase() === quit) {

			soq.end();
		
		} else {

			console.log('got this data:', data);
				soqs.forEach(function (nSoq) {
					if(soq !== nSoq) {
						nSoq.write(soq.userName + ': ' + data);
					}
					nSoq.write('\n -');
				});

		}
	});

	soq.on('end', function () {
		console.log(soq.userName.toString(), ' server connection terminated.');
		soqs.forEach(function (nSoq) {
			if (nSoq !== soq) {
				nSoq.write(soq.userName + ' saiu.');
			}
		});
		var indice = soqs.indexOf(soq);
		soqs.splice(indice, 1);//remove apenas a conexão certa
	});
});
chatServer.on('error', function (err) {
	console.log('Error occured', err.message);
});
chatServer.on('close', function () {
	console.log('Server connection terminated');
});
chatServer.on('listening', function () {
	console.log('Server up on port', porto);
});
chatServer.listen(porto);