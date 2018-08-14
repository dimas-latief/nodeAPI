/**
 * Primary file for the API
 * 
 */

//  Dependencies

// first use the HTTP module to define what the server does
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');

// Instantiating the HTTP server
var httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res);
});

// instantinate the HTTPS server
var httpsServer = https.createServer(httpsServerOptions,function(req, res) {
    unifiedServer(req, res);
});

var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
}

// start the https server
httpsServer.listen(config.httpsPort, function(){
    console.log("The server is listening on port "+config.httpsPort);
});

// Start the server
httpServer.listen(config.httpPort, function(){
    // callback is to tell us the server is done listening
    console.log("The server is listening on port "+config.httpPort);
});

// Define the handlers
var handlers = {};

// Sample handler
handlers.ping = function(data, callback){
    // Callback a http status code, and a payload object
    callback(200);
};

// Not found handler
handlers.notFound = function(data, callback){
    callback(404)
};

// Define a request router
var router = {
    'ping' : handlers.ping
};

// We need to share which resources people are requesting when they sent request to the API

// So req have .method, .url

// All logics for both http and https
var unifiedServer = function (req, res) {
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

        // Choose the handler this request should go to. If one is not found, use the notFound handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer 
        }

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            // Use the payload called back by the handler, of default to the empty object
            payload = typeof(payload) == 'object' ? payload : {};
            
            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('We are returning this response: ', statusCode, payloadString); // we are on building rest ful API on payload

        });

        // Send the response
        // res.end('Hello World\n');

        // Logging out the request path, when we looking at the terminal
        // console.log('Request received on path:' + trimmedPath + ' with this method: ' + method + ' and with these query string parameters', queryStringObject);
        // console.log('Request received with these headers: ', headers);
        // console.log('Request received with this payload: ', buffer); // we are on building rest ful API on payload
    })
}