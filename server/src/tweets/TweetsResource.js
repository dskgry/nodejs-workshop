/**
 * @author Sven Koelpin
 */

const RESOURCE_PATH = 'tweets';
const STREAM_PATH = 'stream';

const restify = require('restify');
const yup = require('yup');
const validation = require('../server/common/Validation');
const httpHelper = require('../server/common/HttpHelper');
const tweetService = require('./TweetService');


const streamTweets = (req, res) => {
    const onNewData = newData => res.write(`data: ${JSON.stringify(newData)} \n\n`);
    req.addListener('close', () => tweetService.removeStreamListener(onNewData));
    tweetService.addStreamListener(onNewData);

    //gzip destroys sse so it must be handled before streaming the response
    res.handledGzip();
    res.removeHeader('Content-Encoding');

    res.writeHead(200, {
        connection: 'keep-alive',
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache'
    });
};

module.exports = server => {
    server.get(RESOURCE_PATH,
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

    server.post(RESOURCE_PATH,
        validation.validatePostBody({
            tweet: yup.string().min(3).max(100).required(),
            user: yup.string().min(3).max(50).required()
        }),
        async (req, res, next) => {
            const tweet = await tweetService.createTweet(req.body);
            const locationHeader = httpHelper.createLocationHeaderString({req, id: tweet.id});
            res.header('Location', locationHeader);
            res.send(201, tweet);
            next();
        }
    );

    server.get(`${RESOURCE_PATH}/:id`,
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


    server.get(`${RESOURCE_PATH}/${STREAM_PATH}`,
        streamTweets
    );
};