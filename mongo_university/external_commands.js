//EXTERNAL COMMANDS
//importando child process
var child_process = require('child_process');

//You can then use the exec function that is defined in this module like this:
// var exec = child_process.exec;
// exec(command, callback);

//Executing an external command. (chapter8/01_external_command.js)
//importando child_process exc
var exec = require('child_process').exec;
//chama o coamndo cat *.js |wc -l
exec('cat *.js | wc -l', function (err, stdout, stderr) {
	if (err) {
		consoloe.log('processo filho terminado. Cód.:', err.code);
	}
	console.log(stdout);
});