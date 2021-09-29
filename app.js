var express = require('express');
var config = require('./config');
var todoController = require('./Controllers/todoController');
var apiController = require('./Controllers/apiController');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
todoController(app);
apiController(app);
var server = app.listen(config.get('PORT'), () => {
    var port = server.address().port;
    console.log(`App listening on port ${port}`);
});