var experess = require('express');
var config = require('./config');
var todoController = require('./Controllers/todoController');
var app = experess();
app.set('view engine', 'ejs');
app.use(experess.static(__dirname + '/public'));
todoController(app);
var server = app.listen(config.get('PORT'), () => {
    var port = server.address().port;
    console.log(`App listening on port ${port}`);
});