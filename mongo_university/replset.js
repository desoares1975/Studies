MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:30001,' + 
	'mongodb://localhost:30002,' +
	'mongodb://localhost:30003/course',
	function (err, db) {
		if (err) { throw err; }

		db.collection('repl').insert({x: 1}, function (err, saved) {
			if (err) { throw err; }

			db.collection('repl').findOne({x: 1}, function (err, doc) {
				if (err) { throw err; }

				console.log(doc);
				db.close();
			});
		});
	});