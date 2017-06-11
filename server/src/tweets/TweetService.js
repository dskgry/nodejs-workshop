/**
 * @author Sven Koelpin
 */

const r = require('rethinkdb');
const dataBase = require('../db/Database');
const fakeDataBase = require('../db/FakeDatabase');
const eventEmitter = require('../server/Events');


const getTweets = async (start, size) => {
    const connection = dataBase.getConnection();
    if (connection) {
        const dbResult = await r.table(dataBase.getTweetsTable()).orderBy(r.desc('createdAt')).slice(start, start + size).run(connection);
        return dbResult.toArray();
    }

    //fallback: db is not running
    const sortedTweets = [...fakeDataBase.getTweetsTable()].sort((a, b) => a.id < b.id);
    return sortedTweets.slice(start, start + size);
};

const countTweets = async () => {
    const connection = dataBase.getConnection();
    if (connection) {
        return r.table(dataBase.getTweetsTable()).count().run(connection);
    }

    //fallback: db is not running
    return fakeDataBase.getTweetsTable().length;
};

const createTweet = async tweet => {
    const connection = dataBase.getConnection();
    if (connection) {
        const result = await r.table(dataBase.getTweetsTable()).insert(Object.assign({}, tweet, {createdAt: new Date().getTime()})).run(connection);
        return r.table(dataBase.getTweetsTable()).get(result.generated_keys[0]).run(connection);
    }

    //fallback: db is not running
    const newTweet = Object.assign({}, tweet, {id: fakeDataBase.getTweetsTable().length + 1});
    fakeDataBase.getTweetsTable().push(newTweet);
    eventEmitter.emit('newData', newTweet);
    return newTweet;
};


const addStreamListener = callback => {
    eventEmitter.addListener('newData', callback);
};

const removeStreamListener = callback => {
    eventEmitter.removeListener('newData', callback);
};

module.exports = {
    getTweets,
    countTweets,
    createTweet,
    addStreamListener,
    removeStreamListener
};
