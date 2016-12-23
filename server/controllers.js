var db = require('./db.json'),
    fs = require('fs');

// functions for database
function refreshFile(res, db, responseData){
    fs.writeFile('./db.json', db, function(){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Content-Type", "application/json");
        res.send(200, responseData);
    });
}
function getDB(dbname){
    return todos = (db[dbname] === undefined) ? db[dbname] = {} : db[dbname];
}

// set of route's controllers
exports.getTodos = function(req, res){
    refreshFile(res, JSON.stringify(db), getDB(req.params.todos));
};

exports.postTodo = function(req, res){
    var todos = getDB(req.params.todos),
        todosKeys = (JSON.stringify(todos) !== '{}') ? Object.keys(todos) : undefined,
        id = (todosKeys === undefined) ? 0 : Math.max.apply(Math, todosKeys) + 1;

        todos[id] = req.params.desc;
        refreshFile(res, JSON.stringify(db), String(id));
};

exports.deleteTodo = function(req, res){
    var todos = getDB(req.params.todos);
    delete todos[req.params.id];
    refreshFile(res, JSON.stringify(db), "Todo has been deleted successfully!");
}