var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var server = http.createServer(app);

app.use(bodyParser.json());

//Database
var mongoose = require('mongoose');
var mongo_config = require('./config/mongodb.js');
mongoose.connect(mongo_config.url);

//routes
var users_route = require('./routes/users.js');
var message_route = require('./routes/chat.js');

app.use('/users', users_route);
app.use('/chat', message_route);

var userController = require('./controllers/userController.js');
var messageController = require('./controllers/userController.js');

app.post('/reset', function (req, res) {
    var options = req.body;

    userController.reset(options, function (err, ok) {
        if (err) {
            res.send({"ok": false, err: "[users reset]"+err});
        }

        messageController.reset(options, function(err, ok) {
            if (err) {
                res.send({"ok": false, err: "[messages reset] "+ err});
            }

            res.send({"ok": true});
        });
    });

});

server.listen(8000, function () {
    console.log('running at %s', server.address().address + ':' + server.address().port);
});
