var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function (err, db) {
	if (err) { console.log(err); }

	db.collection('students').find({}).each(function (err, result) {

		if (err) { 

			console.log(err); 

		}

		if (result === null) {
			return db.close();
		}

		var myArr = result.scores,
			buffer = [];

		for (i = 0; i < myArr.length; i++) {
			
			if(myArr[i].type === 'homework') {

				buffer.push(myArr[i].score);

			}
		}
			
			if(buffer.length === 2) {

				dif = buffer[0] - buffer[1];

				if (dif > 0) {

					db.collection('students').update({ 'id' : result._id }, { 
						$pull: { scores: 
							{ 
								'type' : 'homework', 
								'score' : buffer[1] 
							} 
						}}, function (err, removed) {
							if (err) { console.log(err); }

							console.dir(removed);
						});


				} else {

					db.collection('students').update({ 'id' : result._id }, { 
						$pull: { scores: 
							{ 
								'type' : 'homework', 
								'score' : buffer[0] 
							} 
						}}, function (err, removed) {
							if (err) { console.log(err); }

							console.dir(removed);
						});

				}
			} else { console.log('something went wrong!'); }

		console.log(' ');
	
	});

});