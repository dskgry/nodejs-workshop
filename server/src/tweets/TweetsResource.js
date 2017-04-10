/**
 * @author Sven Koelpin
 */

const RESOURCE_PATH = 'tweets';
const STREAM_PATH = 'stream';

const tweetService = require('./TweetService');
const validation = require('../validation/Validation');
const httpHeader = require('../resource/HttpHeader');
const yup = require('yup');
const cacheControl = require('../resource/CacheControl');

const sendSSEResponse = res => {
    res.handledGzip();
    res.removeHeader('Content-Encoding');
    res.writeHead(200, {
        connection: 'keep-alive',
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache'
    });
};

const receiveTweets = async (req, res, next) => {
    const {page, size} = req.params;
    const start = (page - 1) * size;

    const [count, allTweets] = await Promise.all([tweetService.countTweets(), tweetService.getTweets(start, size)]);

    httpHeader.addPagination({req, res, page, size, max: count});
    res.send(200, allTweets);

    next();
};

const createTweet = async (req, res, next) => {
    const newTweet = await tweetService.createTweet(req.body);

    httpHeader.addLocationHeader({req, res, id: newTweet.id});
    res.send(201, newTweet);

    next();
};

module.exports = server => {
    server.get(
        RESOURCE_PATH,
        validation.validateQueryParams({
            page: yup.number().min(1).max(10).default(1),
            size: yup.number().min(1).max(100).default(10)
        }),
        cacheControl.createEntityTag(() => tweetService.countTweets()),
        receiveTweets
    );

    server.post(
        RESOURCE_PATH,
        validation.validatePostBody({
            user: yup.string().min(3).max(50).required(),
            tweet: yup.string().min(3).max(100).required()
        }),
        createTweet
    );


    server.get(RESOURCE_PATH + '/' + STREAM_PATH,
        (req, res) => {
            const onNewData = newData => res.write('data: ' + JSON.stringify(newData) + '\n\n');
            req.addListener('close', () => tweetService.removeStreamListener(onNewData));
            tweetService.addStreamListener(onNewData);

            sendSSEResponse(res);
        }
    );
};
