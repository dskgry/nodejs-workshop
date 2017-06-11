/**
 * @author Sven Koelpin
 */

module.exports = server => {
    server.get('tweets', (req, res, next) => {
        const {page, size} = req.params; //read query params
        const start = (page - 1) * size;

        const allTweets = []; //TODO use tweetservice, don't forget the start + size params
        res.send(allTweets);
        next();
    });
};
