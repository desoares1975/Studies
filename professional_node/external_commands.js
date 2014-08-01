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
	console.log('- stdout', stdout);
});

//You can also pass an optional argument containing some configuration options before the callback
/*var exec = require('child_process').exec;
var options = {
timeout: 10000,
killSignal: 'SIGKILL'
};
exec('cat *.js | wc -l', options, function(err, stdout, stderr) {
// ...
});
*/

//ABAIXO UMS CÓPIA DO CONTEÚDO DO LIVRO PARA REFERÊNCIA
/*➤
cwd — current working directory. Use this if you want to force the current working
directory.
➤
encoding — the expected encoding for the child output. Defaults to the string uft8,
which identifies the UTF-8 encoding. Use this if the process you are executing outputs
data in an encoding other than UTF-8. Node supports these encodings:
➤ ascii
➤ utf8
➤ ucs2
➤ base64
If you want more information about the supported Node encodings, refer to Chapter 4,
“Using Buffers to Manipulate, Encode, and Decode Binary Data.”
➤ timeout — the timeout in milliseconds for the execution of the command. Defaults to 0,
     which waits indefi nitely for the child process to end.
➤ maxBuffer — specifies the maximum size in bytes of the output allowed on the stdout or
     the stderr streams. If exceeded, the child is killed. Defaults to 200 * 1024.
➤ killSignal — the signal to be sent to the child if it times out or exceeds the output buffers.
The default value for this is SIGTERM, which sends a termination signal to the process. This
is usually the orderly way of ending processes. When using the SIGTERM signal, the process is
able to handle and override the default behavior. If the target process expects it, you can
send it another signal altogether (like SIGUSR1, for instance). You can also send it a SIGKILL
signal, which is handled by the operating system and forces the process to terminate
immediately, without a cleanup routine being triggered.
If you want to handle process termination more closely, you should use the child_process
.spawn function instead, which is covered later.
➤
env — environment variables to be passed into the child process. Defaults to null, which
means the child process inherits all the parent environment variables that are defi ned right
before spawning it.
66
❘
CHAPTER 8 CREATING AND CONTROLLING EXTERNAL PROCESSES
NOTE With the killSignal option you can pass a string identifying the
name of the signal you want to send to the target process. Signals are identifi ed
in Node as strings. Here is a complete list of UNIX signals and their default
actions:
NAME DEFAULT ACTION DESCRIPTION
SIGHUP Terminate process Terminal line hangup
SIGINT Terminate process Interrupt program
SIGQUIT Create core image Quit program
SIGILL Create core image Illegal instruction
SIGTRAP Create core image Trace trap
SIGABRT Create core image Abort program
SIGEMT Create core image Emulate instruction executed
SIGFPE Create core image Floating-point exception
SIGKILL Terminate process Kill program
SIGBUS Create core image Bus error
SIGSEGV Create core image Segmentation violation
SIGSYS Create core image Nonexistent system call invoked
SIGPIPE Terminate process Software termination signal
SIGALRM Terminate process Real-time timer expired
SIGTERM Terminate process Software termination signal
SIGURG Discard signal Urgent condition present on socket
SIGSTOP Stop process Stop (cannot be caught or ignored)
SIGTSTP Stop process Stop signal generated from keyboard
SIGCONT Discard signal Continue after stop
SIGCHLD Discard signal Child status has changed
SIGTTIN Stop process Background read attempted from
                    control terminal
SIGTTOU Stop process Background write attempted to
                    control terminal
SIGIO Discard signal I/O is possible on a descriptor
Executing External Commands
NAME DEFAULT ACTION DESCRIPTION
SIGXCPU Terminate process CPU time limit exceeded
SIGXFSZ Terminate process File size limit exceeded
SIGVTALRM Terminate process Virtual time alarm
SIGPROF Terminate process Profiling timer alarm
SIGWINCH Discard signal Window size change
SIGINFO Discard signal Status request from keyboard
SIGUSR1 Terminate process User defined signal 1
SIGUSR2 Terminate process 
❘ 67
User defined signal 2
*/
//EXECUTANDO OCOMANDO COM VARIAÁVEIS DE AMBIENTE AUMENTADAS
var env = process.env,
	varName,
	envCopy = {},
	exec = require('child_process').exec;
//copia process.env dentro de envCopy
for (varName in env) {
	envCopy[varName] = env[varName];
}
//cria algumas variáveis personalizadas
envCopy['Custom Env Var'] = 'valor aleatório';
envCopy['Custom Env Var 2'] = 'outro valor aleatório';
// Executa um comando com process.env e as variáveis personalisadas
exec('ls -la', { env: envCopy }, function (err, stdout, stderr) {
	if (err) { throw err; }
	console.log('- stdout', stdout);
	console.log('- stderr', stderr);
});

//Processo Pai ajustando vaariável de ambiente
//var exec = require('child_process').exec;

/*exec('node child.js', { env: { number: 123 } }, function (err, stdout, stderr) {
	if (err) { throw err; }

	console.log('stdout:\n', stdout);
	console.log('stderr:\n', stderr);
});

Child process parsing environment variable. (chapter8/04_environment_
number_child.js)
var number = process.env.number;
console.log(typeof(number)); // → "string"
number = parseInt(number, 10);
console.log(typeof(number)); // → "number"
*/
//crescendo processos filhos
//impotando o child_process corretamente para spawn
var spawn = require('child_process').spawn;
//carrega o processo filho 
var child = spawn('tail', ['-f', '/var/log/system.log']);

//OUVINDO DADOS DO PROCESSO FILHO
//imprime saída do filho no console
child.stdout.on('data', function (data) {
	console.log('tail output: ', data);
});

//O processo pai também pode ouvir dados daquele stream assim:
child.stderr.on('data', function (data) {
	console.log('tail erro output:', data);
});

//enviando dados ao processo filho
// unpause the stdin stream
/*process.stdin.resume();
process.stdin.on('data', function(data) {
var number;
try {
// parse the input data into a number
number = parseInt(data.toString(), 10);
Spawning Child Processes
❘ 71
// increment by one
number += 1;
// output the number
process.stdout.write(number + "\n");
} catch(err) {
process.stderr.write(err.message + "\n");
}
});

var spawn = require('child_process').spawn;
// Spawn the child with a node process executing the plus_one app
var child = spawn('node', ['plus_one.js']);
// Call this function every 1 second (1000 milliseconds):
setInterval(function() {
// Create a random number smaller than 10.000
var number = Math.floor(Math.random() * 10000);
// Send that number to the child process:
child.stdin.write(number + "\n");
// Get the response from the child process and print it:
child.stdout.once('data', function(data) {
console.log('child replied to ' + number + ' with: ' + data);
});
}, 1000);
continues
72
❘
CHAPTER 8 CREATING AND CONTROLLING EXTERNAL PROCESSES
LISTING 8-7 (continued)
child.stderr.on('data', function(data) {
process.stdout.write(data);
});
*/
//ouvindo a saída de processo filho
var spawn = require('child_process').spawn;
var child = spawn('ls', ['-la']);
child.stdout.on('data',  function (data) {
	console.log('dados do filho:', data);
});
//quando o filho sai
child.on('exit', function (code) {
	console.log('processo filho terminado com o código:', code);
});

//pegand o código de saída do processo filho
/*var spawn = require('child_process').spawn;
var child = spawn('ls', ['does_not_exist.txt']);

child.on('exist', function (code) {
	console.log('processo terminado com cód.:' code);
});*/

//enviando sinal e matando processos
var spawn = require('child_process').spawn;
var child = spawn('sleep', [10]);
setTimeout(function (){
	child.kill();//por padrão kill manda o sinal sigterm
}, 1000);
child.on('exit', function (code, signal) {
	if (code) {
		console.log('processo filho terminou com o cód.:', code);
	} else if (signal) {
		console.log('processo filho terminado pelo sinal:', signal);
	}
});

child.kill('SIGUSR2');//enviando o sinal sigusr2 em vez de sigterm
//Note that even though this method is called kill, the signal might not end up killing your process.
//If the child process handles the signal, the default signal behavior is overridden. A child
//process written in Node can override a signal by defi ning a signal handler like this:
process.on('SIGUSR2', function () {
	console.log('Recebido sinal SIGUSR2!!!!');
});