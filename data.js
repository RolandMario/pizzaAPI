/* 
* the library for CRUD
*
*/


/*
*Dependencies
*
*/
const fs = require('fs');
const path = require('path');



//container object
const lib ={};

lib.baseDir = path.join(__dirname, '/.data/');

lib.create = function(dir, fileName, data, callback){
	//open the file for writing
	fs.open(lib.baseDir+dir+'/'+fileName+'.json', 'wx', function(err, fd){
		if(!err && fd){
			//convert data object to string
			const stringData = JSON.stringify(data);
		// write to the file
		fs.writeFile(fd, stringData, 'utf-8', function(err){
			if(!err && fd){
				//close the file
				fs.close(fd,function(err){
					if (!err && fd) {
						callback(false);
					}else{
						callback('Error closing file');
					}
				});
			}else{
				callback('Error writing to file');
			}
		});
	}else{
		callback('Error opening the file or the filename may already exists');
	}
	});
};



/*
* this function reads data from the file
*/
lib.read = function(dir, fileName,callback){
	fs.readFile(lib.baseDir+dir+'/'+fileName+'.json', 'utf-8',function(err, data){
		data = typeof(data) ==='string'? data : '';
		if(!err && data){

			callback(false, data);
		}else{
			callback('error reading from file', data);
		}
	});
};

/*
* this function UPDATEA data from the file
*/

lib.update = function(dir, fileName, data, callback){
	// open file 
	fs.open(lib.baseDir+dir+'/'+fileName+'.json', 'w', function(err,fd){
		if(!err && fd){
			fs.truncate(lib.baseDir+dir+'/'+fileName+'.json', function(err){
				if(!err){
					const stringData = JSON.stringify(data);
					fs.writeFile(fd, stringData, 'utf-8', function(err){
						if(!err && fd){
							callback(false);
						}else{
							callback('Error writing to the file');
						}
					});
				}else{
					callback('error truncating file');
				}
			});
		}else{
			callback('Error opening the file')
		}
	});
};

lib.delete = function(dir, fileName, callback){
	//unlink file
	fs.unlink(lib.baseDir+dir+'/'+fileName+'.json', function(err){
		if(!err){
			callback(false);
		}else{
			callback('Error deleting the file');
		}
	});
}
//export module
module.exports = lib;