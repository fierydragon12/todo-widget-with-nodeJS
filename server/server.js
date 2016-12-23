var express = require('express'),
    app = express();

require('./routes')(app);
app.listen(1337, '127.0.0.1');