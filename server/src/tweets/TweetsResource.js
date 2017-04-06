/**
 * @author Sven Koelpin
 */

const RESOURCE_PATH = 'tweets';

const tweets = require('../testdata');
const validation = require('../validation/Validation');
const addPagination = require('../resource/Pagination');
const yup = require('yup');
const cacheControl = require('../resource/CacheControl');


const receiveTweets = (req, res, next) => {
    const {page, size} = req.params;
    const start = (page - 1) * size;

    addPagination({req, res, page, size, max: tweets.length});
    res.send(200, tweets.slice(start, start + size));

    next();
};


module.exports = server => {
    server.get(
        RESOURCE_PATH,
        validation.validateQueryParams({
            page: yup.number().min(1).max(10).default(1),
            size: yup.number().min(1).max(100).default(10)
        }),
        cacheControl.createEntityTag(() => tweets.length),
        receiveTweets
    );
};
