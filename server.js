var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on : http://127.0.0.1:8080...');
});

//http://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server