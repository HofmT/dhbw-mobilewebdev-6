var User = require('../models/user.js');

var controller = {

    getAll: function(query, callback) {

        var query = User.find({}, "-token -admin -age");
        query.exec(function(err, users) {
            if (err) {
                console.log("err: ", err);
                callback(err, null);
            }

            callback(null, users);
        });

    },

    getUser: function(id, callback) {
        User.findOne({_id: id}, function(err, doc) {
            if (err) {
                callback(err, null);
                console.log("err: ", err);
            }

            callback(null, doc);
        });
    },

    newUser: function (options, callback) {

        var newUser = new User(options);
        newUser.save( function(err, obj){
            if (err) {
                console.log("err: ", err);
                callback(err, null);
            }

            callback(null, obj);
        });
    },

    updateUser: function(id, user, callback) {

        //new=true, to get updated object/document in callback instead of original.
        User.findOneAndUpdate({_id: id}, user, {new: true}, function (err, doc) {
           if (err) {
               console.log("err: ", err);
               callback(err, null);
           }

            callback(null, doc);
        });

    },

    getUserByToken: function(token, callback) {
        User.findOne({token: token}, function (err, doc) {
            if (err) {
                console.log("err: ", err);
                callback(err, null);
            }

            callback(null, doc);
        });
    },

    reset: function(options, callback) {
        if (options && options.stopword === "007") {
            User.remove({}, function(err, ok) {
                if (err) {
                    callback(err, null);
                }

                callback(null, true);
            });
        } else {
            callback({"err": "no stopword"}, false);
        }
    }
};

module.exports = controller;
