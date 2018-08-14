// filesystem
var fs = require('fs');
// path
var path = require('path');
// lib
var lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

// create
lib.create = function(dir, file, data, callback) {
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
        if (!err && fileDescriptor) {
           var stringData = JSON.stringify(data);
           fs.writeFile(fileDescriptor, stringData, function(err){
               if (!err) {
                   fs.close(fileDescriptor, function(err){
                       if (!err) {
                           callback(false)
                       } else {
                           callback('close failed')
                       }
                   })
               } else {
                   callback('write failed')
               }
           })
        } else {
            callback('cannot open')
        }
    })
}

module.exports = lib;