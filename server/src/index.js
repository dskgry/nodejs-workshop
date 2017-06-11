/**
 * @author Sven Koelpin
 */
const tweetResource = require('./tweets/TweetsResource');
const server = require('./server/Server');


server.register(tweetResource);

server.start();

