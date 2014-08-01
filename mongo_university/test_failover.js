MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:30001,' +
	'mongodb://localhost:30002,' +
	'mongodb://localhost:30003/course', function (err, db) {
		if (err) { throw err; }

		var docNum = 0;

		function insertDoc() {
		 	db.collection('repl').insert({ 'docNum': docNum+=1 }, function (err, doc) {
		 		if (err) { throw err; }
		 			console.log(doc);
		 		});

		 	console.log('Inserção despachada!');
		 	setTimeout(insertDoc, 1000);
		}

		insertDoc();
	});