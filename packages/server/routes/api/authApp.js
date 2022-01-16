const {App} = require('../../db/models/App.js');
module.exports = () => {
    return async (req, res, next) => {
        try {
            const exists = await App.exists({token: req.headers['x-nftpass-token']});
            if (!exists) {
                const err = new Error('No App is found for the provided Api Key');
                err.status = 401;
                return next(err);
            }
            req.nftpass = {
                ...req.nftpass,
                appId: (await App.findOne({token: req.headers['x-nftpass-token']}, {_id: 1}))._id
            };
            next();
        } catch (err) {
            return next(err);
        }
    }
}
