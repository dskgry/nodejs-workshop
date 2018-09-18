require('dotenv').load();
const dataBase = require('./db/Database');
const logger = require('./server/Logger');
const server = require('./server/Server');

const tweetsResource = require('./tweets/TweetsResource');

server.register(tweetsResource);

dataBase.init()
    .then(() => server.start())
    .catch(() => {
        logger.warn('DB not running. Using in memory data');
        server.start();
    });
