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

app.use(cors());

const dbo = new DBO(MONGODB_URL);
dbo.connect().then(async db => {
    await Moralis.start({serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APPLICATION_ID});

    app.use('/api', require('./routes/api')(db));
    app.use('/admin', require('./routes/admin')(db, '/admin'));
    app.use('/iframe', require('./routes/iframe')());
    app.use('/public', express.static('public'));
    app.listen(PORT, () => console.log(`server started on PORT=${PORT}`));
});
