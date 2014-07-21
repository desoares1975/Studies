module.exports = function (dir, ext, cb) {
	
	var fs = require('fs'),
		path = require('path');

	fs.readdir(dir, function (err, list) {
		if (err) { return cb(err); }
		var files = [];
		list.forEach(function (file) {
			if (path.extname(file) === '.' + ext) {
				files.push(file);
			}
		});

		cb(null, files);
	});
};

// solução oficial

// solution_filter.js:


//     var fs = require('fs')
//     var path = require('path')
    
//     module.exports = function (dir, filterStr, callback) {
    
//       fs.readdir(dir, function (err, list) {
//         if (err)
//           return callback(err)
    
//         list = list.filter(function (file) {//.filter() parece ser 
//			//mais um método de Array()
//           return path.extname(file) === '.' + filterStr
//         })
    
//         callback(null, list)
//       })
//     }
