var Message = require('../models/message.js');

var controller = {
    getIncoming: function(userid, callback) {

        Message.find({'to': userid}, function(err, docs) {
            if (err) {
                console.log("err: ", err);
                callback(err, null);
            }

            callback(null, docs);
        });
    },

    sendMessage: function (message, callback) {

        var newMessage = new Message(message);
        newMessage.save(function(err, obj){
            if (err) {
                console.log("err: ", err);
                callback(err, null);
                return;
            }

            callback(null, obj);
        });
    },

    reset: function(options, callback) {
        if (options && options.stopword === "007") {
            Message.remove({}, function(err, ok) {
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
