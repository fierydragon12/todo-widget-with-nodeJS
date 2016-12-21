var http = require('http'),
    url = require('url'),
    db = require('./db.json'),
    fs = require('fs');

var constResponseStatus = {
    statusCode: [200, 400],
    responseText: ["OK", "Client validation error"]
};

http.createServer(function(req, res){
    var urlParsed = url.parse(req.url, true);

    if (urlParsed.pathname === '/favicon.ico') {
        res.end();
    } else {
        var list = urlParsed.pathname.replace("/", ""),
            todos = db[list],
            todosKeys = (todos !== undefined && JSON.stringify(todos) !== '{}') ? Object.keys(todos) : undefined,
            id = (urlParsed.query.id === undefined) ? ( (todosKeys === undefined) ? 0 : Math.max.apply(Math, todosKeys) + 1 ) : urlParsed.query.id,
            responseData = '',
            responseStatus = [constResponseStatus.statusCode[0], constResponseStatus.responseText[0]];

        if ((req.method === 'GET' || req.method === 'POST') && todos === undefined){
            todos = db[list] = {};
        }

        if (req.method === 'GET') {
            responseData = JSON.stringify(todos);
        } else if (req.method === 'POST' && urlParsed.query.desc !== undefined) {
            if (urlParsed.query.desc.length === 0){
                responseStatus = [constResponseStatus.statusCode[1], constResponseStatus.responseText[1]]
            } else {
                todos[id] = urlParsed.query.desc;
                responseData = String(id);
            }
        } else if (req.method === 'POST' && urlParsed.query.id !== undefined) {
            delete todos[id];
        }

        fs.writeFile('./db.json', JSON.stringify(db), function(){
            res.writeHead(responseStatus[0], responseStatus[1], {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(responseData);
        });
     }
}).listen(1337, '127.0.0.1');
