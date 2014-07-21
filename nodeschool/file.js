var fs = require('fs');
var useMe;
var file = fs.readFileSync(process.argv[2]);
useMe = file.toString().split('\n').length -1;

console.log(useMe);