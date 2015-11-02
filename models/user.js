var uuid = require('uuid');

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    created: { type: Date, default: Date.now },
    admin: {type: Boolean, default: false},
    age: {type: Number, min: 14, max: 50},
    token: {type: String, default: uuid.v4}
});

//Compare Static Methods
UserSchema.statics.compareAsc = function (a, b) {
    //a is less than b by some ordering criterion
    if (a.lastname < b.lastname) {
        return -1;
    }
    //a is greater than b by the ordering criterion
    if (a.lastname > b.lastname) {
        return 1;
    }
    // a must be equal to b
    return 0;
};
UserSchema.statics.compareDesc = function (a, b) {
    //a is less than b by some ordering criterion
    if (a.lastname > b.lastname) {
        return -1;
    }
    //a is greater than b by the ordering criterion
    if (a.lastname < b.lastname) {
        return 1;
    }
    // a must be equal to b
    return 0;
};

var User = mongoose.model('Users', UserSchema);

module.exports = User;
