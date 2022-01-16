const {dirname} = require('path');
const {Router, static} = require('express');

const IFRAME_STATIC_PATH = dirname(require.resolve('@nft-pass/iframe'));

module.exports = () => {
    const router = new Router();
    router.use(static(IFRAME_STATIC_PATH));
    return router;
}


