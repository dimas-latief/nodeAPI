/**
 * DAO
 */

//  dependencies
var fs = require('fs');
var path = require('path');

// create module to export
var lib = {};

lib.baseDir = path.join(__dirname, '/../.data/');

// create a file and write it
lib.create = function(dir, file, data, callback){
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function(err){
                if (!err) {
                    fs.close(fileDescriptor, function(err){
                        if (!err) {
                            callback(false)
                        } else {
                            callback('cannot close the file')
                        }
                    })
                } else {
                    callback('cannot write file')
                }
            })
        } else {
            callback('Perhaps file is already exist')
        }
    })
}

// reading file
lib.read = function(dir, file, callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err, data){
        callback(err, data);
    })
}

// updating data
lib.update = function(dir, file, data, callback){
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.truncate(fileDescriptor, function(err){
                if (!err) {
                    fs.writeFile(fileDescriptor, stringData, function(err){
                        if (!err) {condition
                            fs.close(fileDescriptor, function(err){
                                if (!err) {
                                    callback(false)
                                } else {
                                    callback('Close is not here')
                                }
                            })
                        } else {
                           callback('you cannot write data') 
                        }
                    })
                } else {
                    callback('cannot truncate the file')
                }
            })
        } else {
            callback('there is no file with that name')
        }
    })
}

// Deleting a file
lib.delete = function(dir, file, callback){
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
        if (!err) {
            callback(false)
        } else {
            callback('cannot delete file')
        }
    })
}

// exporting module
module.exports = lib;