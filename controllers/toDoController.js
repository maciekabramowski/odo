var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds111319.mlab.com:11319/todo');

//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});

var Data = [{item: 'get milk'},{item:'walk dog'}, {item: 'do smth else'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    res.render('todo', {todos:Data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
    Data.push(req.body);
    res.json(Data);
  });

  app.delete('/todo/:item', function(req, res){
     Data = Data.filter(function(todo){
       return todo.item.replace(/ /g, '-') !== req.params.item;
     });
     res.json(Data);
  });

};
