/**
 * Refactoring the server
 */

//  Create a unified server

var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder

var httpServer = http.createServer(function(req, res){
    unifiedServer(req, res);
})

var httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req,res);
})

var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readdirSync('./https/cert.pem')
}

unifiedServer = function(req, res) {
    // get the url object
    var parsedURL = url.parse(req.url, true);
    // get the pathname
    var path = parsedURL.pathName;
    // get the method
    var method = req.method.toLowerCase();
    // get the header
    var headers = req.headers;
    // get the query object
    var queryObject = parsedURL.query;
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

        // preparing the data
        var data = {}

        choosenHandler(data, function(statusCode, payload){
            // security check
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            // stringify
            var payloadString = JSON.stringify(payload)
            res.setHeader('Content-Type', 'application/json')
            res.writeHeader(statusCode);
            res.end(payloadString)
        })
    })
}

var handlers = {};

handlers.sample = function(data, callback) {
    data = typeof(data) == 'object' ? data : {};
    callback(406, data)
}

var router = {
    'sample' : handlers.sample
}