// Dependencies
// file system
// path

// lib.create -> function
// open file
// write file

var fs = require('fs');
var path = require('path');

// create module to export
var lib = {}

lib.baseDir = path.join(__dirname, '/../.data/');

// the command
lib.create = function(dir, file, data, callback){
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx', function(err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // prepare data
            var dataString = JSON.stringify(data);
            fs.writeFile(fileDescriptor, dataString, function(err){
                if (!err) {
                    fs.close(fileDescriptor,function(err){
                        if (!err) {
                            callback(false)
                        } else {
                            callback('cannot close')
                        }
                    })
                } else {
                   callback('cannot write') 
                }
            })
        } else {
            callback('Cannot open file')
        }
    })
}

module.exports = lib;
