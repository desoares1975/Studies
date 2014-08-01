//despausa stdin
process.stdin.resume();
process.stdin.on('data', function (data) {
	var number;
	try {
		//analisa o vlor da var number
		number = parseInt(data.toString(), 10);
		number += 1;
		//dá saída para number
		process.stdout.write(number + '\n');
	} catch (err) {
		process.stderr.write(err.message + '\n');
	}
});