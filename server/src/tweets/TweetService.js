/**
 * @author Sven Koelpin
 */

const r = require('rethinkdb');
const dataBase = require('../db/DataBase');
const testData = require('../config/testdata');
const eventEmitter = require('../server/Events');

const ALL_TWEETS = [...testData];


const getTweets = async (start, size) => {
    const connection = dataBase.getConnection();
    if (connection) {
        const dbResult = await r.table(dataBase.getTweetsTable()).orderBy(r.desc('createdAt')).slice(start, start + size).run(connection);
        return dbResult.toArray();
    }

    //fallback: db is not running
    const sortedTweets = [...ALL_TWEETS].sort((a, b) => a.id < b.id);
    return sortedTweets.slice(start, start + size);
};

const countTweets = async () => {
    const connection = dataBase.getConnection();
    if (connection) {
        return r.table(dataBase.getTweetsTable()).count().run(connection);
    }

    //fallback: db is not running
    return ALL_TWEETS.length;
};

const createTweet = async tweet => {
    const connection = dataBase.getConnection();
    if (connection) {
        const result = await r.table(dataBase.getTweetsTable()).insert(Object.assign({}, tweet, {createdAt: new Date().getTime()})).run(connection);
        return r.table(dataBase.getTweetsTable()).get(result.generated_keys[0]).run(connection);
    }

    //fallback: db is not running
    const newTweet = Object.assign({}, tweet, {id: ALL_TWEETS.length + 1});
    ALL_TWEETS.push(newTweet);
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
