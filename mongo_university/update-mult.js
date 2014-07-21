MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var query = {},
		operator = { '$unset' : { 'date_returned' : '' }},
		options = { 'multi' : true };

	db.collection('grades').update(query, operator, options, function (err, updated) {
		if (err) throw err;

		console.dir('Successfully updated ' + updated + ' documents!');

		db.close();
	});
});