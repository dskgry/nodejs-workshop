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
        //TODO: await the result before sending it
        async  (req, res, next) => {
            const {page, size} = req.query;
            const start = (page - 1) * size;
            const allTweets = tweetService.getTweets(start, size); //TODO this is a promise now :)
            res.send(allTweets);
            next();
        }
    );

    server.post('tweets',
        validation.validatePostBody({
            tweet: yup.string().min(3).max(100).required(),
            user: yup.string().min(3).max(50).required()
        }),
        //TODO: Convert to async method and await result before sending it
        (req, res, next) => {
            const tweet = tweetService.createTweet(req.body); //TODO this is a promise now :)
            res.send(201, tweet);
            next();
        }
    );


    server.get('tweets/:id',
        //TODO: Convert to async method and await result before sending it
         (req, res, next) => {
            const tweet = tweetService.getTweet(req.params.id);  //TODO this is a promise now :)
            if (tweet) {
                res.send(tweet);
            } else {
                res.send(404);
            }
            next();
        }
    );

};