//criando um buffer
var myBuf = new Buffer('What the hell, I\'m not going with hello world....');

//este abaixo foi copiado :
var buf = new Buffer('8b76fde713ce', 'base64');// o segundo parâmetro é a codificação poderia ser utf-8 ou ascii
//por padrão utf-8 está setado se for omitido o segundo parâmetro

var bufWithSize = new Buffer(1024);//cria um buffer de 1KB preenchido com bytes aleatórios

//escrevendo e lendo bytes num buffer
var myBuffer = new Buffer('Conteúdo do meu Buffer...');
console.log(myBuffer[10])//acessa o 11º ítem do buffer
console.log(myBuffer[12] + ' //valor orignal de myBuffer[12]');
myBuffer[12] = 125;// altera o valor do 13º ítem do buffer
console.log(myBuffer[12] + ' //novo valor de myBuffer[12]');

//como um array pode-se acesssar o tamanho do buffer usnado-se length()
console.log( myBuf.length + '//Tamanho de myBuf');
console.log( buf.length + '//Tamanho de buf');
console.log( bufWithSize.length + '//Tamanho de bufWithSize');
console.log( myBuffer.length + '//Tamanho de myBuffer');

//interando os ítens do buffer
for (i = 10; i < myBuf.length; i++) {

	console.log(myBuf[i]);

}

//Tirando um parte do buffer
var newBuffer = new Buffer('Este é o conteúdo do meu buffer!');
console.log(newBuffer + '//newBufer');
var smallerBuffer = newBuffer.slice(0, 9);
console.log(smallerBuffer + '//smallerBuffer');
//smallerBuffer na verdade é apenas um areferência a uma parte do buffe roriginal.
//Caso haja alterações no original a fatia do buffer também será alterada
newBuffer[0] = 122;
newBuffer[1] = 13;
console.log(newBuffer + '//newBuffer alterado');
console.log(smallerBuffer + '//smallerBuffer agora...');

//copiando o buffer
var toCopyBuffer = new Buffer('Conteúdo do Buffer a ser copiado!!!');
var theCopy = new Buffer(11);
var copyStart = 0;
var toCopyStart = 4;
var toCopyEnd = 11;
toCopyBuffer.copy(theCopy, copyStart, toCopyStart, toCopyEnd);
console.log(toCopyBuffer + '//toCopyBuffer');
console.log(theCopy + '//theCopy');

//Decodificando o buffer
var toDecode = new Buffer('Conteúdo do buffer que será decodificado');
var decoded = toDecode.toString();
console.log(toDecode[0], toDecode[1], toDecode[2], toDecode[3] + '//toDecode');
console.log(decoded +'//decoded');//escrevendo este comentário//escrevendo um novo comentário n oarquivo!!!!//escrevendo este comentário//escrevendo um novo comentário n oarquivo!!!!