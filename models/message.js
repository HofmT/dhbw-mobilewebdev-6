var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message: String,
    created: { type: Date, default: Date.now },
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Message = mongoose.model('Messages', MessageSchema);

module.exports = Message;
