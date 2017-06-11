/**
 * @author Sven Koelpin
 */


const fakeDataBase = require('../db/FakeDatabase');


const getTweets = async (start, size) => {
    //TODO: Return all tweets (use the fakeDataBase)
    //- sorted by id (Tip: use the array.sort-function, e.g. [1,2,3].sort((a,b)=>a<b))
    //- use the given start + size parameters to create a sub-array (Tip: use the array.slice-function)
    return [];
};

const getTweet = async id => {
    const tweetId = parseInt(id, 10);

    //TODO return a single tweet by it's tweetId
    //- Tip: use the array.find-function
};

const countTweets = async () => {
    //TODO: return the count of all tweets (TIP: use array.length)
    return 0;
};

const createTweet = async tweet => {
    //TODO
    //- add the tweet to the database (TIP: use array.push)
    //- set the id of a tweet BEFORE adding it
    //- return the created tweet
};


module.exports = {
    getTweets,
    getTweet,
    countTweets,
    createTweet
};
