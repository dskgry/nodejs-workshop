/**
 * @author Sven Koelpin
 */

const yup = require('yup');
const tweetService = require('./TweetService');
const validation = require('../server/common/Validation');
const httpHelper = require('../server/common/HttpHelper');
const restify = require('restify');


module.exports = server => {
    server.get('tweets',
        validation.validateQueryParams({
            page: yup.number().min(1).max(10).default(1),
            size: yup.number().min(1).max(100).default(10)
        }),
        async (req, res, next) => {
            const {page, size} = req.params;
            const start = (page - 1) * size;
            const [count, allTweets] = await Promise.all([tweetService.countTweets(), tweetService.getTweets(start, size)]);

            const nextLink = httpHelper.createLinkHeaderString({req, page, size, max: count});
            if (nextLink) {
                res.header('Link', nextLink);
            }

            res.send(allTweets);
            next();
        }
    );

    server.post('tweets',
        validation.validatePostBody({
            tweet: yup.string().min(3).max(100).required(),
            user: yup.string().min(3).max(50).required()
        }),
        async (req, res, next) => {
            const tweet = await tweetService.createTweet(req.body);
            const locationHeader = httpHelper.createLocationHeaderString({req, res, id: tweet.id});
            res.header('Location', locationHeader);
            res.send(201, tweet);
            next();
        }
    );


    server.get('tweets/:id',
        async (req, res, next) => {
            const tweet = await tweetService.getTweet(req.params.id);
            if (tweet) {
                res.tweet = tweet;
            }
            res.setHeader('ETag', httpHelper.md5(JSON.stringify(tweet)));
            next();
        },
        restify.conditionalRequest(),
        (req, res, next) => {
            if (res.tweet) {
                res.send(res.tweet);
            } else {
                res.send(404);
            }
            next();
        }
    );

};