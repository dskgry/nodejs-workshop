/**
 * @author Sven Koelpin
 */
const r = require('rethinkdb');
const logger = require('../server/log/Logger');
const config = require('../config');
const testData = require('../testdata');
const eventEmitter = require('../server/Events');

const TWEETS_TABLE = 'tweets';

let connection = null;

const createDataBase = async () => {
    const dbList = await r.dbList().run(connection);
    if (!dbList.find(db => db === config.dbName)) {
        logger.info('Database not present. Creating it.');
        await r.dbCreate(config.dbName).run(connection);
    }
};

const createTables = async () => {
    await r.db(config.dbName).wait().run(connection);

    const tableList = await r.db(config.dbName).tableList().run(connection);
    if (!tableList.find(tbl => tbl === TWEETS_TABLE)) {
        logger.info('Tweets table not present. Creating it.');

        await r.db(config.dbName).tableCreate(TWEETS_TABLE).run(connection);
        await r.table(TWEETS_TABLE).wait().run(connection);
        await r.table(TWEETS_TABLE).insert(testData.map(tweet => {
            const dbTweet = Object.assign({}, tweet);
            delete dbTweet.id;
            return dbTweet;
        })).run(connection);

        logger.info('Tweets table and test data ready.');
    } else {
        await r.table(TWEETS_TABLE).wait().run(connection);
    }
};

const initDBStream = () => {
    r.table(TWEETS_TABLE).changes().run(connection, (err, cursor) => {
        cursor.each((error, newData) => eventEmitter.emit('newData', newData.new_val));
    });
};

const init = async () => {
    if (connection === null) {
        connection = await r.connect({
            host: config.dbHost,
            port: config.dbPort,
            db: config.dbName,
            password: config.dbPass
        });

        await createDataBase();
        await createTables();

        initDBStream();
    }

    logger.info('Database ready');
};

module.exports = {
    init,
    getConnection() {
        return connection;
    },
    getTweetsTable() {
        return TWEETS_TABLE;
    }
};
