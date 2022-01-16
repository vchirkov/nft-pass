const bcrypt = require('bcrypt');
const {Router} = require('express');
const formidable = require('express-formidable');
const {buildAuthenticatedRouter} = require('@nft-pass/adminjs-express');

const adminJsFactory = require('../../admin');
const {User} = require('../../db/models/User');

const {COOKIE_SECURE_PASS} = process.env;

module.exports = (db, rootPath) => {
    const router = new Router();

    router.use(formidable());
    router.use(buildAuthenticatedRouter(adminJsFactory(db, rootPath), {
        authenticate: async (email, password) => {
            if (!password || !email) return false;
            const user = await User.findOne({email});
            if (!user) return false;
            if (!await bcrypt.compare(password, user.password)) return false;
            return user;
        },
        register: async (email, password) => {
            if (!password || !email) return false;
            if (await User.findOne({email})) return false;
            return await User.create({
                email,
                password: await bcrypt.hash(password, 10)
            });
        },
        cookiePassword: COOKIE_SECURE_PASS,
    }));
    return router;
}

