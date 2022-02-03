const {Router} = require('express');

const verify = require('./verify');
const authenticate = require('./authenticate');

module.exports = () => {
    const router = new Router();

    router.post('/verify', verify);
    router.post('/authenticate', authenticate);
    return router;
}
