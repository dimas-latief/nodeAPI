// http
// URL
// Path
// method
// headers
// payload
// queryString
// StringDecoder
// Event data
// Event end
// Routing
// Handler

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder

var server = http.createServer(function(req,res){
    // get the url object
    var parsedURL = url.parse(req.url, true);
    // get the path name
    var path = parsedURL.pathName;
    // trimmed path
    var trimmedPath = path.trim();
    // get the method
    var method = req.method.toLowerCase();
    // get the headers
    var headers = req.headers;
    // get the query object
    var queryObject = parsedURL.query;
    // get the payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    // event data
    req.on('data', function(data){
        buffer += decoder.write(data);
    })

    req.on('end', function(){
        buffer += decoder.end();
        // choosing the handler
        var choosenHandler = typeof(router[trimmedPath]) == 'object' ? router[trimmedPath] : hanlders.notFound;
        // preparing data
        var data = {
            'trimmedPath' : trimmedPath,
            'queryObjec' : queryObject,
            'method' : method,
            'headers' : headers,
            'pyaload': buffer 
        }

        choosenHandler(data, function(statusCode, payload){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};
            var payloadString = JSON.stringify(payload);
            
            res.writeHead(statusCode);
            res.end(payload)
        })
    })
})

var handlers = {}

handlers.sample = function(data, callback){
    data = typeof(data) == 'object' ? data : {};
    callback(406, data)
}

var router = {
    'sample': handlers.sample
}

server.listen(3000, function(){
    console.log("running 3000")
})