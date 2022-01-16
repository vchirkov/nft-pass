const mongoose = require('mongoose');
const {Schema} = require('mongoose');

exports.App = mongoose.model('App', new Schema({
    name: {type: String, required: true},
    token: {type: String, required: true, unique: true, index: true },
    nfts: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}));
