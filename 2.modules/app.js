let http = require('http');
let fs = require('fs');
let url = require('url');


function sendResponse(res,options){
    let path = options.path ? options.path : 'index.html';
    let status = options.status ? options.status : 200;
    let headers = options.headers ? options.headers : {};
    res.writeHead(status,headers);
    let readStream = fs.createReadStream(path);
    readStream.pipe(res);
}

let server = http.createServer(function(req,res){
    let parsed = url.parse(req.url);
    switch (parsed.pathname) {
        case '/'  : {
            sendResponse(res, {});
            break;
        }
        case '/about'  : {
            sendResponse(res, {path: './about.html'});
            break;
        }
        case '/create'  : {
            req.on('data',function(data){
                console.log(data);
            })
            req.on('end',function(){
                res.end();
            })
        }
    }
});

server.listen(3000,function(){
    console.log('listenin....');
});



