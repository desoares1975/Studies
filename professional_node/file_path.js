//normalizando caminho de arquivo:
var path = require('path');
var myPath = path.normalize('/etc//etc/foo/obcure/..');
console.log(myPath);

//concatenando caminhos
//var path =require('path');
var myPath0 = '/sd/fdd//atp//..';
var myPath1 = 'desoares/projetos';
var myPath = path.join(myPath0, myPath1);//pode usar string ou variável
console.log(myPath);
//note que path.join() também normaliza

//resolvendo camminhos
//path.resolve resolve a string em um caminho absoluto e normalizado
//var path = require('path');
path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// if currently in /home/myself/node, it returns
// => /home/myself/node/wwwroot/static_files/gif/image.gif'

//encontrar o caminho relativo entre dois caminho absolutos
//var path = require('path');
var pathA = '/home/desoares/projetos/Studies/professional_node',
	pathB = '/home/desoares/projetos/Studies/mongo_university';

var relativePath = path.relative(pathA, pathB);
console.log(relativePath);

//extraindo componentes de um caminho
//var path = require('path');
//extraindo o nome do diretório

var myPathFile = '/home/desoares/projetos/Studies/professional_node/buffer.js',
	dir = path.dirname(myPathFile),//retorna o nome do diretório
 	file = path.basename(myPathFile),
 	fileNoExt = path.basename(myPathFile, '.js');
 	ext = path.extname(myPathFile);

 console.log(dir, '- nome do diretório');
 console.log(file, '- nome do arquivo');
 console.log(fileNoExt, '- nome do arquivo sem a extensão');
 console.log(ext, '- extensão do arquivo');

//determinando se õ arquivo ou diretério existem
//var path = require('path');
var fs = require('fs');
var myFakePath = '/home/user/none';

fs.exists(myFakePath, function (retorno) {
	console.log(myFakePath, ' existe?', retorno);
});

fs.exists(myPathFile, function (retorno) {
	console.log(myPathFile, 'existe?', retorno);
});

var existe = fs.existsSync(myPathFile);
console.log(existe, '- fs.existsSync, não usa callback!!!!!!!!!');