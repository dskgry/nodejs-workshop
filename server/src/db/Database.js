/**
 * @author Sven Koelpin
 */
const rethink = require('rethinkdb');
const logger = require('../server/Logger');
const testData = require('./FakeDatabase');
const eventEmitter = require('../server/Events');

const {
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_PASS,
    TWEETS_TABLE
} = process.env;

let connection = null;

const createDataBase = async () => {
    const dbList = await rethink.dbList().run(connection);
    if (!dbList.find(db => db === DB_NAME)) {
        logger.info('Database not present. Creating it.');
        await rethink.dbCreate(DB_NAME).run(connection);
    }
};

const createTables = async () => {
    await rethink.db(DB_NAME).wait().run(connection);

    const tableList = await rethink.db(DB_NAME).tableList().run(connection);
    if (!tableList.find(tbl => tbl === TWEETS_TABLE)) {
        logger.info('Tweets table not present. Creating it.');

        await rethink.db(DB_NAME).tableCreate(TWEETS_TABLE).run(connection);
        await rethink.table(TWEETS_TABLE).wait().run(connection);
        await rethink.table(TWEETS_TABLE).insert(testData.getTweetsTable().map(tweet => {
            const dbTweet = Object.assign({}, tweet);
            delete dbTweet.id;
            return dbTweet;
        })).run(connection);

        logger.info('Tweets table and test data ready.');
    } else {
        await rethink.table(TWEETS_TABLE).wait().run(connection);
    }
};

const initDBStream = () => {
    rethink.table(TWEETS_TABLE).changes().run(connection, (err, cursor) => {
        cursor.each((error, newData) => eventEmitter.emit('newData', newData.new_val));
    });
};

const init = async () => {
    if (connection === null) {
        connection = await rethink.connect({
            host: DB_HOST,
            port: DB_PORT,
            db: DB_NAME,
            password: DB_PASS
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
