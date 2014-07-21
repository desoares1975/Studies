var fs = require('fs'),
	path = require('path'),
	dir = process.argv[2],
	ext = process.argv[3];

fs.readdir(dir, function (err, list) {
	if (err) { throw err; }
	var filesNum = list.length;

	// list.forEach(function (file) {
	// 	console.log(path.extname(file));
	// })
	
	for (i = 0; i < filesNum; i++) {
		fileExt = list[i].split('.')[1];
		if (fileExt) {

			if (fileExt === ext)
			console.log(list[i]);	

		}
		
	}

});

/* esta é a solução oficial
var fs = require('fs')
    var path = require('path')// path eu não conhecia!!!
    
    fs.readdir(process.argv[2], function (err, list) {
      list.forEach(function (file) {//nem sabia que havia 
      //for each no javascript parece ser um método de Array()!!!!
        if (path.extname(file) === '.' + process.argv[3])
          console.log(file)
      })
    })
*/