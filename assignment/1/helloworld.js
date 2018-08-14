/**
 * we want to create a server for helloworld
 */

// require http
// require url

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function(req, res){
    // get the url object
    var parsedURL = url.parse(req.url, true);
    // get the pathname
    var path = parsedURL.pathname;
    // trimmed path
    var trimmedPath = path.trim();

    // get the method
    var method = req.method.toLowerCase();
    // get the headers
    var headers = req.headers;

    // get the payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', function(data){
        buffer += decoder.write(data);
    })

    req.on('end', function(){
        buffer += decoder.end();

        // choose handler
        var choosenHandler = typeof(router[trimmedPath]) == 'object' ? router[trimmedPath] : handlers.notFound;

        // prepare data for the handler
        var data = {};

        choosenHandler(data, function(statusCode, payload){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            // make payload stringify
            var payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString)
        });
    })
})

var handlers = {};

handlers.hello = function(data, callback){
    callback(200, data)
}

handlers.nofFound = function (data, callback) {
    callback(404, data)
}

var router = {
    'hello' : handlers.hello
}