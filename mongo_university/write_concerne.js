MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:30001,' + 
	'mongodb://localhost:30002,' +
	'mongodb://localhost:30003/course?w=1',//indica o write concerne ?w=1 na conexão da db
	function (err, db) {
		if (err) { throw err; }

		db.collection('repl').insert({ x: 1 }, function (err, saved) {
			if (err) { throw err; }

			db.collection('repl').findOne({ x: 1 }, { w: 2 } function (err, doc) {//especifíca o write { w : 2 } concerne
				//no objeto de options, sobrescrevendo a indicação na conexão para este comando.
				if (err) { throw err; }

				console.log(doc);
				db.close();
			});
		});
	});