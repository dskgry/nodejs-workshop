/**
 * @author Sven Koelpin
 */

const RESOURCE_PATH = 'tweets';
const STREAM_PATH = 'stream';

const yup = require('yup');
const validation = require('../server/common/Validation');
const httpHelper = require('../server/common/HttpHelper');
const tweetService = require('./TweetService');


const receiveTweets = async (req, res, next) => {
    const {page, size} = req.params;
    const start = (page - 1) * size;

    const [count, allTweets] = await Promise.all([tweetService.countTweets(), tweetService.getTweets(start, size)]);

    httpHelper.addPagination({req, res, page, size, max: count});
    res.send(200, allTweets);

    next();
};


const receiveTweet = async (req, res, next) => {
    const tweet = await tweetService.getTweet(req.params.id);
    if (tweet) {
        res.send(200, tweet);
    } else {
        res.send(404);
    }
    next();
};

const createTweet = async (req, res, next) => {
    const newTweet = await tweetService.createTweet(req.body);

    httpHelper.addLocationHeader({req, res, id: newTweet.id});
    res.send(201, newTweet);

    next();
};


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
    server.get(
        RESOURCE_PATH,
        validation.validateQueryParams({
            page: yup.number().min(1).max(10).default(1),
            size: yup.number().min(1).max(100).default(10)
        }),
        httpHelper.createEntityTag(() => tweetService.countTweets()),
        receiveTweets
    );

    server.get(
        `${RESOURCE_PATH}/:id`,
        receiveTweet
    );

    server.post(
        RESOURCE_PATH,
        validation.validatePostBody({
            user: yup.string().min(3).max(50).required(),
            tweet: yup.string().min(3).max(100).required()
        }),
        createTweet
    );


    server.get(
        `${RESOURCE_PATH}/${STREAM_PATH}`,
        streamTweets
    );
};
