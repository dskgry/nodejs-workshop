/**
 * @author Sven Koelpin
 */

//TODO
//- require Validation middleware
//- require yup

const tweetService = require('./TweetService');

module.exports = server => {
    //TODO
    // - Add validation middleware (validateQueryParams)
    //   - page (number, min 1, max 10, default 1
    //   - size (number, min 1, max 100, default 10
    server.get('tweets', (req, res, next) => {
        //TODO
        // parsing + default param handling can be removed after validation is added. The validation middleware will do all of that for you (just use req.query.page and req.query.size).
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const size = req.query.size ? parseInt(req.query.size, 10) : 10;
        const start = (page - 1) * size;
        const allTweets = tweetService.getTweets(start, size);
        res.send(allTweets);
        next();
    });
    //TODO:
    // - Implement createTweet, which listens to HTTP-POST (path: 'tweets'). Use  TweetService#createTweet
    // - The posted tweet is saved in req.body (don't forget to add the bodyParser()-middleware in Server.js)
    // - respond with the created tweet and the status code 201 (res.send(STATUS_CODE, data)
    // - Add validation middleware (validatePostBody).
    //  - a tweet needs to have at least the properties:
    //      - tweet (string, min. 3 chars, max 100 chars, required)
    //      - user (string, min. 3 chars, max 50 chars, required)

    //TODO:
    // - Implement getTweet which gets a single tweet by its id.
    //   - The method is a HTTP-GET method that has a dynamic path parameter :id (path: 'tweets/:id).
    //   - Use TweetService#getTweet
    //   - The path-parameter can be found in req.params (don't forget to parse it to a number!)
    //   - Return status code 404 when there is no tweet for the given id

};