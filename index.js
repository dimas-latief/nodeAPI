/**
 * Primary file for the API
 * 
 */

//  Dependencies

// first use the HTTP module to define what the server does
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// Server should response all request with a string
var server = http.createServer(function(req, res) {
    // Get the URL and parse it
    var parsedURL = url.parse(req.url, true);

    // Get the path from that URL
    var path = parsedURL.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // Get the query string as an object
    var queryStringObject = parsedURL.query;

    // Get the HTTP Method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload, if theres any
    var decoder = new StringDecoder('utf-8');
    // Buffer to get bits data at a time
    var buffer = '';
    // Binding the event
    req.on('data', function(data){
        // This data is not decode yet, so we are going to append it the decoded
        buffer += decoder.write(data);
        // Huge json object, or some streaming
    });
    // End event is always get called
    req.on('end', function(){
        buffer += decoder.end();

        // Send the response
        res.end('Hello World\n');

        // Logging out the request path, when we looking at the terminal
        // console.log('Request received on path:' + trimmedPath + ' with this method: ' + method + ' and with these query string parameters', queryStringObject);
        // console.log('Request received with these headers: ', headers);
        console.log('Request received with this payload: ', buffer);
    })

});

// Start the server and have it listen on port 3000
server.listen(3000, function(){
    // callback is to tell us the server is done listening
    console.log("The server is listening on port 3000 now");
});

// We need to share which resources people are requesting when they sent request to the API

// So req have .method, .url