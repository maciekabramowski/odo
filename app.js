var express = require('express');
var toDoController = require('./controllers/toDoController');

var app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static('./public'));

toDoController(app);

app.listen(3000);
console.log('Server is up on port 3000');
