// Create the http
// create the url
// event on data
// event on end
// return response

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder

// init http
var server = http.createServer(function(req, res){
    // What they want?
    var parsedURL = url.parse(req.url, true);
    // get the path
    var path = parsedURL.pathname;
    // trimmed path
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // get the query
    var queryObject = parsedURL.query
    // get the method
    var method = req.method.toLowerCase();
    // get the headers
    var headers = req.headers;

    // buffering payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', function(data){
        buffer += decoder.write(data);
    })

    req.on('end', function(){
        buffer += decoder.end();
        // get the handler
        var choosenHandler = typeof(router[trimmedPath]) == 'object' ? router[trimmedPath] : handler.notFound;

        // prepare data to response
        var data = {
            'trimmedPath' : trimmedPath,
            'queryObject' : queryObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        }

        choosenHandler(data, function(statusCode, payload){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {}

            // convert object to string
            var payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);
        })
    })
})

// make the server listen
server.listen(3000, function(){
    console.log("The server")
})

var handlers = {};
handlers.sample = function(data, callback){
    // do something with data
    callback(406, data)
}

handlers.notFound = function (callback){
    callback(data)
}

var router = {
    'sample' : handlers.sample,
    'something/else' : handlers.somethingElse
}