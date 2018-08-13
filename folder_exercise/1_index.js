/**
 * In here we should create the server
 * 
 * because we want to create the server, so the most important is
 * there will be a request, and response
 * we need to create the door for that
 * this door is using http
 */

// Dependencies
var http = require('http');
// url is uniform resources locater
var url = require('url')
// Create the server or instantiate
var server = http.createServer(function (req, res) {
    // make the URL an object
    var parsedURL = url.parse(req.url, true); 

    // After we parse the URL, now we can check that location that are needed
    // We get the location from the path
    var path = parsedURL.pathname;

    // We need to clean the url so it will be uniform
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // checking if there are a query string on the request
    var query = parsedURL.query;

    // Get the HTTP Method
    var method = req.method.toLocaleLowerCase();

    var headers = req.headers;

    // getting the payloadof therse any
    var decoder = new StringDecoder('utf-8');
    // Buffer to get the bitsdata at a time
    var buffer = ''
    //  After that get the data from it, and appending
    req.on('data', function(data){
        buffer += decoder.write(data);
    })

    req.on('end', function(){
        // you will end the data
        buffer += decoder.end();

        // chosenHandler
        var choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : hanlders.notFound;

        // preparing the data to be return
        var data = {
            method, etc
        }

        choosenHandler(data, function(statusCode, payload){
            // Status code is passing
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            // after that you will see the payload, that buffer before hand
            // Payload must be an object
            payload = typeof(payload) == 'object' ? payload : {};

            // When you sending back the response data must be in a string
            var payloadString = JSON.stringify(payload);

            // return the response
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log("Everything is done in here")
        })
    })
    // 
})
// Make server to listen port
// we need to tell the server to listen
server.listen(3000, function(){
    console.log("The server is listening on port 3000")
})

// Sample itu adalah path yang akan di dapatkan
// dan handlers.sample adalah router yang akan dilalui
var router = {
    'sample' : handlers.sample
}

handlers.sample = function(data, callback){
    callback(406, {'datanya':'apa lah'});
}

// bagaimana dengan data yang akan dikirimkan kita akan belajar setelahnya