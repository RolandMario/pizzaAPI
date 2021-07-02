
/* 
*This is the handlers module
*
*/
//dependencies

const _data = require('./data');
const helpers = require('./helpers');
//const methods = require('./index');

let handlers = {};


handlers.users = function(data, callback){
let acceptableMethods = ['GET', 'POST', 'PUT', 'DELETE'];
if(acceptableMethods.indexOf(data.methods) > -1){
  handlers._users[data.methods](data, callback);
  
}
else{
  callback('Unacceptable http/https method used');
} 

};



// handlers._users container
 handlers._users = {};

handlers._users.POST = function(data, callback){

  //@ data to POST into file
  // name, phone, email and home address
  //optional data none.


let name = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length <= 12 ? data.payload.phone.trim(): false;
let email = typeof(data.payload.email) === 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim(): false;
let address = typeof(data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim(): false;

if(name && phone && email && address){
  let userData ={
    'name': name,
    'phone': phone,
    'email': email,
    'address': address
  }

  _data.create('test', phone,userData, function(msg){
    callback(msg)
  });
}else{
  callback('missing required field');
}
  
}

handlers._users.GET = function(data, callback){
  callback('you are in the _users GET route');
  
}

handlers._users.PUT = function(data, callback){

let name = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length <= 12 ? data.payload.phone.trim(): false;
let email = typeof(data.payload.email) === 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim(): false;
let address = typeof(data.payload.address) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim(): false;
if(phone){
 if(name || email || address){
  if(name){
    _data.read('test', phone, function(err, userData){
      if(!err && userData){
        let objectUserData = handlers.parseJsonToObject(userData);
        objectUserData.name = name;
        _data.update('test', phone, objectUserData, function(err){
          callback(err);
        })
      }else{
        callback('Error reading from the file');
      }
    })
  }
    if(email){
    _data.read('test', phone, function(err, userData){
      if(!err && userData){
        let objectUserData = handlers.parseJsonToObject(userData);
        objectUserData.email = email;
        _data.update('test', phone, objectUserData, function(err){
          callback(err);
        })
      }else{
        callback('Error reading from the file');
      }
    })
  }
    if(address){
    _data.read('test', phone, function(err, userData){
      if(!err && userData){
        let objectUserData = handlers.parseJsonToObject(userData);
        objectUserData.address = address;
        _data.update('test', phone, objectUserData, function(err){
          callback(err);
        })
      }else{
        callback('Error reading from the file');
      }
    })
  }
 }
}else{
  callback('missing phone number');
}
}
handlers._users.DELETE = function(data, callback){
  let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length <= 12 ? data.payload.phone.trim(): false;
  if(phone){
    _data.delete('test', phone,function(err){
      callback(err);
    })
  }}

  handlers.tokens = function(data, callback){
    let acceptableMethods = ['GET', 'POST', 'DELETE'];
    if(acceptableMethods.indexOf(data.methods) > -1){
      handlers._tokens[data.methods](data, callback);
      
}
else{
  callback('Unacceptable http/https method used');
} 
  }

  //handlers._tokens container
  handlers._tokens = {};
  //require field: phone
  //optional field: none
  handlers._tokens.POST = function(data, callback){
    let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length <= 12 ? data.payload.phone.trim(): false;
    if(phone){
      //lookup if the user of the phone number exist
      _data.read('test', phone, function(err, userData){
        if(!err && userData){
          let tokenId = helpers.generateTokenId(15);
          let tokenData = {
            "id": tokenId,
            "phone": phone,
            "stillValid": true
          }
          let stringToken = JSON.stringify(tokenData);
          _data.create('tokens', phone, tokenData, function(err){
            if(!err){
              callback(stringToken);
            }else{
              callback('unable to persist token data');
            }
          })
        }else{
          callback('user does not exist')
        }
      })
    }
  }

  handlers._tokens.DELETE = function(data, callback){
    let phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length <= 12 ? data.payload.phone.trim(): false;
  if(phone){
    _data.delete('tokens', phone,function(err){
      callback(err);
    })
  } 
  }

handlers.notFound = function(callback){
  callback('No Such Path exists');
}
handlers.parseJsonToObject = function(str){
  let obj = JSON.parse(str);
  return obj;
}

// export module
module.exports = handlers;