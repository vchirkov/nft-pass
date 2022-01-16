const AdminJS = require('adminjs');
const AdminJSMongoose = require('@adminjs/mongoose');

const {App} = require('../db/models/App');
const {User} = require('../db/models/User');

const appOptions = require('./options/App');
const userOptions = require('./options/User');
const translations = require('./translations');
const branding = require('./branding');

AdminJS.registerAdapter(AdminJSMongoose);

module.exports = (db, rootPath) => new AdminJS({
    databases: [db],
    resources: [{
        resource: App,
        options: appOptions
    }, {
        resource: User,
        options: userOptions
    }],
    locale: {
        translations
    },
    rootPath,
    registerPath: '/admin/register',
    branding
});
