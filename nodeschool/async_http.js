var http  = require('http'),
	bl    = require('bl'),
	myArr = [],
	qnt = process.argv.length - 2;
	count = 0;


function httpAsync(index, times) {

	url = process.argv[ index +2 ];
	http.get(url, function (res){
		res.pipe(bl(function (err, data) {
			if (err) { throw err; }

			myArr[index] = data.toString();
			count++;

			if (count === times) {
				for (a = 0; a < myArr.length; a++) {
					console.log(myArr[a]);
				}
			}
		}));
	});

}

runMe = function (times) {
	for (i = 0; i < times; i++) {
		httpAsync(i, times);
	}
};

runMe(qnt);


/*storage.forEach(function (resp) {
	console.log(resp);
});*/

/*function httpAsync(index) {
	http.get(process.argv[2 + index], function (res) {
		res.pipe(bl(function (err, data) {
			if (err) { return err; }

			storage[index] = data.toString();
			count++;

			if(count === 3) {
				for (i = 0; i < 3; i++) {
					console.log(storage[i])
				}
			}

		}));
	});
}

for (i=0; i < 3; i++){
	httpAsync(i);
}*/
