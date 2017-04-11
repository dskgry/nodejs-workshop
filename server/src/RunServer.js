/**
 * @author Sven Koelpin
 */

const dataBase = require('./db/DataBase');
const logger = require('./server/log/Logger');
const server = require('./server/CreateServer');


dataBase.init()
    .then(() => server.start())
    .catch(() => {
        logger.warn('DB not running. Using in memory data');
        server.start();
    });

