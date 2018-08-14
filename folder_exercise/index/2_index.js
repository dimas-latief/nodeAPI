// pertama require http
// intantiate http
// require url
// intantiate url object
// dalam server ambil path yang di request
// melakukan trimmed path agar seragam
// ambil method dari req
// ambil payload dari request jika memang ada
// ambil payload dengan cara buffering
// buffering akan menggunakan StringDecoder
// instance decoder
// dengan menggunakan event on serperti data, akan melakuakn buffering dengan menggunakan
// decoder.write
// setelah itu menuju router yang disiapnkan
// router akan menuju handler yang disiapkan

var http = require('http');
var url = require('')
var StringDecoder = require('string_decoder').StringDecoder;

// intantiate http
var server = http.createServer(function(req, res) {
    // get the parameter from the req with URL
    var parsedURL = url.parseURL(req.url, true)
    // after we get the request object, now let see the path
    var path = parsedURL.path
    // after get the path lest trimmed it
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    // we need to know method of the request
    var method = req.method.toLowerCase();
    var header = req.headers;

    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    var queryObject = parsedURL.query;

    req.on('data', function(data){
        buffer += decode.write(data);
    })

    // req always come to an end event
    req.on('end', function(data){
        buffer += decoder.end();

        // construct the data back to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryObject' : queryObject,
            'headers' : headers,
            'payload' : buffer
        }

        // we choose the handler in here
        var choosenHandler = typeof(router[trimmedPath]) == 'object' ? router[trimmedPath] : handler.notFound

        choosenHandler(data, function(statusCode, payload){
            // there will be a call back that we need to catch
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            // we need to convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log("Finish")
        })
    })


    // next we can deal with the specific method and headers for security validation

    // next who will handling this request?
})