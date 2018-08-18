// we want to create a data object model
// lets create a module for this, later on we can export it
var lib = {}

// to go to the file system, you must require fs
var fs = require('fs');

// first we must know the URL, or where it is belongs
// for that in node you have path
var path = require('path');
// now you have the path, next is you must know where is this module belongs (base directory)
// and that path will be included inside the module
lib.baseDir = path.join(__dirname, '/../.data/');

// now you have the base director, lets create the first DAO to create the data
lib.create = function(dir, file, data, callback){
    // you need to open the data
    // fileSystem.open.filePath.permission.callback(err, fd)
    fs.open(lib.baseDir+dir+file+'.json', 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('file dosnt exist');
                callback('file dosnt exist')
            }
            callback(err)
        }

        // prepare the data
        var stringData = JSON.stringify(data);
        // setelah preparing the data, kita akan menggunakan writefile
        fs.writeFile(fd, stringData, (err) => {
            if (err) {
                callback('cannot write data')
            }
            fs.close(fd, (err) => {
                if (err) {
                    callback('cannot close the data')
                }
                callback(false)
            })
        })
    })
}

// kalo mau update berarti lib.update.dirFile.namaFile.data.callback
// truncate.writefile.close
// open.truncate.writefile.close
lib.update = function(dirFile, fileName, data, callback){
    // fs.open.baseDir.dirFile.fileName.extension.permission.err.fd
    fs.open(lib.baseDir+dirFile+'/'+fileName+'.json', 'rx', (err, fd) => {
        if (err) {
            callback('cannot open the file')
        }
        // prepare the string data
        var stringData = JSON.stringify(data);
        fs.truncate(fd, stringData, (err) => {
            if (err) {
                callback('cannot update data')
            }
            fs.close(fd, (err) =>{
                if (err) {
                    callback('cannot close file')
                    
                }
                callback(false);
            })
        })
    })
}
// read file = read.readFile.callback
lib.read = function(dirName, fileName, callback) {
    fs.readFile(lib.baseDir+dirName+'/'+fileName+'.json', 'utf8', (err, data) => {
        callback(err, data);
    })
}
// dir.format.callback
// kita bisa bikin properties untuk base direktori data yang mau ditulis

// kalo mau delete berarti lib.delete.dirFile.namaFile.unlink.callback
lib.delete = function(dir, file, callback) {
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err) {
        // do something
    })
}
// 

// Export
module.exports = lib;