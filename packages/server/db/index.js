const mongoose = require('mongoose');

module.exports = class DBO {
    constructor(url) {
        if (!url) throw new Error('No Mongo URL was provided');
        this.url = url;
        this._connection = null;
    }

    get connection() {
        if (!this._connection) {
            throw new Error('Connection does not exist, please call `connect` function before accessing connector');
        }
        return this._connection;
    }

    async connect() {
        return this._connection = await mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }
};
