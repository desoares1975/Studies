var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/weather', function (err, db) {
	if (err) throw err;

	var query = {},
		projecton = {},
		options = {'sort': [['State', 1], ['Temperature', -1]]};

	var cache;	
	db.collection('data').find(query, projecton, options).each(function (err, doc) {
		if (err) throw err;

		if (doc === null ){
			
			return db.close();

		}
		
		if(cache !== doc.State) { 
			console.log(doc.State + ' - ' + doc.Temperature + ' - ' +  doc.month_high);
			doc.month_high = true;
			cache = doc.State;
			
			db.collection('data').save(doc, function (err, saved) {
				
				return db.close();
			});

		}

	});

});
