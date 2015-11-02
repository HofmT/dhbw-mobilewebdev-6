var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController.js');

/**
 * GET all Users
 */
router.get('/', function (req, res) {
    var query = req.query;

    userController.getAll(query, function (err, data) {
        if (err) {
            res.status(500).send({"err": err});
        }

        res.status(200).send(data);
    });


});

/**
 * GET one user by id
 */
router.get('/:id', function (req, res) {

    var id = req.params.id;

    //TOOD: Switch between two cases:
    // own access of user details (complete)
    // foreign access of user details  (filtered)

    var user = userController.getUser(id, function (err, user) {
        if (err) {
            res.status(500).send({"err": err});
        }

        if (user) {
            res.send(user);
            return;

        } else {
            res.status(404).send({"err": "Not Found"});
            return;
        }
    });
});

/**
 * Update one user by id
 */
router.put('/:id', function (req, res) {
    var id = req.params.id;
    var user = req.body;

    userController.updateUser(id, user, function (err, updUser) {
        if (err) {
            res.status(500).send({"err": err});
        }

        if (updUser) {
            res.send(updUser);
        } else {
            res.status(404).send({"err": "Not Found"});
            }
    });
});

/**
 * POST new User
 */
router.post('/', function (req, res) {
    var options = req.body;

    userController.newUser(options, function (err, doc) {
        if (err) {
            res.status(500).send({"err": err});
        }

        res.send(doc);
    });
});

router.post('/reset', function (req, res) {
    var options = req.body;

    userController.reset(options, function (err, ok) {
        if (err) {
            res.send({"ok": false, err: "[users reset]"+err});
        }

        res.send({"ok": true});
    });

});

module.exports = router;
