/**
 * @author Sven Koelpin
 */

const restify = require('restify');
const yup = require('yup');
const tweetService = require('./TweetService');
const validation = require('../server/common/Validation');
const httpHelper = require('../server/common/HttpHelper');


module.exports = server => {
    server.get('tweets',
        validation.validateQueryParams({
            page: yup.number().min(1).max(10).default(1),
            size: yup.number().min(1).max(100).default(10)
        }),
        async (req, res, next) => {
            const {page, size} = req.params;
            const start = (page - 1) * size;
            const allTweets = await tweetService.getTweets(start, size);
            //TODO add link-header here.
            // - use httpHelper.createLinkHeaderString
            // - use the count-method from tweetserver (Hint: Promise.all is your friend)
            // - set the response-header (res.header(...))
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
            //TODO add location-header here
            // - use httpHelper.createLocationHeaderString
            // - set the response-header (res.header(...))
            res.send(201, tweet);
            next();
        }
    );


    server.get('tweets/:id',
        async (req, res, next) => {
            const tweet = await tweetService.getTweet(req.params.id);
            //TODO
            // - temporarily save the tweet to request if it's not null
            // - set the etag-header (use httpHelper.md5) to create a hash of the tweet
            if (tweet) {
                res.send(tweet);
            } else {
                res.send(404);
            }
            next();
        },
        //TODO add conditional-request middleware + another request handler
        // - 1. restify conditional request
        // - 2. request handler that sends the tweet or 404 if no tweet is present
    );

};