/**
 * @author Sven Koelpin
 */

const tweetService = require('./TweetService');

module.exports = server => {
    server.get('tweets', (req, res, next) => {
        const page = req.params.page ? parseInt(req.params.page, 10) : 1;
        const size = req.params.size ? parseInt(req.params.size, 10) : 10;
        const start = (page - 1) * size;
        const allTweets = tweetService.getTweets(start, size);
        res.send(allTweets);
        next();
    });
};
