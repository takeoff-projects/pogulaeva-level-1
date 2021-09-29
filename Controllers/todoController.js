 var bodyParser = require('body-parser');
 var model = require('../datastore');

 var urlencodeparser = bodyParser.urlencoded({ extended: false });

 module.exports = function(app) {

     app.get('/', function(req, res, next) {
         model.list().then(data => {
             res.render('index', {
                 todos: data.tasks
             });
         }).catch(err => {
             next(err);
             return;
         });
     });

     app.post('/', urlencodeparser, function(req, res, next) {
         model.create(req.body.todo_content)
             .then(entity => {
                 res.redirect('/')
             })
             .catch(err => {
                 next(err);
                 return;
             });
     });

     app.get('/delete/:id', function(req, res, next) {
         model.remove(req.params.id).then(() => {
             res.redirect('/');
         }).catch(err => {
             next(err);
             return;
         });
     });
 };