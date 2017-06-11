/**
 * @author Sven Koelpin
 */
//TODO require tweetService

module.exports = server => {
    server.get('tweets', (req, res, next) => {
        const allTweets = []; //TODO use tweetservice
        res.send(allTweets);
        next();
    });
};
