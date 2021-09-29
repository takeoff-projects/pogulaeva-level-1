var bodyParser = require('body-parser');
var model = require('../datastore');

var urlencodeparser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    app.get('/api/list', urlencodeparser, function(req, res, next) {
        model.list().then(data => {
            res.send(JSON.stringify(data));
        }).catch(err => {
            next(err);
            return;
        });
    });
    app.post('/api/add', urlencodeparser, function(req, res, next) {
        model.create(req.body.title)
            .then(data => {
                res.send(JSON.stringify({
                    id: data[0].mutationResults[0].key.path[0].id
                }));
            })
            .catch(err => {
                next(err);
                return;
            });
    });
    app.get('/api/delete/:id', function(req, res, next) {
        model.remove(req.params.id).then(data => {
            res.send(JSON.stringify({
                success: data[0].indexUpdates!==0
            }));
        }).catch(err => {
            next(err);
            return;
        });
    });
};