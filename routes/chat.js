var express = require('express');
var router = express.Router();

var messageController = require('../controllers/messageController.js');

/**
 * GET ...
 */
router.get('/', function (req, res) {
    var options = req.query;

    userController.getAll(options, function (err, data) {
        if (err) {
            res.status(500).send({"err": err});
        }

        res.status(200).send(data);
    });


});

/**
 * POST Message - Send a message
 */
router.post('/', function (req, res) {
    var options = req.body;

    messageController.sendMessage(options, function (err, doc) {
        if (err) {
            res.status(500).send({"err": err});
        }

        res.send(doc);
    });
});

/*
 * POST Reset - Clear Messages
 */
router.post('/reset', function (req, res) {
    var options = req.body;

    messageController.reset(options, function (err, ok) {
        if (err) {
            res.send({"ok": false, err: "[messages reset]"+err});
        }

        res.send({"ok": true});
    });

});

module.exports = router;