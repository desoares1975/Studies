//JSON aceita, bsicamete,dois tipos de entrada, arrays [] e dicionários {}

//mongo shell

help
//auto-complete com o tab
db // -retorna a base de dados atual
mongorestore folder_name //retoaura a base de dados ou coleções que tenha sido 
//armazenadas em uma pasta usando-se o comando mongodump 
show dbs//lista as bases de dadoslocais
show collections;//lista as coleções na DB atual

db.collection.insert({ field: "value", field_2: "value_2", field_n: "value_n"});

db.collection.find().pretty() retorna os documentna os campos maiores que 1os de forma organizada

db.collection.find({field: { $gt : 10 }}) retorna apenas documentos com campo expecificado maior que 10

db.collection.find({restrissões na busca}, {campos a retornar})

//ex.:
db.users.find({'name': 'nome', 'age': 10, 'score' : { $gt: 5 }}, { '_id': false, 'name': true, email: 1, password: 0})
//0 e false 1 e true são as mesmas coisas
//$lt $gt também podem ser sequidos de e de "egual" ou seja $lte (<=) e //$gte (>=)

db.collection.find({field: { $lt : 10 }}) retorna apenas documentos com campo expecificado menor que 10

db.collection.find( field: { $lte: "H", $gte: "B" })// comparativos podem ser aplicados a strings

db.colecion.find({ field : { $nin: [] }})// retorna todos o s documentos excluídos do array
db.colecion.find({ field : {$exists: true/false}})
db.colecion.find({ field : {$type: 2}})// os tipos são definidos por números da especificação do padrão BSON ver http://bsonspec.org/ 
db.colecion.find({ field : {$regex: "a" }}) //acha documentos em que há letra a
db.colecion.find({ field : {$regex: "e$" }}) //acha documentos que terminam com a letra e
db.colecion.find({ field : {$regex: "^A" }}) // ertorna documentos em que o campo começa com A

/*Buscando dentro de arrays:
Não há uma sintaxe especícica para busca de ítens dentro de uma array, 
db.collection.find({ field: 'value'}) deve retornar o "value" tando como uma string quanto como uma string pertencente a um array*/

db.collection.find({ field: { $all: ['value-1', 'value-n']}}); //retorna os documentos que possuirem todos as strings listadas em 
//qualquer ordem no campo "field"
db.collection.find({ field : { $in: ['value-1', 'value-2', 'value-n']}})// retorna todos os documentos que possuirem qualquer um 
//dos ítens do array

/*Buscando dentro de documentos embutidos:
considerando o seguinte documento:

{
	"_id" : ObjectId("x"),
	"name" : "nome",a 
	"email" : {
		"work" : "nome@work.com",
		"personal" : "nome@personal.com"
	}
}*/

db.collection.find({ email: {work: "nome@work.com", personal: "nome@personal.com"}}); //retorna o documento acima

db.collection.find({ email: { personal: "nome@personal.com", work: "nome@work.com"}}) //não retorna o documento acima por não conter 
//os ítens do documento na ordem correta

db.collection.find({ email: {work: "nome@work.com"}}}) //não retorna o documento acima por não conter todos os ítens do documento

//para efetuar uma busca corretamente dentro de um documento embutido:

db.collection.find({ "email.work": "nome@work.com"}}) //retorna o documento acima usando dot notation
b.collection.find( { field : "value" } ).sort({ field2: -1 }).skip(50).limit(20)// retorna vinte documentos pulando os cinquenta 
//a primeiros em ordem descendente do campo field 2

db.collection.count()// retorna apenas a quantidade de resultados da query
//aceita todos os mesmos parâmetros e modificadores que o método find()

db.colection.update({ field: 'value' }, { field: 'newValue', field2: 'newValue', fieldn: 'newValue' });
//substitue o documento resultante do primeiro objeto com os valores do segundo, campos
//não inseridos ficarão vazios

db.collection.update({ field: 'value'}, { $set: { field_x: 'value_x' }});
//altera ou cria o valor apenas dos campos listados no segundo objeto 

db.collection.update({ field: 'value'}, { $inc { field: 10 }});
//incremente o campo com o inteiro que seque

//{
// 	"_id" : 0,
// 	"a" : [
// 		1,
// 		2,
// 		3,
//		4
// 	]
// }

db.collection.update({ _id: 0 }, {$set: { "a.2": 5 }});
//altera o valor (ou cria) do terceiro ítem do array a, retorna o seguinte
//{
// 	"_id" : 0,
// 	"a" : [
// 		1,
// 		2,
// 		5,//alerou o valor de a[2]
//		4
// 	]
// }
db.collection.update({criteria}, {$unset: {field: "value"}});
//exclue o campo "field" e seus respecticvos valores de todos os documentos resultantes do critério de busca

db.collection.update({ _id: 0 }, {$push: { a: 6 }});
//insere 1 valor como último ítem do array

db.collection.update({ _id: 0 }, {$pop: { a: 1 }});
//remove o último ítem do array

db.collection.update({ _id: 0 }, {$pop: { a: -1 }});
//remove o primeiro ítem do array

db.collection.update({ _id: 0 }, {$pushAll: { a: 5, 6, 7, 8 }});
//inser vários ítens no final do array

db.collection.update({ _id: 0 }, {$pull: { a: 5}});
//remove um elemento do array em qualquer localização

db.collection.update({ _id: 0 }, {$pullAll: { a: 5, 6, 7, 8 }});
//remove todos os ítens listados do array

db.collection.update({ _id: 0 }, {$addToSet: { a: 5 }});
//adiciona um ítem ao array somente quando o valor não existir 

db.collection.update({ field: 'value' }, {$set: { field: 'value' }}, { upsert: true });
//atualiza ou cria um documento caso o primeiro parâmetro não tenha 
//resultado válido. Caso o valor da quary não seja um valor válido
//par inserir na base de dados um documento é criado apenas com os
//valores do segundo parâmetro.
//ex:
db.collection.update({ field: { $gt: 50 } }, { $set: { name: 'Willian' }}, { upsert: true });
//este comando retornaria a inserçãde do seguintr documento
// { 
// 	"_id" : ObjectId('234aeab12c2345dfd34990fb00'),
// 	"name" : "Willian"
// }

db.collection.update({ field: 'value' }, {$set: { field: 'value' }}, { multi: true });
//atualiza todos os documentos que retornarem como resultado
//da query do objeto n oprimeiro parâmetro
//caso multi não seja expecificado o mongo altera apenas 
//o primeiro resultado da query

db.collection.remove()// usa os mesmos argumentos de find()
//exclui os resultados da query no objeto do primeiro parâmetro
//um a um

db.collection.drop()// exclui uma coleção, mais rápido que .remove()

//RETORNANDO ERROS:

db.runCommand( { getLastError : 1 });
//pega o último erro caso não haja erro na última operação 
//retorna um objeto com "err": null, do contrário retorna
//o texto do erro 

//DRIVER DO MONGO PARA NODEJS

mongoimport -d <database> -c <collection> <file>.json
mongoimport --type csv --headerline weather_data.csv -d weather -c data

//EXEMPLO DE CÓDIGO NODEJS PARA FINDONE

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var query = { 'grade' : 100 };

	db.collection('grades').findOne(query, function (err, doc) {
		if (err) throw err;

		console.dir(doc);
		db.close();
	});
});

//EXEMPLO DE FIND COM toArray()

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var query = { 'grade' : 100 };

	db.collection('grades').find(query).toArray(function (err, docs) {
		if (err) throw err;

		console.dir(docs);

		db.close();
	});
});// Neste exemplo a query é executada e um array é criado após todos os resultados
// terem sido retornados

//

//EXEMPLO DE FIND USANDO UM CURSOR E EACH

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var query = { 'grade' : 100 };

	var cursor = db.collection('grades').find(query);//apenas cria o cursor
	//não executa query até que o .each conecta no mongo uma vez para cada resultado e 
	//imprime no console

	cursor.each(function(err, doc) {
		if (err) throw err;

		if (doc === null) {
			return db.close();
		}

		console.dir(doc.students + " gor a good grade!");
	});
});

// este segundo exemplo é particularmente melhor porque retorna os 
//resultados antes de varrer toda a base, emcasos em que há muitos resultados
//é que as vantagens são mais evidentes

//FIELD PROJECTION

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', function (err, db) {
	if (err) throw err;

	var query = { 'grade' : 100 };

	var projection = { 'student' : 1, _id : 0 };

	db.collection('grades').find(query, projection).toArray(function (err, docs) {
		if (err) throw err;

		docs.forEach( function (doc) {
			console.dir(doc);
			console.dir(doc.student + ' got a good grade!');
		});
	});
});

//OPERADORES DO OBJETO query
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	var query = {'student' : 'Joe', 'grade' : { '$gt' : 80, '$lt' : 95 } };

	db.collection('grades').find(query).each(function (err, doc) {
		if (err) throw err;
		
		if (doc === null) {
			return db.close();
		}

		console.dir(doc);
	});

});

//IMPORTANDO UM ARQUIVO JSON
var MongoClient = require('mongodb').MongoClient,
	request = require('request');

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {
	if (err) throw err;

	request('http://www.reddit.com/r/technology/.json', function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var obj = JSON.parse(body);

			var stories = obj.data.children.map(function (story) {
				return story.data;
			});

			db.collection('reddit').insert(stories, function (err, data) {
				if (err) throw err;

				console.dir(data);

				db.close();
			});
		}
	});

});

//USANDO O OPERADOR $regex NO MÉTODO FIND

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course' function (err, db) {
	if (err) throw err;

	
	var query = { 'title' : '$regex': 'NSA'};

	var projection = { 'title' : 1, '_id': 0 };

	db.collection('reddit').find(query, projection).each(function (err));
});


/*
ÍDICES / INDEXES

índices em mongodb são listas ordenadas de chaves
você pode indexar múltiplas chaves em uma coleção mas a busca deve começar do índice mais a esquerda:
Ex.:

indexando as chaves a, b e c, você pode realizar uma busca  pela indexação de a, a e b ou a, b e c
não podendo fazê-la por b, c, b e c, ou a e c.

Indices ocupam espaço em disco e sempre que um novo item é inserido na coleção o índice tem que ser 
re-indexado, o que leva tempo, por esta razão devemos indexar apenas as chaves pelas quais serão 
realizadas a maior parte das buscas.
*/

//ADICIONANDO ÍNDICE A UM CAMPO DE UMA COLEÇÃO

db.collection.ensureIndex({'field': 1, 'field2': -1, ...});

//field é a chave a ser indexada, o número poderia ser 1 ou -1, que indica respectivamente
//ordem crescente ou decrescente

db.system.indexes.find() // Lista todos os índices da base de dados
db.collection.getIndexes() // Lista todos os ínces da coleção
db.collecton.dropIndex({ 'field' : 1 }) //remove o índice expecificado 


// ÍNDICE MULTICHAVES / MULTIKEY INDEXES
// É quando você atribui um índice a um campo cujo valor é um array
// isso cria um "index point" para cada ítem do array.
//Não pode ser usado com arrays paralelos, se houver dois ítens indexados em um documento
//você pode inserir um array em apenas um deles por documento.
// Ex.: uma coleção tem as chaves a e b indexadas.
//é possível inserir os sequintes valores:
db.collection.insert({a:[1,3,4], b:1});
db.collection.insert({a:1, b:[1,2,3]});
db.collection.insert({a:3, b:1});
//mas não é possível inserir dois arrays:
db.collection.insert({a:[1,3,4], b:[1,3,5,6]});
//pode indexar qualquer nível do documento, não restringindo ao primeiro
db.collecton.ensureIndex({ 'field.array' : 1 })
//inserindo um índice único:
db.collecton.ensureIndex({ 'field' : 1 }, { unique : true })
//para excluir duplicatas na criação de índice único
db.collecton.ensureIndex({ 'field' : 1 }, { unique : true, dropDups : true })
//ALERTA, NÃO HÁ COMO DEFINIR QUAIS DUPLICATASA SERÃO EXCLUÍDAS E QUAL SERÁ MANTIDA

//Índices esparsos
//serve para indexar campos podem não estar preenchidos en todos os documentos da coleção mas que
//devem ser unique. Apenas os documentos que tiverem a chave poderam se beneficiar da indexação na busca
db.collecton.ensureIndex({ 'field' : 1 }, { unique : true, sparse : true })
//ALERTA: AS QUERIES ORDENADAS POR UM ÍNDICE ESPARSO PODEM ESCONDER DOCUMENTOS SEM O CAMPO INDEXADO

//Criando índices no background                                                                                                        
db.collecton.ensureIndex({ 'field' : 1 }, { unique : true, background : true })
//criar índices no background é mais lento mas permite que se escreva na coleção, por padrão
//os índices são criados no foreground o que bloqueia a escrita no documento
//em produção deve-se usar o background ou separar um dos servidores do replicaset para fazer no foreground
//enquanto os demais replicaset servers fazem a escrita
db.collection.insert({a:[1,3,4], b:1}).explain();//explica a query n é número de resultados 
//nscanned é o número de documentos examinados pela query

db.collection.stats();//exibe estatísticas da coleção como total de espaço em disco, 
//tamanho dos índices e total de documentos
db.collection.totalIndexSize() // retorna o tamanho total de todos os índices de uma coleção/

//HINT AN INDEX
db.collection.hint({a:1,b:1,c:1})//diz ao cursor quais índices usar na query 
//(a é a chave com um índice e 1 é cresente, poderia ser -1)
//cado o valor dentro do objeto seja $natural:1 ele usa apenas o índice no _id, que obriga a fazer a query
//em todo o documento

//ÍNDICES GEOESPACIAIS
//Para índices geoespaciais é necessário haver um campo neste formato
{'field' : [x,y]}//field pode ter qualquer nome e x e y são coodenadas de um plano cartesiano
//Na criação do index deve-se usar o sequinte comando:
db.collection.ensureIndex({ 'field': '2d' });// 2d refere-se a bidimenssional
db.collection.ensureIndex({ 'field': '2d', type: 1 });//o type optional refere-se a ordem, neste caso,
//crescente, poderia ser type: -1 
//para executar buscas com este ídice há alguns operadores especiais
db.collection.find({'$near': [x, y]}); // isso ordena do mais próxino para o mais distantes

//GEOESPACIAIS ESFÉRICOS
//Funciona de foma bem parecida com os geoespaciais no entanto como se trata de uma esfera 
//x e y são respectivamente longitude e latitude e se roda um busca com o seguinte comando:
db.runCommand({ geoNear: 'collection', near: [x, y], spherical: true, maxDistance: 1 });
//o valor de maxDistance é em radianos. A função de geoespaciais esféricos é basicamente para 
//armazenamento de dados relativos a localização como o google maps.

//PROFILER
//Profiler é uma ferramenta do mongo que escreve logs no arquivo system.profile
//ele possue três níveis por pardão: 0, 1 e 2, sendo 0 inativo, não faz log, 1 registra apenas queries acima de 100 ms
//e 2 registra todas as queries, 0 é o padrão.
//precisa inicia o mongo com as opções abaixo:
mongod --dbpath /path/to/mongo/mongodb --profile 1 --slowms 2
//profile é o nível do profiler podendo ser, como mencionado acima, 0, 1 ou 2, slowms é o número de milessegundos
//mínimo para que a query seja registrada no log
//para ver o log use o comando:
db.system.profile.find();

//MONGOTOP
//mostr onde o mongo está gastando o seu tempo
//mongotop <INTERVALO EM SEGUNDOS>
mongotop 3 

//MONGOSTAT
//exibe estatísiticas do mongo um dos mais importantes é 'idx miss %''
//que é o percentual de índices fora da memória. Índices deve caber completamente na memória RAM para coneguir-se
//o melhor desempenho em mongodb
mongostat

//SHARDING
//Técnica para separa um coleção grnade em múltiplos servidores mongodb
//criando-se multiplos servidores mongodb e um roteador mongos como  qual a aplicaão fala
//insrções em sharding deve incluir o "shard key" de todos os servidores

//AGGREGATION FRAMEWORK
//O framework de agregação permite fazer contagens de dados na DB, como por exemplo, contar o número de 
//produtosde uma determinada marca...


db.products.aggregate(//início do comando com a base de dados a colção e a função aggregate
	[//a função recebe um array de ojetos
		{
			$group:{//$group indica que irá a grupar os resustados
				"_id":"$manufacturer", //pelo _id dos fabricantes como indicado nesta parte
				//$manufacturer é o campo da coleção acrescido de $
				"num_products"://este é um campo criado para armazenar a agregação
				{
					"$sum":1//operador de soma e o valor a ser somada a cada resultado encontrado
				}
			}
		}
	]);

//AGGREGATION PIPELINE

$project //rechape - 1:1 - remodela o documento
$match //filter - n:1 - permite selecionar apenas os documentos que você quer analizar na agregação
$group //aggregate - n:1
$sort //sort 1:1 - ordena os documentos em um ordem particular
$skip //skips n:1 - pula um determinado número de resultados
$limit //limits n:1
$unwind //normalize 1:n // caso haja documentos com arrays ele retorna um documento para cada ítem do array
$out //output 1:1 - permite dar a saida do comando em uma nova coleção
//ainda há $redact e $geonear que não foram tratados no curso respectivamente permitem que alguns ítens resultantes 
//sejam omitidos por questões de segurança segurança e permite filtrar geograficamente	

//COMPOUNDING GROUPING

db.products.aggregate(//início do comando com a base de dados a coleção e a função aggregate
	[//a função recebe um array de ojetos
		{
			$group:{//$group indica que irá a grupar os resustados
				"_id":{
					"manufacturer" : "$manufacturer",
					"category" : "$category"
				}, //pelo _id dos fabricantes como indicado nesta parte
				//$manufacturer é o campo da coleção acrescido de $
				"num_products"://este é um campo criado para armazenar a agregação
				{
					"$sum":1//operador de soma e o valor a ser somada a cada resultado encontrado
				}
			}
		}
	]);
//o _id pode receber um documento complexo que precisa apenas ser único(unique)

//AGGREGATION EPRESSIONS
//estas expressões são de $group
$sum	//soma o 1 ou o valor dado na 
$avg	//tira a média dos valores de uma chave nos múltiplos documentos
$min 	//acha o menor valor para uma chave
$max 	//
$push 	//adiciona qualquer resultado a um array
$addToSet	//adiciona um valor a um array se ele ainda não existir
$first 	// retorna o primeiro valor para uma chave sem 'sort' este valor é arbitrário
$last 	// igual a first mas retorna o último

//$SUM
db.products.aggregate([
	{
		$group: {
			_id:{
				maker: "$manufacturer"
			},
			sum_prices:{
				$sum: "$prices"
			}
		}
	}
]);

//$AVG
db.products.aggregate([
	{
		$group: {
			_id: {
				"category": "$category"
			},
			avg_price: {$avg: "$price"}
		}
	}])

//addToSet
//cria um documento com um array criado apartir dos valores de uma determinada chave
db.products.aggregate([
	{
		$group: {
			_id: {
				"maker": "$manufacturer"
			},
			{
				categories: {"$addToSet": "$category"}
			}
		}
	}
])
//este comando retornaria o seguinte:
{_id : { "maker" : "Amazon"}, "categories" : [ "Tablets" ] }
{_id : { "maker" : "Samsung"}, "categories" : [ "Tablets", "Cell Phones" ] }
{_id : { "maker" : "Apple"}, "categories" : [ "Laptops", "Tablets", "Cell Phones" ] }

//$PUSH 
//similar a addToSet mas não garante que os ítens apareçam apenas uma vez:
db.products.aggregate([
	{
		$group: {
			_id: {
				"maker": "$manufacturer"
			},
			categories: {"$push": "$category"}
		}
	}
])
//este comando retornaria o seguinte:
{_id : { "maker" : "Amazon"}, "categories" : [ "Tablets", "Tablets" ] }
{_id : { "maker" : "Samsung"}, "categories" : [ "Tablets", "Cell Phones", "Cell Phones", "Cell Phones" ] }
{_id : { "maker" : "Apple"}, "categories" : [ "Laptops", "Tablets", "Tablets", "Tablets", "Cell Phones" , 
"Cell Phones", "Cell Phones" ] }
//ou seja, retorna uma categoria para cada ítem de cada categoria, mesmo quando ela já foi listada

//$MAX
db.products.aggregate([
	{
		$group: {
			_id: {
				"maker": "$manufacturer"
			},
			max_price: {$max: "$price"}
		}
	}
])
//DOUBLE AGGREGATION
//retorna primeiro o agregamento do primeiro objeto e então realiza um agregamento no
//documento resultante
db.grades.aggregate([
	{
		$group: {
			_id: {
				class_id: "$class_id",
				studdent_id: "$studdent_id"
			},
			"avarage":{"$avg": "$score"}
		},
		$group: {
			_id: "$_id.class_id", "average": {"$avg": "average"}
		}
	}
])

//$PROJECT
//É UM PIPILINE DIFERENTE DE $group
//ele cria uma nova coleção que pode ser remodelado
db.products.aggregate([
	{
		$project: {
			_id:0,// o zero indica que não queremos o _id
			"maker": {"$toLower": "$manufacturer"},//cria um novo comapo chamado maker
			//$toLower pega o valor de manufaturer e coloca em lowerCase
			"details":{
				"category": "$category",
				"price": {"$mutipli": ["$price": 10]} 
			},
			"item": "$name"
		}
	}
])
//normalmente se usa o $project para filtrar os campos do resultado antes de se agrupar,
//economizando memória

//$MATCH
//funciona como um filtro para os documentos resultantes de se agrupar

db.zips.aggregate([
	{
		$match: {
			state: "CA"//nome do campo na coleção: valor que deve corresponder
		}
	}
])
//o comando acima retorna todos os resultados com estado CA
db.zips.aggregate([
	{
		$match: {
			state: "CA"
		}

	},
	{
		$group: {
			_id:"$city",
			population: {$sum: "$pop"},
			zip_codes: {$addToSet: "$_id"}
		}
	}
])
//isto aainda pode evoluir paa isto:
db.zips.aggregate([
	{
		$match: {
			state: "CA"
		}

	},
	{
		$group: {
			_id:"$city",
			population: {$sum: "$pop"},
			zip_codes: {$addToSet: "$_id"}
		}
	},
	{
		$project: {
			_id:0,
			"city": "$_id"
			population: 1,
			zip_codes: 1

		}
	}
])

//$SORT
//sort pode ser feito na RAM ou no disco. Existe um limite de 100MB para todos o s pipelines
//por padrão o de RAM é usado
//a não ser que você permita o uso do disco. Sort pode ser executado antes ou depois de $group
db.zips.aggregate([
	{
		$match: {
			state: "CA"
		}

	},
	{
		$group: {
			_id:"$city",
			population: {$sum: "$pop"},
			zip_codes: {$addToSet: "$_id"}
		}
	},
	{
		$project: {
			_id:0,
			"city": "$_id"
			population: 1,
			zip_codes: 1

		}
	},
	{
		$sort: {population: -1}//nome do campo na coleção: asc, desc
	} 
])

//$SKIP & $LIMIT
//no framework de agregação é importante a ordem em que são colocados 
//$skip e $limit, por exemplo: se limit for 10 e anterior e $skip for 15, o resultado será os 10
//primeiros documentos da coleção, então serão pulados 15, fazendo assim com que a query retorne vazia

db.zips.aggregate([
	{
		$match: {
			state: "CA"
		}

	},
	{
		$group: {
			_id:"$city",
			population: {$sum: "$pop"},
			zip_codes: {$addToSet: "$_id"}
		}
	},
	{
		$project: {
			_id:0,
			"city": "$_id"
			population: 1,
			zip_codes: 1

		}
	},
	{
		$sort: {population: -1}
	},
	{$skip: 10},//sempre nesta ordem primeiro $skip
    {$limit: 5} //depois $limit
])

//$FIRST & $LAST
//Retorna o primeiro ou o último documento resultante de uma agregação
db.zips.aggregate([
	//a primeira parte pega a população de todas as cidades de todos os estados
	{$group:
		{
			_id: {state: "$state", city: "$city"}
			population: {$sum: "$pop"}
		}
	},
	//ordena por estado alfabeticamente e por população da maior para a menor
	{$sort:
		{
			"_id.state": 1,
			"population" -1
		}
	},
	//Agrupa por estado e retorna o primeiro de cada estado, ou seja, a maior população de cada estado
	{$group:
		{
			_id: "$_id.state",
			city: {$first: "_id.city"}
		}
	}
])

//$UNWIND
//Retorna um array desmantelado com um documento para cada ítem que existia anteriormente no array:
//ex.: Um documento como  que segue:
{ 
	a : 1, 
	b : 2, 
	c: [
		'apple', 
		'pear', 
		'orange'
	]}
// $unwind: "$c" retornaria

{ a : 1, b : 2, c : 'apple' }
{ a : 1, b : 2, c : 'pear' }
{ a : 1, b : 2, c : 'orange' }

//USO DE $UNWIND
db.blog.aggregate([
	//unwind by tag:
	{$unwind: "$tags"},
	//agrupa por tag contando cada tag
	{$group: {
		_id: "$tags",
		"count": {$sum: 1}
		}
	},
	//ordenapor popularidade:
	{$sort: {"$count": -1}},
	//mostra os top 10
	{$limit: 10},
	//muda o nome de _id para tag
	{$project: {
		_id: 0,
		"tag": "$_id",
		"count": 1 
		}
	}
])

//DOUBLE $UNWIND
db.inventary.aggregate([
	{$unwind: "$sizes"},
	{$unwind: "$colors"},
	{$group:
		{
			_id: { "size": "$sizes", "color": "$colors"},
			"count": {$sum: 1}
		}
	}
])
//REVERTENDO $UNWIND
//É POSSÍVEL REVERTER UM $UNWIND USANDO $addToSet ou $push, caso o ítem não seja "unique" 
//no array deve-se usar $push
db.inventory.aggregate([
	{$unwind: "$sizes"},
	{$unwind: "$colors"},
	//cria o aray de colors
	{$group
		"_id": { "name": "name", size: "$sizes"}
		"colors": {$push: "$colors"}
	},
	//cria o array de siszes
	{$group
		{
			"_id": {"name": "_id.name", "colors": "$colors"},
			"sizes": "$_id.size"
		}
	},
	//reformata no formato original:
	{$project: 
		{
			_id: 0,
			name: "$_id.name",
			sizes: 1,
			colors: "$_id.colors"
		}
	}
])
//exemplo usando-se addToSet (só funciona caso cada item seja "unique" no array)
db.inventory.aggregate([
	{$unwind: "$sizes"},
	{$unwind: "$colors"},
	//cria o aray de colors
	{$group
		"_id": { "name": "name"}
		"sizes": {$addToSet: "$sizes"}
		"colors": {$addToSet: "$colors"}
	}
])
/*
APPLICATION ENGENERING
Quando se usa replicação em Mongo deve sempre haver, no mínimo, 3 nós.
Os tipos de nós são:
	Regular - pode ser primário ou secundário
	Arbiter - apenas pode votar para eleger o primário, não armazena dados nem pode ser primário
	Delayed - grava os dados com atraso em relação ao nó primário prioridade 0, não pode ser primário
	Hidden - também tem prioridade ajustada para zero, o que quer dizer que não pode ser primário

Todos os nós pode votar para eleger um nó primário caso o primário caia.

//Consistência de Escrita

Usando-se ReplicaSet você pode escrever apenas no nó primário. Por padrão você também só pode ler do nó primário,
porém, você pode configurar para ler dos nós secundários. Neste caso é possível que você leia dados obsoletos 
já que há um atraso na atualização dos nós secundários. Não há garantia no tempo de atraso porque a replicação 
dos dados é assíncrona.
Mantendo-se o padão do Mongodb a escrita é fortemente consistente. Caso o nó primário caia 
não é possível escrever na base de dados até que a eleição de um novo nó primário.

*/

//Iniciando o replicaset
//primeiro você deve criar as pastas onde os dados serão armazenados
//mkdir -p /data/rs1 /data/rs2 /data/rs3
///então criamos os precessos para cada um deles
mongod --replSet rs1 --logpath "1.log" --dbpath data/rs --port 27017 --fork
mongod --replSet rs1 --logpath "2.log" --dbpath data/rs --port 27018 --fork
mongod --replSet rs1 --logpath "3.log" --dbpath data/rs --port 27019 --fork
//cada um deles tem que ser aberto em uma porta diferente

config = { _id: "m101", members:[
          { _id : 0, host : "localhost:27017"},
          { _id : 1, host : "localhost:27018"},
          { _id : 2, host : "localhost:27019"} ]
};

rs.initiate(config);
rs.status();//mostra o estado da replicaSet

//implicações do desenvolvedor com relação ao uso de ReplicaSet

/*
lista de seeds - o driver de estar ciente d epelomenos um membro do replicaSet
perocupações de escrita - w, j e w-timeout
preferência de leitura - vai ler do primário apenas ou dos sedundário também
eerros podem acontecer - é preciso verificar exeções quando você escreve e lê para ter certeza 
de que você entende a aplicação e quais dados ão consistentes

*/

rs.isMaster();//diz se o nó atual é master ou secundário
rs.slaveOk();//permite ler apartir de um nó secundário

/*
Há uma coleção chamada oplog.rs que serve para sincronizar os nós secundários do rs com o nó primário.
Os secundários buscam nesta coleção e comparam com suas próprias oplog.rs e copiam os dados não atualizados.
A criação de índices também aparece no oplog
*/

//Failover e Rollback

/*
Rollbacks acontecerão sempre que o nó primário cair (failover) e contiver escritas que não estava nos servidores secundários. 
Quando o antigo nó primário voltar como secundário ele criará um arquivo com estes dados que poderão ser inseridos 
manualmente no novo nó primário.
Para evitar este cenário deve-se configurar o conjunto do ReplicaSet para esperar que a maioria dos nós tenha os dados 
configurando o paraâmetro w=1

Fail over dentro do driver de nodejs:
No driver do nodejs é possível indicar apenas um no do replicaSet que a aplicação será capaz de utilizar corretamente
o conjunto, porém caso o nó indicado ao driver do nodejs esteja "off" a aplicação não saberá onde conectar-se, por isso é 
recomendavel que se indique todos os nós.
Qaundo ocorre uma falha no nó primário o driver do node cria um buffer para armazenas todas as escritas até que seja
eleito um novo nó primário.

Configuração de Escrita Write Concerne
É uma maneira de especificar o comportmento das escritas no mongodb.

	w : 1 - padrão -> envia a escrita para o nó primário e notifica o usuário assim que o primário toma conhecimento 
		deste sucesso.
	w : 0 - o driver notifica  sucesso assim que a escrita é enviada sem receber resposta

	w : 2 - somente notifica sucesso apos o nó primário e, no mínimo, um nó secundário informam sucesso. Os demais 
	números indicam quantos nós devem responder sucesso antes de notificar o usuário.

	w : 'j' - retorna sucesso após escrever no diário do nó primário o que permite recuperação em caso de 
	fail over uma vez que garante que os dados estejam no disco quando notifica o sucesso.

	w : 'majority' - retorna sucesso quando a maioria dos nós reportar o sucesso da escrita

	w : 1, j : 1 - alé de esperar confirmação do nó primário espera a escrita no diário do nó primário

*/

//PREFERÊNCIAS DE LEITURA
/*
Por padrão as leituras sempre irão para o nó primário,
no entanto é possível configurar as leituras para:
	- primary 
	- secondary
	- prefered (só não lerá o nó preferencial quando não for possível lê-lo, primaruPrefered, secondaryPrefered)
	- nearest

Pode ainda ser tag set, não aboradado no curso
Tag Sets

Tag sets allow you to target read operations to specific members of a replica set.

Custom read preferences and write concerns evaluate tags sets in different ways. Read preferences consider the value of a tag when selecting a member to read from. Write concerns ignore the value of a tag to when selecting a member, except to consider whether or not the value is unique.

You can specify tag sets with the following read preference modes:

primaryPreferred
secondary
secondaryPreferred
nearest
Tags are not compatible with mode primary and, in general, only apply when selecting a secondary member of a set for a read operation. However, the nearest read mode, when combined with a tag set, selects the matching member with the lowest network latency. This member may be a primary or secondary.

extraído de http://docs.mongodb.org/manual/core/read-preference/
*/

//PARANDO O SERVIDOR

/*
Para parar o servidor primeiro voce deve se conectar à coleção admin usando o comando:
>use admin
depois executando o comando:
>db.shutdownServer();
*/

//ERROS DE REDE

/*
Ainda que você possa setar a escrita para w=1, j=1 é possível que escritas bem sucedidas retornem erros em 
virtude de falhas de conexão
*/

//SHARDING

/*
sharding é a maneira od mongodb de escalonar. Permite colocar uma coleção em mútiplos servidores
	 ___     ___ 	 ___	 ___	 ___
	|   |   |	|   |   |	|	|	|	|
	|___|	|___|   |___|	|___|	|___|
	 S1		 S2      S3		 S4		 S5
      |______|_______|_______|________|
                     |
	  /\	       mongos
	 _||_           _|_
	/()()\         /   \
   |  rs  |       | App | 
    \_()_/         \___/

Cada shard é, normalmente, um conjunto de ReplicaSet. Quem faz a comunicação entre o mongodb e 
a aplicação é o mongos. Ele funciona com "RANGE BASED" e o conceito de shard key.
Em uma coleção pedidos, pedido_id eria a "shard key". Informando-se a shard key para aplicação permite que uma query 
busque os dados diretamente na shard correta, o não uso envia a query para todos as shards.
Se você utilizar um ambiente com shard você deverá incluir a shard key em todos os inserts. 
Pode-se fazer sharding em toda a DB ou apenas em uma coleção, ou coleções que você quer. É possível haver mais de um 
driver mongos, funcionando de forma bastandte similar ao replicaSet.
*/

// Building a Sharded Environment.


# Andrew Erlichson
# 10gen
# script to start a sharded environment on localhost

# clean everything up
echo "killing mongod and mongos"
killall mongod
killall monogs
echo "removing data files"
rm -rf /data/config
rm -rf /data/shard*


# start a replica set and tell it that it will be a shord0
mkdir -p /data/shard0/rs0 /data/shard0/rs1 /data/shard0/rs2
mongod --replSet s0 --logpath "s0-r0.log" --dbpath /data/shard0/rs0 --port 37017 --fork --shardsvr --smallfiles
mongod --replSet s0 --logpath "s0-r1.log" --dbpath /data/shard0/rs1 --port 37018 --fork --shardsvr --smallfiles
mongod --replSet s0 --logpath "s0-r2.log" --dbpath /data/shard0/rs2 --port 37019 --fork --shardsvr --smallfiles

sleep 5
# connect to one server and initiate the set
mongo --port 37017 << 'EOF'
config = { _id: "s0", members:[
          { _id : 0, host : "localhost:37017" },
          { _id : 1, host : "localhost:37018" },
          { _id : 2, host : "localhost:37019" }]};
rs.initiate(config)
EOF

# start a replicate set and tell it that it will be a shard1
mkdir -p /data/shard1/rs0 /data/shard1/rs1 /data/shard1/rs2
mongod --replSet s1 --logpath "s1-r0.log" --dbpath /data/shard1/rs0 --port 47017 --fork --shardsvr --smallfiles
mongod --replSet s1 --logpath "s1-r1.log" --dbpath /data/shard1/rs1 --port 47018 --fork --shardsvr --smallfiles
mongod --replSet s1 --logpath "s1-r2.log" --dbpath /data/shard1/rs2 --port 47019 --fork --shardsvr --smallfiles

sleep 5

mongo --port 47017 << 'EOF'
config = { _id: "s1", members:[
          { _id : 0, host : "localhost:47017" },
          { _id : 1, host : "localhost:47018" },
          { _id : 2, host : "localhost:47019" }]};
rs.initiate(config)
EOF

# start a replicate set and tell it that it will be a shard2
mkdir -p /data/shard2/rs0 /data/shard2/rs1 /data/shard2/rs2
mongod --replSet s2 --logpath "s2-r0.log" --dbpath /data/shard2/rs0 --port 57017 --fork --shardsvr --smallfiles
mongod --replSet s2 --logpath "s2-r1.log" --dbpath /data/shard2/rs1 --port 57018 --fork --shardsvr --smallfiles
mongod --replSet s2 --logpath "s2-r2.log" --dbpath /data/shard2/rs2 --port 57019 --fork --shardsvr --smallfiles

sleep 5

mongo --port 57017 << 'EOF'
config = { _id: "s2", members:[
          { _id : 0, host : "localhost:57017" },
          { _id : 1, host : "localhost:57018" },
          { _id : 2, host : "localhost:57019" }]};
rs.initiate(config)
EOF


# now start 3 config servers
mkdir -p /data/config/config-a /data/config/config-b /data/config/config-c 
mongod --logpath "cfg-a.log" --dbpath /data/config/config-a --port 57040 --fork --configsvr --smallfiles
mongod --logpath "cfg-b.log" --dbpath /data/config/config-b --port 57041 --fork --configsvr --smallfiles
mongod --logpath "cfg-c.log" --dbpath /data/config/config-c --port 57042 --fork --configsvr --smallfiles


# now start the mongos on a standard port
mongos --logpath "mongos-1.log" --configdb localhost:57040,localhost:57041,localhost:57042 --fork
echo "Waiting 60 seconds for the replica sets to fully come online"
sleep 60
echo "Connnecting to mongos and enabling sharding"

# add shards and enable sharding on the test db
mongo <<'EOF'
db.adminCommand( { addShard : "s0/"+"localhost:37017" } );
db.adminCommand( { addShard : "s1/"+"localhost:47017" } );
db.adminCommand( { addShard : "s2/"+"localhost:57017" } );
db.adminCommand({enableSharding: "test"})
db.adminCommand({shardCollection: "test.grades", key: {student_id:1}});
EOF

