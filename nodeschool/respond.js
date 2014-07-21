var filter = require('./filter_file.js'),
	directory = process.argv[2],
	extention = process.argv[3];

filter(directory, extention, function (err, files) {
	if (err) { throw err; }
	files.forEach(function (file) {
		console.log(file)
	});
});

// solução oficial

// var filterFn = require('./solution_filter.js')
//     var dir = process.argv[2]
//     var filterStr = process.argv[3]
    
//     filterFn(dir, filterStr, function (err, list) {
//       if (err)
//         return console.error('There was an error:', err)
    
//       list.forEach(function (file) {
//         console.log(file)
//       })
//     })
