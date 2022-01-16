const {App} = require('../../db/models/App.js');
module.exports = () => {
    return async (req, res, next) => {
        try {
            const app = await App.findOne({token: req.headers['x-nftpass-token']});
            if (!app) {
                const err = new Error('No App is found for the provided Api Key');
                err.status = 401;
                return next(err);
            }
            req.nftpass = {
                ...req.nftpass,
                app
            };
            next();
        } catch (err) {
            return next(err);
        }
    }
}
