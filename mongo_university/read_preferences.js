var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhos:30001,' +
	'mongodb://localhos:30002,' +
	'mongodb://localhos:30003/course?readPreference=secondary', //inicação de preferência de leitura na conexão
	function (err, db) {
		if (err) { throw err; }

		db.collection('repl').insert({ x: 1 }, function (err, doc) {
			if (err) { throw err; }

			console.log(doc);
		});

		function findDoc() {
			db.collection('repl').findOne( { x: 1 }, 
				{ 'readPreference': readPreference.PRIMARY }, //read preference indicado na query
				function (err, doc) {
				if (err) { throw err; }

				console.log(doc, '\n', 'comando find enviado');
				setTimeout(findDoc, 1000);
			});
		}

		findDoc();
	});