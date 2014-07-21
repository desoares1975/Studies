var http = require('http'),
	url = process.argv[2];

http.get(url, function (res) {
	res.on('data', function (data) { 
		console.log(data.toString()); 
	});
});

// solução oficial

// var http = require('http')
    
//     http.get(process.argv[2], function (response) {
//       response.setEncoding('utf8')//método impotante para se lembrar!!!!
//       response.on('data', console.log)
//       response.on('error', console.error)
//     })
