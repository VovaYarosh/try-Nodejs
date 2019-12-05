let http = require('http');
let fs = require('fs');
let url = require('url');
let querystring = require('querystring');

function sendResponse(res,options){
    let path = options.path ? options.path : './index.html';
    let status = options.status ? options.status : 200;
    let headers = options.headers ? options.headers: {};
        let readStream = fs.createReadStream(path);
    readStream.pipe(res)
}

let server = http.createServer(function(req, res){
     let parsedUrl = url.parse(req.url);
     switch(parsedUrl.pathname){
         case "/" : {
             sendResponse(res,{});
             break;
         }
         case "/about": {
             sendResponse(res,{path: './about.html'});
             break;
         }
         case "/create": {
             req.on('data',function(data){
                 console.log(querystring.parse(data.toString()));
             });
             req.on('end',function () {
                 sendResponse(res,{});
             });
             break;
         }
     }
});

server.listen(3000,function(){
    console.log('listening....')
});