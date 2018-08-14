// file system
var fs = require('fs');
var path = require('path');
// path

// we are creating lib module that will be exported
var lib = {}
// lib base directory
lib.baseDir = path.join(__dirname, '/../.data/');
// creating lib

// write data to a file
lib.create = function(dir, file, data, callback) {
    // Open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx', function(err, fileDescriptor){
        if(!err && fileDescriptor){
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function(err){
                if(!err) {
                    fs.close(fileDescriptor, function(err){
                        if (!err) {
                            callback(false)
                        } else {
                            callback('Error closing new file')
                        }
                    })
                } else {
                    callback("Error writing to new file")
                }
            })
        } else {
            callback('Could not create new file, it may already exist')
        }
    })
}

// exporting module
module.exports = lib;