const mongoose = require('mongoose');
const {Schema} = require('mongoose');

exports.User = mongoose.model('User', new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    apps: [{
        type: Schema.Types.ObjectId,
        ref: 'App'
    }]
}));
