const mongoose = require('mongoose');
const {Schema} = require('mongoose');

exports.App = mongoose.model('App', new Schema({
    name: {type: String, required: true},
    token: {type: String, required: true, unique: true, index: true},
    network: {
        type: String,
        required: true,
        enum: ['eth', 'ropsten', 'kovan', 'rinkeby', 'goerli'],
        default: 'eth'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    nfts: [{type: String, lowercase: true}]
}));
