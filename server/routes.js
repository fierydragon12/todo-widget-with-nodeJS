module.exports = function(app){
    var todos = require('./controllers');
    app.get('/fetch-todos/:todos', todos.getTodos);
    app.post('/post-todo/:todos/:desc', todos.postTodo);
    app.post('/delete-todo/:todos/:id', todos.deleteTodo);
}