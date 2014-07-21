var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var grades = db.collection('grades');

	var cursor = grades.find({});
	cursor.skip(1);//a ordem das funções no código node não altera o resultado porque o mongo ordena corretamente
	cursor.limit(4);
	//cursor.sort('grade', 1);//ordena pelo campo grade
	cursor.sort([['grade', 1], ['student', -1]]);//ordena primeiro pelo campo grade e depois pelo campo student

	cursor.each(function (err, doc) {
		if (err) throw err;
		
		if (doc === null) {
			return db.close();
		}

		console.dir(doc);

	});
});

