const {Router, json} = require('express');
const authApp = require('./authApp');
const authSignature = require('./authSignature');
const clientRouter = require('./client');
const apiErrorHandler = require('./apiErrorHandler');

module.exports = db => {
    const router = new Router();

    router.use(json());
    router.use(authApp());
    router.use(authSignature());
    router.use('/client', clientRouter(db));
    router.use(apiErrorHandler());

    return router;
}


