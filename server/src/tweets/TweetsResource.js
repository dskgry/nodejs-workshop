/**
 * @author Sven Koelpin
 */

const yup = require('yup');
const tweetService = require('./TweetService');
const validation = require('../server/common/Validation');

module.exports = server => {
    server.get('tweets',
        validation.validateQueryParams({
            page: yup.number().min(1).max(10).default(1),
            size: yup.number().min(1).max(100).default(10)
        }),
        (req, res, next) => {
            const {page, size} = req.query;
            const start = (page - 1) * size;
            const allTweets = tweetService.getTweets(start, size);
            res.send(allTweets);
            next();
        }
    );

    server.post('tweets',
        validation.validatePostBody({
            tweet: yup.string().min(3).max(100).required(),
            user: yup.string().min(3).max(50).required()
        }),
        (req, res, next) => {
            const tweet = tweetService.createTweet(req.body);
            res.send(201, tweet);
            next();
        }
    );


    server.get('tweets/:id',
        (req, res, next) => {
            const tweetId = parseInt(req.params.id, 10);
            const tweet = tweetService.getTweet(tweetId);
            if (tweet) {
                res.send(tweet);
            } else {
                res.send(404);
            }
            next();
        }
    );

};