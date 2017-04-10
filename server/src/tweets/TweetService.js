/**
 * @author Sven Koelpin
 */


const ALL_TWEETS = [...require('../testdata')];
const events = require('events');
const eventEmitter = new events.EventEmitter();

const getTweets = async (start, size) => {
    const sortedTweets = [...ALL_TWEETS].sort((a, b) => a.id < b.id);
    return sortedTweets.slice(start, start + size);
};

const countTweets = async () => ALL_TWEETS.length;

const createTweet = async tweet => {
    const newTweet = Object.assign(tweet, {id: ALL_TWEETS.length + 1});
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
