/**
 * @author Sven Koelpin
 */

const r = require('rethinkdb');
const dataBase = require('../db/Database');
const fakeDataBase = require('../db/FakeDatabase');
const eventEmitter = require('../server/Events');

const TABLE_NAME = dataBase.getTweetsTable();

const getTweets = async (start, size) => {
    const connection = dataBase.getConnection();
    if (connection) {
        const dbResult = await r.table(TABLE_NAME).orderBy(r.desc('createdAt')).slice(start, start + size).run(connection);
        return dbResult.toArray();
    }

    //fallback: db is not running
    const sortedTweets = [...fakeDataBase.getTweetsTable()].sort((a, b) => a.id < b.id);
    return sortedTweets.slice(start, start + size);
};

const getTweet = async id => {
    const connection = dataBase.getConnection();
    if (connection) {
        return r.table(TABLE_NAME).get(id).run(connection);
    }

    //fallback: db is not running
    return fakeDataBase.getTweetsTable().find(tweet => tweet.id === parseInt(id, 10));
};

const countTweets = async () => {
    const connection = dataBase.getConnection();
    if (connection) {
        return r.table(TABLE_NAME).count().run(connection);
    }

    //fallback: db is not running
    return fakeDataBase.getTweetsTable().length;
};

const createTweet = async tweet => {
    const connection = dataBase.getConnection();
    if (connection) {
        const result = await r.table(TABLE_NAME).insert(Object.assign(tweet, {createdAt: new Date().getTime()})).run(connection);
        return r.table(TABLE_NAME).get(result.generated_keys[0]).run(connection);
    }

    //fallback: db is not running
    const newTweet = Object.assign({}, tweet, {id: fakeDataBase.getTweetsTable().length + 1});
    fakeDataBase.getTweetsTable().push(newTweet);
    eventEmitter.emit('newData', newTweet);
    return newTweet;
};

module.exports = {
    getTweets,
    getTweet,
    countTweets,
    createTweet
};
