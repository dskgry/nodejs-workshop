const r = require('rethinkdb');
const dataBase = require('../db/Database');

const TABLE_NAME = dataBase.getTweetsTable();


const getTweets = async (start, size) => {
    const connection = dataBase.getConnection();
    const dbResult = await r.table(TABLE_NAME).orderBy(r.desc('createdAt')).slice(start, start + size).run(connection);
    return dbResult.toArray();
};

const getTweet = id => {
    const connection = dataBase.getConnection();
    return r.table(TABLE_NAME).get(id).run(connection);
};

const countTweets = () => {
    const connection = dataBase.getConnection();
    return r.table(TABLE_NAME).count().run(connection);
};

const createTweet = async tweet => {
    const connection = dataBase.getConnection();
    const result = await r.table(TABLE_NAME).insert(Object.assign(tweet, {createdAt: new Date().getTime()})).run(connection);
    return r.table(TABLE_NAME).get(result.generated_keys[0]).run(connection);
};


module.exports = {
    getTweets,
    getTweet,
    countTweets,
    createTweet
};