require('dotenv-defaults/config');
const express = require('express');
const cors = require('cors');
const Moralis = require('moralis/node');

const DBO = require('./db');

const {
    PORT,
    MONGODB_URL,
    MORALIS_APPLICATION_ID,
    MORALIS_SERVER_URL
} = process.env;

const app = express();

const dbo = new DBO(MONGODB_URL);
console.log('init DBO connection');
dbo.connect().then(async db => {
    console.log('connected to DBO');
    console.log('init connect to Moralis Server');
    await Moralis.start({serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APPLICATION_ID});
    console.log('connected to Moralis Server');

    app.use(cors({origin: true, credentials: true}));
    app.use('/api', require('./routes/api')(db));
    app.use('/admin', require('./routes/admin')(db, '/admin'));
    app.use('/public', express.static('public'));
    console.log('init start server');
    app.listen(PORT, () => console.log(`server started on PORT=${PORT}`));
});
