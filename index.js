const http = require('http');
const url = require('url');
const config = require('./lib/config');
const _data = require('./data');
const { StringDecoder } = require('string_decoder');
const handlers = require('./lib/handlers');

const server = http.createServer((req, res)=>{
const parsedUrl =  url.parse(req.url, true);
let method= req.method;
let payload = '';


const decoder = new StringDecoder('utf8');
req.on('data', function(data){
  
    payload += decoder.write(data);

});
req.on('end', function(){
  
    payload+= decoder.end();



const chosenHandler = typeof(router[parsedUrl.path]) !=='undefined' ? router[parsedUrl.path]: handlers.notFound;
    
    
    
    let data = {
    'methods': method,
    'payload': handlers.parseJsonToObject(payload)

};

  chosenHandler(data, function(msg){

    res.end(msg);
    //console.log(data.payload.firstname);
  });
    
    


    
    
    
});


});

//const PORT = process.env.PORT;

server.listen(3000, ()=>{console.log('node is listenning on port',3000)
});


const router ={
  "/users": handlers.users,
  "/tokens": handlers.tokens
}